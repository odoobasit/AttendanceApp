import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,ActivityIndicator,BackHandler,Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Radio from './Radio';
import History from './History';
import Snackbar from "react-native-snackbar"
import React, { useState ,useEffect} from "react";
import { Baseurl } from './BaseURL';
var element1=[];
const Tab = createBottomTabNavigator();

export default function bottom({navigation,route}) {

  const [loading, setLoading] = useState(false);
  const {value} = route.params;
  const user = JSON.parse(value);
  const url= `${Baseurl}/attendance/${user.userId}`;
  
    
    const viewattendance= async() => {
     await fetch(url,{
        method:'GET',
        headers: {
          Authorization:`Bearer ${user.password}`,
          Accept: 'application/json', 
          'Content-Type':'application/json',
        }})
        .then(response =>{
          if (!response.ok)
          {
            Snackbar.show({
              text: 'Something went wrong',
              duration: Snackbar.LENGTH_SHORT,
              numberOfLines: 2,
              textColor: '#fff',
              backgroundColor: '#cc0000'
            });   
          }
          else
          {
              return response.json().then(async (response) =>{
                console.log('data');
                await response.map((item) => 
                  {
                      element1.push(item)
                      // console.log(element1)
                    
                  } 
                  )
                } 
                )
          }
        }
         )
        .catch( console.log("Network issue"),setLoading(false)
        )
    
     }
     useEffect(() => { 
       viewattendance()
     },10);

    


    useEffect(() => {
      // console.log(user)
        const backAction = () => {
        Alert.alert(
          'Exit App!',
         'Existing the Application', 
        [
          {
            text: 'Cancel',
            onPress: () => {console.log('Cancel Pressed')},
            style: 'cancel',
          },
          {
            text: 'OK', 
            onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    
      return () => backHandler.remove(); 
     }, []) 

  return (
    <Tab.Navigator
      initialRouteName="Radio"
      screenOptions={{
        tabBarActiveTintColor: '#000',
      }}
    >
      <Tab.Screen
        name="Radio"
        component={Radio}
        initialParams={{value}}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        initialParams={{value,element1}}
        options={{
          title:"Attendance History",headerTitleAlign: 'center',headerTintColor:"white",
          headerTitleStyle: {
            fontSize:25
          },
           headerStyle: {
            backgroundColor: "#0096FF",
            height:60,  
           },
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-comfy" color={color} size={size} />
          ),
        //   tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}