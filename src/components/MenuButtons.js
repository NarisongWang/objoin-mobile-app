import React from 'react'
import { HeaderButtons, HiddenItem, OverflowMenu } from "react-navigation-header-buttons"
import { View } from 'react-native'
import { MyAppText } from './MyAppText'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { AntDesign } from '@expo/vector-icons'

const MenuButtons = () => {
  const { user } = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  return (
    <HeaderButtons>
      <View style={{ margin: 10 }}>
        <MyAppText style={{ fontSize: 20 }}>Hi, {user.fullName}</MyAppText>
      </View>
      <OverflowMenu 
        style={{ margin:10 }}
        OverflowIcon={<AntDesign name="downcircle" size={24} color="black" />} >
          <HiddenItem title="Set Signature" style={{ width:400, borderBottomColor:'grey', borderBottomWidth:1 }} titleStyle={{fontSize:20,fontFamily:'Poppins-Medium'}} onPress={() => {}} />
          <HiddenItem title="Logout" style={{ width:400 }} titleStyle={{fontSize:20,fontFamily:'Poppins-Medium'}} onPress={() => {dispatch(logout())}} />
      </OverflowMenu>
    </HeaderButtons>
  )
}

export default MenuButtons
