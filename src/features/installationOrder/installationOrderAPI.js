import { API_URL } from "@env"
import axios from "axios"
import { retrieveUserToken, getConfig } from "../../utils/utils"
import * as FileSystem from 'expo-file-system'
import * as ImageManipulator from 'expo-image-manipulator'

const API_URL_LIST = API_URL+'/installationorders/'
const API_URL_UPLOAD = API_URL+'/uploadPhotos'

const getInstallationOrders = async() =>{
    const token = await retrieveUserToken()
    const config = getConfig(token)
    const response = await axios.get(API_URL_LIST, config)
    return response.data
}

const submitOrder = async(orderInfo) =>{
    const token = await retrieveUserToken()
    const config = getConfig(token)
    const config2 = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    const photoDir = `${FileSystem.documentDirectory}${orderInfo.installationOrderNumber}/photos${orderInfo.userType}`
    const checkDir = (await FileSystem.getInfoAsync(photoDir)).isDirectory
    if(!checkDir){
        throw new Error('Photo directory not found!')
    }
    let photos = await FileSystem.readDirectoryAsync(photoDir)

    //step1: upload photos
    for (const photo of photos) {
        //compress photo
        const resizedPhoto = await ImageManipulator.manipulateAsync(
            `${photoDir}/${photo}`,
            [{ resize: { width: 1200 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        )
        const formData = new FormData();
        formData.append('installationOrderNumber', orderInfo.installationOrderNumber)
        formData.append('userType', orderInfo.userType)
        formData.append('image', {uri: `${resizedPhoto.uri}`, name: photo, type: 'image/jpg'})
        try {
            await axios.post(API_URL_UPLOAD, formData, config2)
        } catch (error) {
            throw new Error('Photo upload failed, please try again later!')
        }
    }
    console.log(orderInfo)
    //step2: update installation order
    try {
        await axios.put(API_URL_LIST+orderInfo.installationOrderId, orderInfo.update, config)
    } catch (error) {
        throw new Error('Update installation order failed, please try again later!')
    }

    //step3: return updated installation order list
    const response = await axios.get(API_URL_LIST, config)
    return response.data
}

const installationOrderAPI = {
    getInstallationOrders,
    submitOrder
}

export default installationOrderAPI