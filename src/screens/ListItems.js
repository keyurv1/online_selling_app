import React,{useEffect,useState} from 'react'
import { View,  FlatList ,Text,Button,Image,StyleSheet,Linking,Platform} from 'react-native'
import firestore from '@react-native-firebase/firestore';

const ListItems = () => {
const [items,setItems] = useState([])
const [loading,setLoading] = useState(false) 
const getDetails = async ()=>{
const querySnap = await firestore().collection('ads').get()
const result = querySnap.docs.map(docSnap=>docSnap.data())
  console.log(result)
  setItems(result)
}
const openDial=(phone)=>{
    if(Platform.OS === 'android'){
        Linking.openURL(`tel:${phone}`)
    }else{
        //Linking.openURL(`tel:${phone}`)
    }
}
    useEffect(()=>{
        getDetails()
        return()=>{
            console.log("cleanup")
        }
    },[])

const renderItem=(item)=>{
    return(
        <View style={{borderWidth:1,borderColor:"black",margin:10,padding:10}}>
            <Text style={{color:"darkblue",textAlign:"center",fontSize:22}}>{item.name}</Text>
            <Text style={{marginVertical:5}}>{item.desc}</Text>
            <Text style={{marginBottom:5,fontSize:15,}}>{item.year}</Text>
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
        <View>
            <FlatList 
             data = {items}
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
});
  

export default ListItems
