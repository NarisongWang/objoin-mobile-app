import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, resetMessage } from '../features/auth/authSlice'
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native'
import { Input, Icon, Button } from '@rneui/themed'
import { MyAppText } from '../components/MyAppText'
import { basicStyle } from '../style'

const Login = ({ navigation }) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ visible, setVisible ] = useState(false)

    const { error } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    const submitLogin = () =>{
        if(!validateEmail(email)){
            alert('This is not a valid email address!')
            return
        }
        const userData = {
            email,
            password
          }
        dispatch(login(userData))
    }

    const switchScreen = () =>{
        navigation.push('ResetPassword')
        dispatch(resetMessage())
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
                />
                <Input
                    secureTextEntry={!visible}
                    label='Password'
                    value={password}
                    defaultValue='password'
                    onChangeText={(newValue) => setPassword(newValue)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    rightIcon={
                        visible?
                        <Icon
                            name='visibility'
                            type='MaterialIcons'
                            onPress={()=> setVisible(false)}
                        />:
                        <Icon
                            name='visibility-off'
                            type='MaterialIcons'
                            onPress={()=> setVisible(true)}
                        />
                    }
                />
                {error==='' ? 
                    null:(<MyAppText style={basicStyle.errorMessage}>{error}</MyAppText>)
                }
                <Button 
                    buttonStyle={basicStyle.button}
                    titleStyle={basicStyle.buttonTitle}
                    containerStyle={basicStyle.buttonContainer}
                    title='LOGIN'
                    onPress={()=>submitLogin()}
                />
                <TouchableOpacity onPress={() => switchScreen()}>
                    <MyAppText style={basicStyle.linkText}>
                        Forgot password? Click here to reset your password!
                    </MyAppText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login