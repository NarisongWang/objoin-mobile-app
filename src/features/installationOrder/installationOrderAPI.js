import { API_URL } from "@env"
import axios from "axios"
import { retrieveUserToken, getConfig } from "../../utils/utils"
import * as FileSystem from 'expo-file-system'
import * as ImageManipulator from 'expo-image-manipulator'

const API_URL_LIST = API_URL +'/installationorders/'
const API_URL_UPLOAD = API_URL +'/uploadPhotos'
const API_URL_DOWNLOAD = API_URL +'/download'

axios.defaults.timeout = 10000
axios.defaults.timeoutErrorMessage='Requset time out, please check your internet connection and try again later!'

const getInstallationOrders = async() =>{
    const token = await retrieveUserToken()
    const config = getConfig(token)
    const response = await axios.get(API_URL_LIST, config)
    return response.data
}

const getInstallationOrder = async(installationOrderId) =>{
    const token = await retrieveUserToken()
    const config = getConfig(token)
    const response = await axios.get(API_URL_LIST+installationOrderId, config)
    return response.data
}

const updateInstallationOrder = async(update)=>{
    const token = await retrieveUserToken()
    const config = getConfig(token)
    const response = await axios.put(API_URL_LIST+update.installationOrderId, update.update, config)
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
            throw new Error('Photo upload failed: ' + error)
        }
    }
    //step2: update installation order
    try {
        await axios.put(API_URL_LIST+orderInfo.installationOrderId, orderInfo.update, config)
    } catch (error) {
        throw new Error('Update installation order failed: ' + error)
    }

    //step3: return updated installation order list
    const response = await axios.get(API_URL_LIST, config)
    return response.data
}

const openPdf = async ( pdfInfo ) =>{
    const token = await retrieveUserToken()
    const config = getConfig(token)

    const { filePath, fileName } = pdfInfo
    //find document from local storage
    const fileUri = FileSystem.documentDirectory + filePath + fileName
    const fileExists = (await FileSystem.getInfoAsync(fileUri)).exists
    //if document exists then open it
    //if document doesn't exist, download file from the server and open it
    if (fileExists) {
        return fileUri
    } else {
        //check directory
        const dirUri = FileSystem.documentDirectory + filePath
        const dirExists = (await FileSystem.getInfoAsync(dirUri)).isDirectory
        if (!dirExists) {
            await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true })
        }
        // download pdf file
        const response = await axios.post(API_URL_DOWNLOAD, {path:filePath + fileName}, config)
        await FileSystem.writeAsStringAsync(fileUri, response.data, { encoding: FileSystem.EncodingType.Base64 })
        return fileUri
    }
}

const deleteClosedOrders = async(installationOrders) =>{
    const root = FileSystem.documentDirectory
    FileSystem.readDirectoryAsync(root)
    .then(orders=>{
        orders.forEach(order=>{
            if(!isCurrentFolderInOrderList(order, installationOrders)){
                FileSystem.deleteAsync(root+order)
            }
        })
    })
}

const isCurrentFolderInOrderList = (order,installationOrders)=>{
    for (let i = 0; i < installationOrders.length; i++) {
        const installationOrder = installationOrders[i];
        if(order == installationOrder.installationOrderNumber){
            return true
        }
    }
    return false
}

const installationOrderAPI = {
    getInstallationOrders,
    getInstallationOrder,
    updateInstallationOrder,
    submitOrder,
    openPdf,
    deleteClosedOrders
}

export default installationOrderAPI