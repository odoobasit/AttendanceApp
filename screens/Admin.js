import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,ActivityIndicator,BackHandler,Alert } from 'react-native'
import React, { useState ,useEffect} from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Admin({ navigation,route }) {
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
          alert("Sucessfully Logout")
        } catch(e){
          alert("Failed")
        }
    }
}
  return (
    <View>
      <View style={styles.view1} >
        <TouchableOpacity style={styles.loginBtn} onPress={() => { navigation.navigate("rights") }}>
          <Text style={styles.text1}>Admin Rights</Text>
          <Image style={styles.img} source={require("../assests/admin.png")} />
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.loginBtn} >
          <Text style={styles.text1}>Report</Text>
          <Image style={styles.img} source={require("../assests/document.png")} />
        </TouchableOpacity>

      </View>
      <View style={styles.view2}>
      <TouchableOpacity
          onPress={() => logout()}
          style={styles.roundButton1}>
               {loading2 ? (
                  <ActivityIndicator size="small" color="#800000"  />
                ) : (
                  <Icon name="power-off" size={16} color="#ffffff" />
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
    width: width * 0.4,
    height: height * 0.07,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: "#ff6347",
  },
  loginBtn: {
    elevation: 9,
    width: width * .4,
    borderRadius: 25,
    height: height * .2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff6347",
    alignSelf: "center",
    marginTop: height * .3,
    marginLeft: height * .01
  },
  img: {

    padding: 10,
    margin: 5,
    height: height * 0.1,
    width: width * 0.9,
    resizeMode: 'contain',
  },
  view1: {

    flexDirection: 'row',
    alignSelf: 'center'
  },
  text1: {
    fontFamily: "Cochin",
    fontWeight: 'normal',
    fontSize: 19,
    color: 'black',
  },
});

