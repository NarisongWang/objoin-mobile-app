import { StyleSheet } from "react-native"

const basicStyle =  StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        backgroundColor:'white',
        height:'100%',
        width:'100%'
    },
    form:{
        flex: 1,
        width: '70%',
        alignItems: 'center', 
    },
    logoImage:{
        marginTop:100,
        width: 233,
        height: 100,
        marginBottom:50
    },
    button:{
        borderRadius:15,
        margin:30,
        height:55,
        width:200
    },
    buttonTitle:{
        fontSize:23,
        fontFamily:'Poppins-Medium'
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: '70%',
    },
    linkText:{
        color: 'blue',
        margin: 20,
        fontSize: 18,
        fontFamily:'Poppins-Medium'
    },
    errorMessage: {
        textAlign:"center",
        color:'red',
        margin: 10,
        fontSize: 20
    },
    message:{
        textAlign:"center",
        color:'green',
        margin: 10,
        fontSize: 20
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.95)',
    },
})

const listStyle = StyleSheet.create({
    heading:{
        borderRadius:5,
        backgroundColor:"#f4f4f4",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign:"center",
        marginTop:5,
        marginBottom:5,
    },
    headingText:{
        fontSize:22,
        height:50,
        textAlign:"center",
        textAlignVertical: 'center',
        marginBottom: 20,  
        paddingTop:10,
        paddingRight:15,
        width:200,
    },
    listText:{
        fontSize:18,
        height:60,
        textAlign:"center",
        textAlignVertical: 'center',
        marginBottom: 20,  
        paddingTop:10,
        paddingRight:15,
        width:200,
    },
    /*
    work-status
    0: waiting for setup
    1: waiting for delivery
    2: waiting for installation
    3: installation in progress
    4: installation completed
    */
    status1:{
        fontSize:18,
        color:'white',
        width:200,
        height:60,
        textAlign:"center",
        textAlignVertical: 'center', 
        backgroundColor:"darkred",
        borderRadius:10
    },
    status2:{
        fontSize:18,
        color:'white',
        width:200,
        height:60,
        textAlign:"center",
        textAlignVertical: 'center', 
        backgroundColor:"#20babd",
        borderRadius:10
    },
    status3:{
        fontSize:18,
        color:'white',
        width:200,
        height:60,
        textAlign:"center",
        textAlignVertical: 'center', 
        backgroundColor:"lightgreen",
        borderRadius:10
    },
    status4:{
        fontSize:18,
        color:'white',
        width:200,
        height:60,
        textAlign:"center",
        textAlignVertical: 'center', 
        backgroundColor:"green",
        borderRadius:10
    },
})

const detailStyle = StyleSheet.create({
    container:{
        flex: 1, 
        width: '90%',
        justifyContent: 'flex-start', 
        backgroundColor:'white',
    },
    horizontal:{
        marginTop:15,
        flexDirection:"row",
        backgroundColor:"white",
    },
    inputContainer:{
        width:400,
        height:70,
        marginTop:20,
        marginBottom:20,
        borderWidth:1,
        borderColor:'grey'
    },
    image:{
        marginLeft:30,
        width: 50,
        height: 50,
    },
    photoContainer:{
        marginTop: 20
    }
})

const cameraStyles = StyleSheet.create({ 
    container:{
        flex:1,
        flexDirection:"column",
        padding:20
    },
    horizontal:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    camera:{
        flex:12,
    },
    buttonContainer:{
        flex:1,
        alignItems:"center",
        backgroundColor:'black',
    },
    button:{
        marginTop:20,
        width:150,
        height:60
    },
    preview:{
        alignSelf:"stretch",
        flex:1,
    },
    image:{
      marginTop:10,
      width: 80,
      height: 80,
    }, 
    inputContainer:{
        margin:10,
        width:300,
    },
 })

export { basicStyle, listStyle, detailStyle, cameraStyles }