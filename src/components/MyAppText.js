import React from 'react'
import { Text, StyleSheet } from 'react-native'

const MyAppText = ( props ) => {
  return (
    <Text style={[styles.font, props.style]}>
      {props.children}
    </Text>
  )
}

const MyAppTextBold = ( props ) => {
    return (
      <Text style={[styles.fontBold, props.style]}>
        {props.children}
      </Text>
    )
  }

const styles = StyleSheet.create({
    font :{
        fontFamily:'Poppins-Medium'
    },
    fontBold :{
        fontFamily:'Poppins-Bold'
    }
})
export { MyAppText, MyAppTextBold }
