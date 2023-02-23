import { View, Text,TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native'
import React from 'react'
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default function rights({ navigation }) {
  return (
    <View style={styles.view1} >
     <TouchableOpacity style={styles.loginBtn} onPress={()=>{navigation.navigate("adminregister")}}>
                <Text style={styles.text1}>Add User</Text>
                <Image style={styles.img} source={require("../assests/man.png")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} >
                <Text style={styles.text1}>Update User</Text>
                <Image style={styles.img} source={require("../assests/reload.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} >
                <Text style={styles.text1}>Delete User</Text>
                <Image style={styles.img} source={require("../assests/user.png")}/>
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
        backgroundColor: "#ff6347",
        alignSelf:"center",
        marginTop:height*.06,
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
        
       flexDirection:'column',
       alignSelf:'center'
      },
      text1: {
        fontFamily: "Cochin",
        fontWeight: 'normal',
        fontSize: 19,
        color: 'black',
      },
});

