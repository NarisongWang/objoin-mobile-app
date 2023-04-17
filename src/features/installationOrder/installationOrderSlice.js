import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import installationOrderAPI from './installationOrderAPI'
import { initFiles } from "../../utils/utils"

const initialState = {
    installationOrders: [],
    installationOrder:{},
    files:[],
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

export const getInstallationOrder = createAsyncThunk(
    'installationOrder/getInstallationOrder', 
    async (installationOrderId, thunkAPI)=>{
        try {
            return await installationOrderAPI.getInstallationOrder(installationOrderId)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateInstallationOrder = createAsyncThunk(
    'installationOrder/updateInstallationOrder',
    async(update, thunkAPI) =>{
        try {
            return await installationOrderAPI.updateInstallationOrder(update)
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

export const openPdf = createAsyncThunk(
    'installationOrder/openPdf',
    async(pdfInfo, thunkAPI)=>{
        try {
            return await installationOrderAPI.openPdf(pdfInfo)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteClosedOrders = createAsyncThunk(
    'installationOrder/deleteClosedOrders',
    async(_, thunkAPI)=>{
        try {
            const installationOrders = thunkAPI.getState().installationOrder.installationOrders
            return await installationOrderAPI.deleteClosedOrders(installationOrders)
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
        setLoading:(state) => {state.isLoading = true},
        resetLoading:(state) => {state.isLoading = false}
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
            //reducers for getInstallationOrder
            .addCase(getInstallationOrder.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getInstallationOrder.fulfilled, (state, action) =>{
                state.isLoading = false
                state.installationOrder = action.payload
                state.files = initFiles(action.payload.installationOrderNumber,action.payload.files)
            })
            .addCase(getInstallationOrder.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for updateInstallationOrder
            .addCase(updateInstallationOrder.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(updateInstallationOrder.fulfilled, (state, action) =>{
                state.isLoading = false
                state.installationOrder = action.payload
            })
            .addCase(updateInstallationOrder.rejected, (state, action) =>{
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
            //reducers for openPdf
            .addCase(openPdf.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(openPdf.fulfilled, (state, action) =>{
                state.isLoading = false
            })
            .addCase(openPdf.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { setLoading, resetLoading } = installationOrderSlice.actions
export default installationOrderSlice.reducer