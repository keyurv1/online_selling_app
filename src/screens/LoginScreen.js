import React,{useState} from 'react'
import { View, Text,Image,StyleSheet,TextInput,Button,Alert,KeyboardAvoidingView,TouchableOpacity} from 'react-native'
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const userLogin = async ()=>{
        if(!email|| !password ){ Alert.alert("Please enter all the fields!")
        return
    }
    try{
        const result = await auth().signInWithEmailAndPassword(email,password)
    }catch(err){
        Alert.alert("Something went wrong!")
    }
}

    return (
        <KeyboardAvoidingView behavior="position">
           <View style={styles.box1}>
                <Image style={{width:100,height:100,margin:20}} source={require('../assets/user_logo.png')}/>
                <Text style={styles.text}>Please Login to Continue!</Text>
           </View>
           <View style={styles.box2}>
                <TextInput
                placeholder="Email"
                style={{borderWidth:1,marginRight:20,marginLeft:20,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
                value={email}
                onChangeText={text=> setEmail(text)}
            />

                <TextInput
                placeholder="Password"
                style={{borderWidth:1,marginRight:20,marginLeft:20,marginTop:10,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
                value={password}
                secureTextEntry={true}
                onChangeText={text=> setPassword(text)}
               />

                <Button title="Login" 
                color="darkblue"
                onPress={()=>userLogin()}
                />

            <TouchableOpacity  onPress={()=>navigation.navigate("SignUp")}><Text style={{textAlign:"center"}}>Don't have an account!</Text></TouchableOpacity>  

           </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    box1:{
     alignItems:"center"
    },
    box2:{
        marginTop:30,
        height:"50%",
        marginHorizontal:20,
        justifyContent:"space-evenly"
       },
    text:{
        fontSize:20
    },
   
  });
  

export default LoginScreen
