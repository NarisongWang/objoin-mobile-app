import { Camera } from 'expo-camera'
import { useState, useEffect, useRef } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, Input } from '@rneui/themed'
import * as FileSystem from 'expo-file-system'
import { cameraStyles } from '../style'

const CameraScreen = ({ navigation, route }) => {
    const installationOrderNumber = route.params.installationOrderNumber
    const userType = route.params.userType
    let cameraRef = useRef()
    const [hasCameraPermission, setHasCameraPermission] = useState()
    const [photo, setPhoto] = useState()
    const [photoName, setPhotoName] = useState('')

    useEffect(() =>{
        (async () =>{
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermission(cameraPermission.status === "granted")
        })()
    },[])

    if(hasCameraPermission===undefined){
        return <Text>Requesting permissions...</Text>
    }else if(!hasCameraPermission){
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async() =>{
        let options = {
            autoFocus:true,
            base64: true,
            exif:false,
            skipProcessing: true
        }
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto)
    }

    if (photo){
        let savePhoto = async() =>{
            if(photoName===''){
                alert('Please enter a photo name first!')
                return;
            }
            //check work order directory
            const workUri = `${FileSystem.documentDirectory}${installationOrderNumber}`
            if (!(await FileSystem.getInfoAsync(workUri)).isDirectory) {
                await FileSystem.makeDirectoryAsync(workUri, { intermediates: true })
            }
            //check sub-directory
            const dirUri = `${FileSystem.documentDirectory}${installationOrderNumber}/photos${userType}`
            if (!(await FileSystem.getInfoAsync(dirUri)).isDirectory) {
                await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true })
            }
            //check duplicated photo name
            if((await FileSystem.getInfoAsync(dirUri+'/'+photoName+'.jpg')).exists){
                alert('The photo name already exists, please change another name!')
                return
            }

            try {
                await FileSystem.writeAsStringAsync(`${dirUri}/${photoName}.jpg`, photo.base64, { encoding: FileSystem.EncodingType.Base64 })
                alert(`${photoName}.jpg has been successfully saved!`)
            } catch (error) {
                alert("Error: "+error)
            }
            setPhotoName('')
            setPhoto(undefined)
        }
        return(
            <SafeAreaView style={cameraStyles.container}>
            <View style={cameraStyles.horizontal}>
                <View style={cameraStyles.inputContainer}>
                <Input 
                    label='Enter photo name'
                    value={photoName}
                    onChangeText={(newValue) => setPhotoName(newValue)}
                    autoCapitalize="none"
                    autoCorrect={false}
                /></View>
                <Button buttonStyle={cameraStyles.button} title="Discard" onPress={() =>setPhoto(undefined)}></Button>
                <Button buttonStyle={cameraStyles.button} title="Save" onPress={()=>savePhoto()}></Button>
            </View>
            <Image style={cameraStyles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64}}></Image>
            </SafeAreaView>
        )
    }

    return (
        <View style={cameraStyles.container}>
            <Camera style={cameraStyles.camera} ref={cameraRef}>
            </Camera>
            
            <View style={cameraStyles.buttonContainer}>
                <TouchableOpacity onPress={takePic}>
                    <Image source={require('../../assets/camera.png')}
                    style={cameraStyles.image}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CameraScreen