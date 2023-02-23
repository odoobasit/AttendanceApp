import { NavigationContainer ,} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Radio from './screens/Radio';
import attendance from './screens/attendance';
import Tracker from './screens/Tracker';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Signup from './screens/Signup';
import History from './screens/History';
import User from './screens/User';
import Admin from './screens/Admin';
import add from './screens/add';
import  update from './screens/update';
import  remove from './screens/remove';
import rights from './screens/rights';
import Userpanel from './screens/Userpanel';
import forgot from './screens/forgot';
import adminregister from './screens/adminregister';
import bottom from './screens/bottom';
import Model from './screens/Model';



const Stack=createStackNavigator();

const App = () => {
 
  return (
   <NavigationContainer >
    <Stack.Navigator initialRouteName='Splash'>
    <Stack.Screen name='attendance' component={attendance} options={{title:"Attendance",headerTitleAlign: 'center',headerTintColor:"white",
     headerStyle: {
      backgroundColor: "#0096FF",
      height:80,  
    },
    headerTitleStyle: {
      fontSize:24
    },
    }}/>
     <Stack.Screen name='Model' component={Model}options={{headerShown: false}}/>
    <Stack.Screen name='bottom' component={bottom}options={{headerShown: false}}/>
     <Stack.Screen name='Add User' component={add}options={{headerShown: false}}/>
     <Stack.Screen name='forgot' component={forgot}options={{headerShown: false}}/>
     <Stack.Screen name='Userpanel' component={Userpanel}options={{headerShown: false}}/>
     <Stack.Screen name='rights' component={rights} options={{title:"Admin Rights",headerTitleAlign: 'center',headerTintColor:"white",
      headerStyle: {
      backgroundColor: "#ff6347",
      height:60,  
    }}}/>
     <Stack.Screen name='Remove User' component={remove}options={{headerShown: false}}/>
     <Stack.Screen name='adminregister' component={adminregister}options={{headerShown: false}}/>
     <Stack.Screen name='Update User' component={update}options={{headerShown: false}}/>
    <Stack.Screen name='Radio' component={Radio}options={{headerShown: false}}/>
    <Stack.Screen name='User' component={User}  options={{title:"Attendance Panel",headerTitleAlign: 'center',headerTintColor:"white",
     headerStyle: {
      backgroundColor: "#ff6347",
      height:60,  
    }}}/>
     <Stack.Screen name='Admin' component={Admin} 
    options={{title:"Admin Panel",headerTitleAlign: 'center',headerTintColor:"white",
     headerStyle: {
      backgroundColor: "#ff6347",
      height:60,  
    },
    headerBackTitleVisible:false
  }}
    />
    <Stack.Screen name='Login' component={Login}options={{headerShown: false}}/>
    <Stack.Screen name='Signup' component={Signup} 
    options={{title:"Registration",headerTitleAlign: 'center',headerTintColor:"white",
     
    headerTitleStyle: {
      fontSize:25
    },
    headerLeft: () => {
      return null;
    },
    
    headerStyle: {
      backgroundColor: "#0096FF",
      height:60,  
    }}}
    // options={{headerShown: false}}
    />
    <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}}/>
    <Stack.Screen name='Tracker' component={Tracker} options={{headerShown: false}}/>
    <Stack.Screen name='History' component={History} options={{title:"View Attendance",headerTitleAlign: 'center',headerTintColor:"white",
     headerTitleStyle: {
      fontSize:25
    },
    // headerLeft: () => {
    //   return null;
    // },
     headerStyle: {
      backgroundColor: "#0096FF",
      height:60,  
    }}}/>

    </Stack.Navigator>
   </NavigationContainer>
  
   
  )
}

export default App;

const styles = StyleSheet.create({

  imageStyle: {
    marginLeft: 20,
    height: 30,
    width: 30,

  },

});

