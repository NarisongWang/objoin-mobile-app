import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ScrollView, View, Alert, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { submitOrder } from '../features/installationOrder/installationOrderSlice'
import MenuButtons from '../components/MenuButtons'
import Photo from '../components/Photo'
import { BackHandler } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MyAppTextBold, MyAppText } from '../components/MyAppText'
import Spinner from '../components/Spinner'
import { parseDate } from '../utils/utils'
import { detailStyle, basicStyle } from '../style'
import * as FileSystem from 'expo-file-system'

const InstallationOrderDetail = ({ navigation, route }) => {
    const installationOrder = route.params.installationOrder
    const { user, dictionary } = useSelector(state=>state.auth)
    const { isLoading, error } = useSelector(state=>state.installationOrder)

    //comment for delivery user
    const [ noteInput, setNoteInput ] = useState('')

    //photos list
    const [photos, setPhotos] = useState([]);

    //single photo display, rename & delete
    const [ editPhoto, setEditPhoto ] = useState(null)
    const [ editPhotoName, setEditPhotoName ] = useState('')

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useEffect(()=>{
        navigation.setOptions({
            title: `Order Details`,
            headerRight: () => (
                <MenuButtons />
            ),
            headerLeft: () => (
                <></>
            )
        })

        const backAction = () => {
            Alert.alert('', 'Are you sure you want to go back to the list?', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {text: 'YES', onPress: () => navigation.goBack()},
            ])
            return true
          }
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          )
      
          return () => backHandler.remove()
    },[])

    const loadPhotos = () =>{
        const dirUri = `${FileSystem.documentDirectory}${installationOrder.installationOrderNumber}/photos${user.userType}`
        FileSystem.getInfoAsync(dirUri).then(fileInfo=>{
            if(fileInfo.isDirectory){
                FileSystem.readDirectoryAsync(dirUri).then(localPhotos=>{
                    localPhotos.sort()
                    let initPhotos = []
                    localPhotos.forEach(localPhoto=>{
                        initPhotos.push(`${installationOrder.installationOrderNumber}/photos${user.userType}/${localPhoto}`)
                    })
                    setPhotos(initPhotos)
                })
            }
        })
    }

    const renamePhoto = async(uri,newName) =>{
        const dirUri = `${FileSystem.documentDirectory}${installationOrder.installationOrderNumber}/photos${user.userType}`;
        //check duplicated photo name
        if((await FileSystem.getInfoAsync(dirUri+'/'+newName+'.jpg')).exists){
          alert('The photo name already exists, please change another name!')
          return;
        }
        await FileSystem.copyAsync({from: uri, to: dirUri+'/'+newName+'.jpg'})
        await FileSystem.deleteAsync(uri)
        setEditPhoto(null)
        loadPhotos()
        alert('Success!')
    }
    
    const deletePhoto = async(uri) =>{
        Alert.alert('Delete this photo?','',[
          {text:'Delete',onPress:()=>{
            FileSystem.deleteAsync(uri)
            setEditPhoto(null)
            loadPhotos()
          }},
          {text:'Cancel'}
        ])
    }

    useEffect(() => {
        loadPhotos()
    },[isFocused])

    const displayImage = (uri) =>{
        setEditPhoto(uri)
        setEditPhotoName(uri.replace(/^.*[\\\/]/, '').replace('.jpg',''))
    }

    const timeOut = () =>{
        Alert.alert('', 'Are you sure you want to go back to the list?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => navigation.goBack()},
        ])
    }

    const submitInstallationOrder = () =>{
        Alert.alert('', 'Are you sure you want to submit this work?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => {
                const newTimeFrame = {workStatus:installationOrder.workStatus+1, time:new Date()}
                const timeFrames = [...installationOrder.timeFrames,newTimeFrame]
                let update
                if (user.userType === dictionary.userType[0].typeId) { //delivery
                    update = {
                        workStatus: installationOrder.workStatus+1,
                        timeFrames: timeFrames,
                        photos1: photos,
                        deliveryComment: noteInput
                    }
                } else { //installation
                    update = {
                        
                    }
                }  
                const orderInfo = {
                    installationOrderId: installationOrder._id, 
                    installationOrderNumber: installationOrder.installationOrderNumber,
                    userType: user.userType,
                    update: update
                }
                dispatch(submitOrder(orderInfo))
                .unwrap().then(()=>{
                    navigation.goBack()
                }).catch()
            }}
        ])
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor:'white'}}>
            <View style={basicStyle.container}>
                {user.userType === dictionary.userType[0].typeId ? (
                    <MyAppTextBold style={{fontSize:30,marginTop:15}}>{installationOrder.installationOrderNumber} - Delivery</MyAppTextBold>
                ) : user.userType === dictionary.userType[1].typeId ? (
                    <MyAppTextBold style={{fontSize:30,marginTop:15}}>{installationOrder.installationOrderNumber} - Installation</MyAppTextBold>
                ) : null}
                <View style={detailStyle.container}>
                    {user.userType === dictionary.userType[0].typeId ?
                        (<>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Customer : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{installationOrder.customer}</MyAppText>
                        </View>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Ship Name : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{installationOrder.shipName}</MyAppText>
                        </View>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Ship Address : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{installationOrder.shipAddress}</MyAppText>
                        </View>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Entry Date : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{parseDate(installationOrder.entryDate)}</MyAppText>
                        </View>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Due Date : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{parseDate(installationOrder.dueDate)}</MyAppText>
                        </View>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Deliverer : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{installationOrder.deliverers[0].fullName}</MyAppText>
                        </View>
                        <View style={ detailStyle.horizontal }>
                            <MyAppText style={{fontSize:22,width: 180}}>Installer : </MyAppText>
                            <MyAppText style={{fontSize:20}}>{installationOrder.installers[0].fullName}</MyAppText>
                        </View>
                        <View style={[ detailStyle.horizontal, {height: 100}]}>
                            <MyAppText style={{fontSize:22,width: 180}}>Comment : </MyAppText>
                            <View style={detailStyle.inputContainer}>
                                <TextInput 
                                    value={noteInput}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(newValue) => { setNoteInput(newValue) }}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        </View>
                        </>):
                    user.userType === dictionary.userType[1].typeId ?
                        (<Text>
                            Installer
                        </Text>):null}

                    {/* Camera & Photo Part */}
                    <View  style={ detailStyle.horizontal }>
                        <View>
                            <MyAppText style={{fontSize:22,width: 180}}>Attachments : </MyAppText>
                            <TouchableOpacity onPress={() => navigation.navigate('Camera', {installationOrderNumber:installationOrder.installationOrderNumber, userType:user.userType})}>
                                <Image 
                                    source={require('../../assets/add.png')}
                                    style={detailStyle.image}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal={true} style = {detailStyle.photoContainer}>
                            {photos.map((photo,index)=>(
                                <Photo key={index} uri={FileSystem.documentDirectory+photo} displayImage={displayImage}></Photo>
                            ))}
                        </ScrollView>
                    </View>
                    <Text style={{color:"red",fontSize:15,fontStyle:"italic"}}>* Press photo to rename or delete.</Text>
                </View>
                {user.userType === dictionary.userType[0].typeId ? (
                    <View style={basicStyle.buttonContainer}>
                        <Button 
                            buttonStyle={basicStyle.button}
                            titleStyle={basicStyle.buttonTitle} 
                            title='TIMEOUT'
                            onPress={() => timeOut()}
                            />
                        <Button 
                            buttonStyle={basicStyle.button}
                            titleStyle={basicStyle.buttonTitle} 
                            title='COMPLETE'
                            onPress={() => submitInstallationOrder()}
                            />
                    </View>
                ) 
                : user.userType === dictionary.userType[1].typeId ? (
                <Text>Installer</Text>
                ) : null}
            </View>
            {editPhoto===null?null:
            <KeyboardAvoidingView style={basicStyle.absolute} keyboardVerticalOffset={-100} behavior="height">
                <View style={{alignItems:"center", marginTop:50}}>
                <Image source={{uri:`${editPhoto}?v=${Math.floor(Math.random() * 10000)}`}} style={{width:600, height:800,}} />
                <Input 
                    style={{width:400,marginTop:15,fontSize:20,color:"white"}}
                    value={editPhotoName}
                    onChangeText={(newValue) => {setEditPhotoName(newValue)}}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <View style={basicStyle.buttonContainer}>
                    <Button 
                        buttonStyle={basicStyle.button}
                        titleStyle={basicStyle.buttonTitle} 
                        title='RENAME'
                        onPress={() => renamePhoto(editPhoto,editPhotoName)}
                        />
                    <Button 
                        buttonStyle={basicStyle.button}
                        titleStyle={basicStyle.buttonTitle} 
                        title='DELETE'
                        onPress={() => deletePhoto(editPhoto)}
                        />
                    <Button 
                        buttonStyle={basicStyle.button}
                        titleStyle={basicStyle.buttonTitle} 
                        title='CLOSE'
                        onPress={() => setEditPhoto(null)}
                        />
                </View>
                </View>
            </KeyboardAvoidingView>}
        </ScrollView>
    )
}

export default InstallationOrderDetail