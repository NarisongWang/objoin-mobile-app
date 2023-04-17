import React from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'

const PDFFile = ({ filePath, fileName, openPdfFile }) =>{

    return <View style = {styles.container}>
        <TouchableOpacity onPress={()=>openPdfFile(filePath,fileName)}>
            <Image source={require('../../assets/pdf.png')}
                style={styles.image}></Image>
            <Text style = {styles.text}>{fileName}</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        marginLeft: 20,
        width:130,
    },
    image:{
      width: 53,
      height: 53,
      marginBottom: 5,
    },
    text:{
        fontSize: 13,
    }
});

export default PDFFile;