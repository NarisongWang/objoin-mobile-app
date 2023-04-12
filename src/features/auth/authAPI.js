import { API_URL } from "@env"
import axios from "axios"

const API_URL_LOGIN = API_URL+'/login'
const API_URL_RESET = API_URL+'/sendresetemail'

const login = async (userData) => {
    const response = await axios.post(API_URL_LOGIN, userData)
    return response.data
}

const resetPassword = async(email) =>{
    const response = await axios.post(API_URL_RESET, email)
    return response.data
} 

const authAPI = {
    login,
    resetPassword
}

export default authAPI