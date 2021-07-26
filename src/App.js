
import React,{useState,useEffect} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/ListItems';
import Feather from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();
const AuthNavigator=()=>{
return(
  <Stack.Navigator>
  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
  <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
 
</Stack.Navigator>
)
}
const TabNavigationv =()=>{
  return(
  <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({  color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'
            
        } else if (route.name === 'Create') {
          iconName = 'plus-circle'
        } else if (route.name === 'Account') {
          iconName = 'user'
        } 
      
        return <View><Feather name={iconName} size={35} color={color} /></View>
      },
    })}
    tabBarOptions={{
      activeTintColor: 'darkblue',
      inactiveTintColor: 'gray',
    }}
  >
        <Tab.Screen name="Home" component={HomeScreen} options={{title:""}} />
        <Tab.Screen name="Create" component={CreateAdScreen} options={{title:""}} />
        <Tab.Screen name="Account" component={AccountScreen} options={{title:""}} />

      </Tab.Navigator>
  )
}

const Navigation=()=>{
  const [user,setUser] = useState('')
  useEffect(()=>{
  const unsubscribe =   auth().onAuthStateChanged((userExist)=>{
      if(userExist){
          setUser(userExist)
      }else{
          setUser("")
      }
    })
    return unsubscribe
  },[])
  return(
    <NavigationContainer>
     {user? <TabNavigationv/>:<AuthNavigator/>}
     
    </NavigationContainer>
  )
}

const App = () => {
return (
<>
   <StatusBar barStyle="light-content" backgroundColor="darkblue"/>
      <View style={styles.container}>
   <Navigation/>
  </View>
</>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  }
});

export default App;
