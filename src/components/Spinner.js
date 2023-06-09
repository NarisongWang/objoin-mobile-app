import React from 'react'
import { View, StyleSheet, ActivityIndicator} from 'react-native'

const Spinner = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large'/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default Spinner