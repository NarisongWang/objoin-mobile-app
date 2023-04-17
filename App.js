import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/Login'
import ResetPassword from './src/screens/ResetPassword'
import InstallationOrderList from './src/screens/InstallationOrderList'
import InstallationOrderDetail from './src/screens/InstallationOrderDetail'
import CameraScreen from './src/screens/Camera'
import PdfScreen from './src/screens/PdfScreen'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from './src/features/auth/authSlice'
import { OverflowMenuProvider } from 'react-navigation-header-buttons'
import Spinner from './src/components/Spinner'
import CheckList from './src/screens/CheckList'

const AuthStack = createNativeStackNavigator()
const OrderStack = createNativeStackNavigator()

const AppAuthStack = () => {
  return (
      <AuthStack.Navigator>
        <AuthStack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerTitle: 'OBJOIN - Login',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
        <AuthStack.Screen 
          name="ResetPassword" 
          component={ResetPassword}
          options={{
            headerTitle: 'OBJOIN - Reset Password',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
      </AuthStack.Navigator>
  )
}

const AppOrderStack = () => {
  return (

      <OrderStack.Navigator>
        <OrderStack.Screen 
          name="List" 
          component={InstallationOrderList}
          options={{
            title: 'OBJOIN - Installation Order List',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
        <OrderStack.Screen 
          name="Detail" 
          component={InstallationOrderDetail}
          options={{
            title: 'OBJOIN - Order Detail',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
        <OrderStack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{
            title: 'OBJOIN - Camera',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
        <OrderStack.Screen 
          name="Pdf" 
          component={PdfScreen}
          options={{
            title: 'PDF file - ',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
        <OrderStack.Screen 
          name="CheckList" 
          component={CheckList}
          options={{
            title: 'Install Check List - ',
            headerTitleStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          }} />
      </OrderStack.Navigator>
  )
}

const AppRoutes = () => {
  const { user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  if (isLoading) {
   return <Spinner />
  }
  return (
      (user?
        <NavigationContainer>
          <AppOrderStack />
        </NavigationContainer> : 
        <NavigationContainer>
          <AppAuthStack />
        </NavigationContainer>)
    )
}

const App = () => {
  return (
    <Provider store={store}>
      <OverflowMenuProvider>
        <AppRoutes />
      </OverflowMenuProvider>
    </Provider>
  )
}

export default App