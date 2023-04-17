import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPdf } from '../features/installationOrder/installationOrderSlice'
import { SafeAreaView, useWindowDimensions } from 'react-native'
import { BackHandler } from 'react-native'
import MenuButtons from '../components/MenuButtons'
import Spinner from '../components/Spinner'
import Pdf from 'react-native-pdf'

const PdfScreen = ({ navigation, route }) => {
    const fileUri = route.params.fileUri
    const filePath = route.params.filePath
    const fileName = route.params.fileName
    //const [ isLoading, setIsLoading ] = useState(true)
    const { isLoading } = useSelector(state=>state.installationOrder)
    const dispatch = useDispatch()
    const { width, height } = useWindowDimensions()
    const source = {
        uri: fileUri,
        cache: true,
    }

    useEffect(()=>{
        navigation.setOptions({
            title: `PDF file - ${fileUri.substring(fileUri.lastIndexOf('/')+1)}`,
            headerRight: () => (
                <MenuButtons />
            )
        })

        dispatch(openPdf({filePath,fileName}))

        const backAction = () => {
            navigation.goBack()
            return true
          }
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          )
      
          return () => backHandler.remove()
    },[])

    if(isLoading){
        return <Spinner />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pdf
              maxScale={10}
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {
                //console.log(`Number of pages: ${numberOfPages}`)
              }}
              onPageChanged={(page, numberOfPages) => {
                //console.log(`Current page: ${page}`)
              }}
              onError={(error) => {
                console.log(error)
              }}
              onPressLink={(uri) => {
                //console.log(`Link pressed: ${uri}`)
              }}
              style={{ flex: 1, width, height }}
            />
        </SafeAreaView>
    )
}

export default PdfScreen