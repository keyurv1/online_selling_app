import React,{useState} from 'react'
import { View, Text ,TextInput,Button,KeyboardAvoidingView,StyleSheet,Icon,Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'

const CreateAdScreen = () => {
const [name,setName] = useState('')
const [desc,setDesc] = useState('')
const [year,setYear] = useState('')
const [price,setPrice] = useState('')
const [phone,setPhone] = useState('')
const [image,setImage] = useState()

const uploadImage = async () => {
      ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
      }).then(image => {
        // console.log(image);

        const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(image.path)
        uploadTask.on('state_changed', 
        (snapshot) => {
           
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             if(progress==100){alert("uploaded")}
        }, 
        (error) => {
           alert("something went wrong")
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               
                setImage(downloadURL)
            });
        }
        );

    })
}

    const postData = async ()=>{
      try{
        await firestore().collection('ads')
        .add({
          name,
          desc,
          year,
          price,
          phone,
          image,
          uid:auth().currentUser.uid
        })
        Alert.alert("Posted your Ads ")
      }catch(err){
        Alert.alert("something went wrong!")
      }
      
    }
  

    return (
        <KeyboardAvoidingView behavior="position">
            <Text style={styles.text} >Create Advertising!</Text>
            <TextInput
               placeholder="Ad Title"
               style={{borderWidth:1,marginRight:20,marginLeft:20,marginTop:10,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
               value={name}
               onChangeText={text=> setName(text)}
            />

            <TextInput
               placeholder="Description What You Are Selling!"
               style={{borderWidth:1,marginRight:20,marginLeft:20,marginTop:10,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
               value={desc}
               numberOfLines={3}
               multiline={true}
               onChangeText={text=> setDesc(text)}
            />
             <TextInput
               placeholder="Year of Perchase"
               style={{borderWidth:1,marginRight:20,marginLeft:20,marginTop:10,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
               value={year}
               keyboardType="numeric"
               onChangeText={text=> setYear(text)}
            />

            <TextInput
               placeholder="Price in INR"
               style={{borderWidth:1,marginRight:20,marginLeft:20,marginTop:10,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
               value={price}
               keyboardType="numeric"
               onChangeText={text=> setPrice(text)}
            />

            <TextInput
               placeholder="Your Contact Number"
               style={{borderWidth:1,marginRight:20,marginLeft:20,marginTop:10,borderRadius:5,backgroundColor:"white",borderColor:"darkblue"}}
               value={phone}
               keyboardType="numeric"
               onChangeText={text=> setPhone(text)}
            />
            <View style={{marginVertical:10,marginHorizontal:20}}>
               <Button title="Camera" 
                  color="darkblue"
                  onPress={()=>uploadImage()}
              />
            </View>

            <View style={{marginVertical:10,marginHorizontal:20}}>
               <Button title="Post" 
                  color="darkblue"
                  onPress={()=>postData()}
            />
            </View>
                
          </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    text:{
        fontSize:20,
        textAlign:"center",
        margin:20
        
    },
   
  });

export default CreateAdScreen
