import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInstallationOrder } from '../features/installationOrder/installationOrderSlice'
import { BackHandler } from 'react-native'
import { SafeAreaView, ScrollView, View, Text, Image, useWindowDimensions,Alert } from 'react-native'
import { Button } from '@rneui/themed'
import MenuButtons from '../components/MenuButtons'
import CheckListItem from '../components/CheckListItem'
import Spinner from '../components/Spinner'
import { parseDateAndTime } from '../utils/utils'
import { basicStyle, checkListStyle } from '../style'

const CheckList = ({ navigation, route }) => {
    const installationOrder = route.params.installationOrder
    const [checkList, setCheckList] = useState(installationOrder.checkList)
    const [ loading, setLoading ] = useState(true)
    const { isLoading } = useSelector(state=>state.installationOrder)

    const dispatch = useDispatch()
    const { width } = useWindowDimensions()

    useEffect(()=>{
        navigation.setOptions({
            title: `Install Check List - ${installationOrder.installationOrderNumber}`,
            headerRight: () => (
                <MenuButtons />
            )
        })

        setTimeout(()=>setLoading(false),100)

        const backAction = () => {
            navigation.goBack()
            return true
        }
      
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )
      
        return () => backHandler.remove()
    },[])

    const handleChange = (checkItem, index) =>{
        let newCheckList = [...checkList]
        newCheckList[index] = checkItem
        setCheckList(newCheckList)
    }

    const saveCheckList = () =>{
        dispatch(updateInstallationOrder({installationOrderId:installationOrder._id, update:{checkList:checkList}}))
        .unwrap().then(()=>{
            navigation.goBack()
        }).catch()
    }
    
    const submitCheckList = () =>{
        for (let i=0; i<checkList.length; i++) {
            if(checkList[i].status === 0){
                alert('You haven\'t completed the check item on line '+checkList[i].index+', please complete it before signing.')
                return
            }
        }
        Alert.alert("Submit the check list?", "Once you submit this form, the check list cannot be changed anymore, do you want to continue?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES",
            onPress: async() => {
                setLoading(true)
                const update = {checkList:checkList,checkListSignature:{signed:true, signature:'', time:new Date()}}
                dispatch(updateInstallationOrder({installationOrderId:installationOrder._id, update:update}))
                .unwrap().then(()=>{
                    alert('Install checklist has been completed!')
                    navigation.goBack()
                }).catch()
            }}
          ])
    }

    
    if(loading || isLoading ){
        return (
        <Spinner />
        )
    }

    return (
        <SafeAreaView style={basicStyle.container}>

            {/* header part with horizontal direction */}
            <View style={checkListStyle.rowBetween}>
                <Image source={require('../../assets/logo.png')}
                    style={checkListStyle.image}></Image>
                <View style={checkListStyle.infoRight}>
                    <Text>Unit 2/18a Hull St, Glenorchy, TAS 7010</Text>
                    <Text>PO Box: 125 Glenorchy, TAS 7010</Text>
                    <Text>Phone: (03) 62733141</Text>
                    <Text>email: enquiries@objoin.com.au</Text>
                    <Text>web: objoin.com.au</Text>
                    <Text>ABN: 39 604 613 916</Text>
                </View>
            </View>

            {/* work order information part */}
            <View style={checkListStyle.rowCenter}>
                <View style={[checkListStyle.infoRight,{width:width/2}]}>
                    <Text style={checkListStyle.text1}>Installer Name:</Text>
                    <Text style={checkListStyle.text1}>Submitted Date & Time:</Text>
                    <Text style={checkListStyle.text1}>Sales Order Number:</Text>
                    <Text style={checkListStyle.text1}>Site Address:</Text>
                    <Text style={checkListStyle.text1}>Client Name:</Text>
                </View>
                <View style={[checkListStyle.infoLeft,{width:width/2}]}>
                    <Text style={checkListStyle.text1}>{installationOrder.installers[0].fullName}</Text>
                    <Text style={checkListStyle.text1}>{installationOrder.checkListSignature.time?parseDateAndTime(installationOrder.checkListSignature.time):new Date().toString().substring(0,15)}</Text>
                    <Text style={checkListStyle.text1}>{installationOrder.installationOrderNumber}</Text>
                    <Text style={checkListStyle.text1}>{installationOrder.shipAddress}</Text>
                    <Text style={checkListStyle.text1}>{installationOrder.shipName}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{width:'95%'}}>
                {checkList.map((checkItem,index) => (
                    <CheckListItem 
                        key={index} 
                        title={checkItem.title}
                        index={checkItem.index}
                        status={checkItem.status}
                        note={checkItem.note}
                        handleChange={handleChange}
                        disabled={installationOrder.checkListSignature.signed}
                    />
                ))}
            </ScrollView>

            {/* signature and button part */}
            {installationOrder.checkListSignature.signed?
                <View style={basicStyle.buttonContainer}>
                    <Button title='SAVE & BACK' buttonStyle={basicStyle.buttonGrey}></Button>
                    <Button title='SUBMIT' buttonStyle={basicStyle.buttonGrey}></Button>
                </View>:
                <View style={basicStyle.buttonContainer}>
                    <Button title='SAVE & BACK' buttonStyle={basicStyle.button} onPress={saveCheckList}></Button>
                    <Button title='SUBMIT' buttonStyle={basicStyle.button} onPress={submitCheckList}></Button>
                </View>
            }
        </SafeAreaView>
    )
}

export default CheckList
