import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EncryptedStorage from "react-native-encrypted-storage/"
import AsyncStorage from "@react-native-async-storage/async-storage"
import authAPI from "./authAPI"

const initialState = {
    user: null,
    dictionary: null,
    isLoading: false,
    isLoading2: false,
    message:'',
    error: ''
}

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'))
            const dictionary = JSON.parse(await AsyncStorage.getItem('dictionary'))
            if(user){
                return {user:user, dictionary:dictionary}
            }else{
                return thunkAPI.rejectWithValue('Can not find login information.')
            }
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
     async (user, thunkAPI) => {
        try {
            const data = await authAPI.login(user)
            if(data){
                await storeUserToken(data.user.token)
                delete data.user.token
                await AsyncStorage.setItem('user', JSON.stringify(data.user))
                await AsyncStorage.setItem('dictionary', JSON.stringify(data.dictionary))
            }
            return data
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
     async (_, thunkAPI) => {
        try {
            await removeItemValue('user')
            await removeItemValue('dictionary')
            await removeUserToken()
            return
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async(email, thunkAPI) =>{
        try {
            return await authAPI.resetPassword(email)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const storeUserToken = async (token) => {
    try {
        await EncryptedStorage.setItem(
            "user_token",
            token
        )
    } catch (err) {
        return Promise.reject(err)
    }
}

const removeUserToken = async() => {
    try {
        await EncryptedStorage.removeItem("user_token")
    } catch (error) {
        return Promise.reject(error)
    }
}

const removeItemValue = async(key) => {
    try {
        await AsyncStorage.removeItem(key)
    }
    catch(err) {
        return Promise.reject(err)
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetMessage:(state) =>{
            state.message = ''
            state.error = ''
        }
    },
    extraReducers:(builder) => {
        builder
        //reducers for checkAuth
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.dictionary = action.payload.dictionary
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        //reducers for login
        .addCase(login.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.dictionary = action.payload.dictionary
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        //reducers for logout
        .addCase(logout.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.dictionary = null
            state.isLoading = false
        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        //reducers for resetPassword
        .addCase(resetPassword.pending, (state) => {
            state.isLoading2 = true
            state.error = ''
            state.message = ''
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading2 = false
            state.message = action.payload
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading2 = false
            state.error = action.payload
        })
    }
})

export const { resetMessage } = authSlice.actions
export default authSlice.reducer