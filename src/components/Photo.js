import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Photo = ({uri, displayImage}) => {
    return (
        <View>
            <TouchableOpacity onPress={()=>displayImage(uri)}>
                <Image source={{uri:`${uri}?v=${Math.floor(Math.random() * 10000)}` }} style={styles.images} />
                <Text style={styles.text}>{uri.replace(/^.*[\\\/]/, '')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    images:{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        width: 150,
        height: 200,
    },
    text:{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        fontSize:20
    },
    button:{
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "lightblue"
    }
})

export default Photo