import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,ActivityIndicator,BackHandler,Alert} from 'react-native'
import React, { useState ,useEffect} from "react";
import Icon from 'react-native-vector-icons/Ionicons';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';


export default function Userpanel({ navigation,route}) {
  const {value} = route.params;

  const [loading2, setLoading2] = useState(false);


  useEffect(() => { 
  
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

  const logout = async () => {
    // setLoading2(true)
   console.log(value)
   const value = await AsyncStorage.getItem('@storage_Key')
    if (value!== null) 
    {
        try {
          console.log(value)
          setLoading2(false)
          const user = JSON.parse(value);
           console.log(user)
          await AsyncStorage.clear()
          navigation.navigate('Login')
          Alert.alert('Logout!','Sucessfully Logout')
        } catch(e){
          alert("Failed")
        }
    }
}
  return (
    <View>
      {/* <View style={styles.view1} >
        <TouchableOpacity style={styles.loginBtn} onPress={() => {navigation.navigate("bottom",{value})}}>
          <Text style={styles.text1}>Attendance</Text>
          <Image style={styles.img} source={require("../assests/attendance.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn1} >
          <Text style={styles.text1}>Report</Text>
          <Image style={styles.img} source={require("../assests/document.png")} />
        </TouchableOpacity>

      </View> */}
      <View style={styles.view1} >
        
          <View>
          
          <Card onPress={()=>{navigation.navigate("bottom",{value})}} style={styles.tabs}>
          <Text style={styles.text1}>Attendance</Text>
          <Image style={styles.img} source={require("../assests/attendance.png")} />
          </Card>
          </View>
        
        
       
          <View>
          <Card style={styles.tabs}>
          <Text style={styles.text2}>Report</Text>
          <Image style={styles.img1} source={require("../assests/document.png")} />
          </Card>
          </View>
        

        
      </View>
      <View style={styles.view2}>
      <TouchableOpacity
          onPress={() => logout()}
          style={styles.roundButton1}>
               {loading2 ? (
                  <ActivityIndicator size="small" color="#800000"  />
                ) : (
                  <Icon name="exit-outline" size={30} color="#000" />
                )}
          
        </TouchableOpacity>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  Text: {
    color: "#fff",

  },
  view2: {
    flexDirection:'column',
    marginTop:height*.3,
    marginRight:height*.02,
    alignItems:'flex-end'
  },
  roundButton1: {
    width:width*.2,
    height:height*.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
    marginRight:height*.05
  },
  tabs:{
    width: width * .4,
    height: height *.2,
    elevation: 10,
    borderRadius: 25,
    marginTop:height*.3,
    borderColor:'#0096FF',
      borderWidth:1,
      alignItems: "center",
     justifyContent: "center",
    
  },
  img:{
    width: width * .2,
    height: height *.1,
    marginTop:height*.02,
    resizeMode: 'contain',
    marginLeft:width*.04,
  },
  img1:{
    width: width * .2,
    height: height *.1,
    marginTop:height*.02,
   
    resizeMode: 'contain',
  },
  text1:{
    fontFamily: "Cochin",
      fontWeight: 'normal',
       fontSize: 19,
       color: 'black',
       alignSelf:'center',
       marginTop:height*.02,
      
  },
  text2:{
      fontFamily: "Cochin",
      fontWeight: 'normal',
       fontSize: 19,
       color: 'black',
       alignSelf:'center',
       marginTop:height*.02,
     
  },
  // loginBtn: {
  //   elevation: 10,
  //   width: width * .4,
  //   borderRadius: 25,
  //   height: height *.2,
  //   borderColor:'#0096FF',
  //   borderWidth:1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#fff",
  //   alignSelf: "center",
  //   marginTop: height * .3,
  //   marginLeft: height * .01
  // },
  // loginBtn1: {
  //   elevation: 10,
  //   width: width * .4,
  //   borderRadius: 25,
  //   height: height *.2,
  //   borderColor:'#0096FF',
  //   borderWidth:1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#fff",
  //   alignSelf: "center",
  //   marginTop: height * .3,
  //   marginLeft: height * .02
  // },
  // img: {

  //   padding: 10,
  //   margin: 5,
  //   height: height * 0.1,
  //   width: width * 0.9,
  //   resizeMode: 'contain',
  // },
  view1: {

    flexDirection: 'row',
    justifyContent:"space-evenly"
  },
  // text1: {
  //   fontFamily: "Cochin",
  //   fontWeight: 'normal',
  //   fontSize: 19,
  //   color: 'black',
  // },
});
