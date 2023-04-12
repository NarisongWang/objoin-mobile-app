import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native'
import { Button } from '@rneui/themed'
import MenuButtons from '../components/MenuButtons'
import { useDispatch, useSelector } from 'react-redux'
import { getInstallationOrders } from '../features/installationOrder/installationOrderSlice'
import { MyAppTextBold } from '../components/MyAppText'
import InstallationOrderItem from '../components/InstallationOrderItem'
import Spinner from '../components/Spinner'
import { basicStyle, listStyle } from '../style'

const InstallationOrderList = ({ navigation }) => {
    const { user, dictionary } = useSelector(state => state.auth)
    const { installationOrders, isLoading, error } = useSelector(state=> state.installationOrder)
    const [ select, setSelect ] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <MenuButtons />
            )
        })
        dispatch(getInstallationOrders())
    },[])

    useEffect(()=>{
        if(error!==''){
            console.log(error)
            alert('There is an error, please contact system admin!')
        }
    },[error])

    //Check user type and work status
    const selectInstallationOrder = (installationOrder) => {
        if(
            (user.userType === dictionary.userType[0].typeId && 
                installationOrder.workStatus === dictionary.workStatus[1].statusId) //delivery staff
        ||
            (user.userType === dictionary.userType[1].typeId &&
                (installationOrder.workStatus === dictionary.workStatus[2].statusId
                ||installationOrder.workStatus === dictionary.workStatus[3].statusId)) //installation staff
        ){ 
            setSelect(installationOrder)
        }
    }

    const startInstallationOrder = () =>{
        if(!select){
            alert('Please select an installation order first.')
        }
        navigation.navigate('Detail', { installationOrder: select })
        
        setSelect(null)
    }

    const refresh = () =>{
        setSelect(null)
        dispatch(getInstallationOrders())
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <SafeAreaView style={basicStyle.container}>
            <ScrollView>
                <ScrollView horizontal>
                    <View>
                        <View style={listStyle.heading}>
                            <MyAppTextBold style = {listStyle.headingText}>OrderNumber</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>WorkStatus</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>EntryDate</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>DueDate</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>Customer</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>ShipName</MyAppTextBold>
                            <MyAppTextBold style = {[listStyle.headingText,{width:300}]}>ShipAddress</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>Deliverer</MyAppTextBold>
                            <MyAppTextBold style = {listStyle.headingText}>Installer</MyAppTextBold>
                        </View>
                        {installationOrders?installationOrders.map((installationOrder) =>(
                            <TouchableOpacity key={installationOrder._id} onPress={()=>selectInstallationOrder(installationOrder)}>
                                <InstallationOrderItem installationOrder={installationOrder} select={select}/>
                            </TouchableOpacity>
                        )):null}
                    </View>
                </ScrollView>
            </ScrollView>
            <View style={basicStyle.buttonContainer}>
                <Button 
                    buttonStyle={basicStyle.button}
                    titleStyle={basicStyle.buttonTitle} 
                    title="Start"
                    onPress={() => startInstallationOrder()}>
                </Button>
                <Button 
                    buttonStyle={basicStyle.button}
                    titleStyle={basicStyle.buttonTitle} 
                    title="Refresh"
                    onPress={() => refresh()}>
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default InstallationOrderList
