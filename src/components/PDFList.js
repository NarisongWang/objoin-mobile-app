import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import PDFFile from './PDFFile'

const PDFList = ({ dir, files, openPdfFile }) => {
    return (
        <View style = {styles.container}>
            <View style = {styles.title}>
                <Text style = {styles.text}>File Directory - {dir}</Text>
            </View>
            <ScrollView horizontal style = {styles.pdfcontainer}>
                {files.map((file, index)=>(
                    <PDFFile key={index} filePath={dir} fileName={file.file_name} openPdfFile={openPdfFile} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        textAlign:"center",
        marginTop:10,
        height:150,
    },
    title:{
        flexDirection: "row",
        justifyContent: 'space-between',
        textAlign:"center",
    },
    pdfcontainer:{
        marginTop:10,
        height:130,
    },
    text:{
        fontSize:18,
        fontStyle:"italic",
        marginBottom:5
    }
})

export default PDFList