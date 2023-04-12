import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Dimensions
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const KeyboardAvoidingComponent = () => {
    const [test, setTest] = useState('')
    const screenHeight = Dimensions.get('window').height;
    const headerHeight = useHeaderHeight()+34;
    const contentHeight = screenHeight - headerHeight;
    console.log(screenHeight,headerHeight,contentHeight)
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{borderWidth:1, borderColor:'red', flex:1}}>
            <View style={{ borderWidth:3, borderColor:'green', height:'100%', width:'100%', }}>
                <Button title="Submit" onPress={() => setTest('TEST')} />
            </View>
            {test===''?null:
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-100}
            style={{ borderWidth:3, borderColor:'blue', position:'absolute', height:'100%', width:'100%', backgroundColor:'white'}}>
                <Text>{test}</Text>
                <Button title="Hide" onPress={() => setTest('')} />
            </KeyboardAvoidingView>}
            {/*<KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={-100}
                style={{ borderWidth:3, borderColor:'green', height:'100%', width:'100%'}}>
                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Header</Text>
                    <TextInput placeholder="Username" style={styles.textInput} />
                    <View style={styles.btnContainer}>
                    <Button title="Submit" onPress={() => null} />
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>*/}
        </ScrollView>
    );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: '100%',
//     borderWidth:1,
//     borderColor:'red'
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'space-around',
//   },
//   header: {
//     fontSize: 36,
//     height:800,
//     borderWidth:1,
//     borderColor:'red',
//     marginBottom: 48,
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#000000',
//     borderBottomWidth: 1,
//     marginBottom: 36,
//   },
//   btnContainer: {
//     backgroundColor: 'white',
//     marginTop: 12,
//   },
// });

export default KeyboardAvoidingComponent;