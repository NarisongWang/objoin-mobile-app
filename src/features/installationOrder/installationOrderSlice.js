import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import installationOrderAPI from './installationOrderAPI'

const initialState = {
    installationOrders: [],
    isLoading: false,
    error: '',
}

export const getInstallationOrders = createAsyncThunk(
    'installationOrder/getInstallationOrders', 
    async (_, thunkAPI)=>{
        try {
            return await installationOrderAPI.getInstallationOrders()
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const submitOrder = createAsyncThunk(
    'installationOrder/submitOrder',
    async(orderInfo, thunkAPI)=>{
        try {
            return await installationOrderAPI.submitOrder(orderInfo)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const installationOrderSlice = createSlice({
    name:'installationOrder',
    initialState,
    reducers: {
    },
    extraReducers:(builder) =>{
        builder
            //reducers for getInstallationOrders
            .addCase(getInstallationOrders.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getInstallationOrders.fulfilled, (state, action) =>{
                state.isLoading = false
                state.installationOrders = action.payload
            })
            .addCase(getInstallationOrders.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for submitOrder
            .addCase(submitOrder.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(submitOrder.fulfilled, (state, action) =>{
                state.isLoading = false
                state.installationOrders = action.payload
            })
            .addCase(submitOrder.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default installationOrderSlice.reducer