import { View, Text,TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native'
import React from 'react'
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default function User({ navigation }) {
  return (
    <View style={styles.view1} >
     <TouchableOpacity style={styles.loginBtn} onPress={()=>{navigation.navigate("Radio")}}>
                <Text style={styles.text1}>Attendance</Text>
                <Image style={styles.img} source={require("../assests/icon.png")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>{navigation.navigate("Radio")}}>
                <Text style={styles.text1}>Report</Text>
                <Image style={styles.img} source={require("../assests/document.png")}/>
            </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    loginBtn: {
        elevation:9,
        width:width*.4,
        borderRadius:25,
        height:height*.2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff7f50",
        alignSelf:"center",
        marginTop:height*.3,
        marginLeft:height*.01
    },
    img:{
     
        padding: 10,
        margin: 5,
        height:height*0.1,
        width:width*0.9,
        resizeMode: 'contain',
      },
      view1:{
        
       flexDirection:'row',
       alignSelf:'center'
      },
      text1: {
        fontFamily: "Cochin",
        fontWeight: 'normal',
        fontSize: 19,
        color: 'black',
      },
});

