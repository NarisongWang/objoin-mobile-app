import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native'
import { Input, Icon, Button } from '@rneui/themed'
import { basicStyle } from '../style'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, resetMessage } from '../features/auth/authSlice'
import { MyAppText } from '../components/MyAppText'
import { AntDesign } from '@expo/vector-icons'
import Spinner from '../components/Spinner'

const ResetPassword = ({ navigation }) => {
    const [ email, setEmail ] = useState('')
    const { isLoading, error, message } = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    const resetPass = () =>{
        if(!validateEmail(email)){
            alert('Invalid email address!')
            return
        }
        dispatch(resetPassword({email}))
    }

    const switchScreen = () =>{
        navigation.goBack()
        dispatch(resetMessage())
    }

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: () => (
                <AntDesign name="leftcircle" style={{marginRight:15, marginBottom:4}} size={24} color="black" onPress={()=>{switchScreen()}}/>
            )
        })
    },[])

    if(isLoading){
        return <Spinner />
    }

    return (
        <SafeAreaView style={basicStyle.container}>
            <View style={basicStyle.form}>
                <Image 
                    source={require('../../assets/logo.png')}
                    style={basicStyle.logoImage} 
                />
                <Input 
                    label='Email'
                    value={email}
                    onChangeText={(newValue) => setEmail(newValue.trim())}
                    autoCapitalize="none"
                    autoCorrect={false}
                    rightIcon={
                        <Icon
                            name='email'
                            type='MaterialIcons'
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    errorMessage=''
                />
                {error==='' ? 
                    null:(<MyAppText style={basicStyle.errorMessage}>{error}</MyAppText>)
                }
                {message==='' ?
                    null:(<MyAppText style={basicStyle.message}>{message}</MyAppText>)
                }
                <Button 
                    buttonStyle={basicStyle.button}
                    titleStyle={basicStyle.buttonTitle}
                    containerStyle={basicStyle.buttonContainer}
                    title='RESET PASSWORD'
                    onPress={()=>resetPass()}
                />
                <TouchableOpacity onPress={() => switchScreen()} >
                    <MyAppText style={basicStyle.linkText}>
                        Login here!
                    </MyAppText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword
