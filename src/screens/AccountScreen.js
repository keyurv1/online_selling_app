import React,{useState,useEffect} from 'react'
import {View,  FlatList ,Text,Button,Image,StyleSheet,Linking,Platform } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const AccountScreen = () => {
const [items,setItems] = useState([])
const [loading,setLoading] = useState(false) 
const getDetails = async ()=>{
const querySnap = await firestore().collection('ads')
    .where('uid','==',auth().currentUser.uid)
    .get()
    const result =  querySnap.docs.map(docSnap=>docSnap.data())
    // console.log(result)
     setItems(result)
  }
    
    
  useEffect(()=>{
      getDetails()
      return ()=>{
      console.log("cleanup")
    }
  },[])


 

  const renderItem=(item)=>{
      return(
          <View style={{borderWidth:1,borderColor:"black",margin:10,padding:10}}>
              <Text style={{color:"red" , textAlign:"center"}}>{item.name}</Text>
              <Text>{item.desc}</Text>
              <Text>{item.year}</Text>
              <Image style={{width:"100%",height:150}} source={{ uri: item.image }}/>
              <View style={{marginVertical:10}}>
              <Button style={{marginTop:10}} title={item.price}></Button>
              </View>

              <View style={{marginVertical:10}}>
              <Button style={{marginTop:10}} onPress={()=>openDial()} title="call seller"/>
              </View>
                
          </View>
        )
    }


    return (
        <View style={{flex:1}}>
            <View style={{height:'30%',justifyContent:"space-evenly",alignItems:"center"}}>
              <Text style={{fontSize:22}}>{auth().currentUser.email}</Text>
              <Button  title="Logout" onPress={() => auth().signOut()}/>
              <Text style={{fontSize:22}}>Your ads!</Text>        
            </View>
           
        <FlatList 
            data={items}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>renderItem(item)}
            onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
            }}
            refreshing={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });

export default AccountScreen
