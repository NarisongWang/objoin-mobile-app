import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckBox , Input } from '@rneui/themed'


const CheckListItem = ({ title, index, status, note, handleChange, disabled }) => {

    const [check1, setCheck1] = useState(status===1?true:false);
    const [check2, setCheck2] = useState(status===2?true:false);
    const [check3, setCheck3] = useState(status===3?true:false);
    const [noteInput, setNoteInput] = useState(note);
  
    useEffect(()=>{
      changeInput();
    },[noteInput])
  
    const setCheck = (i) =>{
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      let checkStatus;
      switch (i) {
        case "1":
          setCheck1(true);
          checkStatus=1;
          break;
        case "2":
          setCheck2(true);
          checkStatus=2;
          break;
        case "3":
          setCheck3(true);
          checkStatus=3;
          break;
        
        default:
          break;
      }
      
      handleChange({"title":title, "index":index, "status":checkStatus, "note":noteInput},index);
    }
  
    const changeInput = () =>{
      let checkStatus = 0
      if (check1)  checkStatus = 1
      if (check2)  checkStatus = 2
      if (check3)  checkStatus = 3
      handleChange({"title":title, "index":index, "status":checkStatus, "note":noteInput},index);
    }
  
    return (
      title !== 'Other notes'?
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{index} - {title}</Text>
        </View>
        {disabled?(
            <View style={styles.checkBoxGroup}>
                <CheckBox title="YES" checked={check1} containerStyle={styles.checkBoxContainer} textStyle={styles.text} disabled={true}></CheckBox>
                <CheckBox title="NO" checked={check2} containerStyle={styles.checkBoxContainer} textStyle={styles.text} disabled={true}></CheckBox>
                <CheckBox title="N/A" checked={check3} containerStyle={styles.checkBoxContainer} textStyle={styles.text} disabled={true}></CheckBox>
            </View>
        ):(
            <View style={styles.checkBoxGroup}>
                <CheckBox title="YES" checked={check1} onPress={()=>{setCheck("1")}} containerStyle={styles.checkBoxContainer} textStyle={styles.text}></CheckBox>
                <CheckBox title="NO" checked={check2} onPress={()=>{setCheck("2")}} containerStyle={styles.checkBoxContainer} textStyle={styles.text}></CheckBox>
                <CheckBox title="N/A" checked={check3} onPress={()=>{setCheck("3")}} containerStyle={styles.checkBoxContainer} textStyle={styles.text}></CheckBox>
            </View>
        )}
        {disabled?(
            <View style={styles.inputContainer}>
            <Input 
                value={noteInput}
                disabled={true}
            />
            </View>
        ):(
            <View style={styles.inputContainer}>
            <Input 
                value={noteInput}
                onChangeText={(newValue) => { setNoteInput(newValue) }}
                autoCapitalize="none"
                autoCorrect={false}
            />
            </View>
        )}
      </View>
      :
      <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.inputContainer2}>
            {disabled?(
                <Input 
                    style={{borderWidth:1}}
                    value={noteInput}
                    multiline={true}
                    numberOfLines={4}
                    disabled={true}
                />
            ):(
                <Input 
                    style={{borderWidth:1}}
                    value={noteInput}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(newValue) => { setNoteInput(newValue) }}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            )}
            
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderWidth:1,
        borderTopColor:"white",
        borderLeftColor:"white",
        borderRightColor:"white",
    },
    textContainer:{
        alignItems:"flex-start",
        marginLeft:20,
        width:270,
        justifyContent:"center",
    },
    text:{
        fontSize:15,
        textAlign:"left",
        textAlignVertical: 'center',
    },
    checkBoxGroup:{
        flexDirection:"row",
    },
    checkBoxContainer:{
        width:80, 
        height:45, 
        backgroundColor:"white", 
        borderColor:"white",
        marginLeft:0,
        marginTop:10,
        fontSize:15,
        justifyContent:"center",
    },
    inputContainer:{
        flex:1,
        marginTop:20
    },
    inputContainer2:{
        flex:1,
        marginTop:20,
    }
  })
  
  export default CheckListItem
  