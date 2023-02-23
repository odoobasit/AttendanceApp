
import React, { useState,useEffect,useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, ActivityIndicator, Dimensions, Alert,BackHandler

} from "react-native";
import Background from './Background';
import Model, {onPressHandler} from '../screens/Model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sha256 } from 'react-native-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { sha1 } from 'react-native-sha1';
import {useNetInfo} from "@react-native-community/netinfo";
 import { hideNavigationBar } from 'react-native-navigation-bar-color';
 import Snackbar from "react-native-snackbar"
var a;
var element2=[];

export default function Login({ navigation,props}) {
    var value;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [result1, setResult1] = useState('');
    const [loading, setLoading] = useState(false);
    const netInfo = useNetInfo();
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const backAction = () => {
          Alert.alert(
            'Exit App!',
            'Existing the Application',
            [
              {
                text: 'Cancel',
                onPress: () => { console.log('Cancel Pressed') },
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
              },
            ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, [])

    useEffect(() => {
        setVisible(!netInfo?.isConnected )
      }, [])

      useEffect(() => {
        setVisible(true)
    
        setTimeout(() => {
          if(netInfo?.isConnected ){
            setVisible(false)
          }
        }, 2000);
    
      }, [netInfo?.isConnected])
      
      example = async () => {
        try{
            const response = await changeNavigationBarColor('#80b3ff', true);
            console.log(response)// {success: true}
        }catch(e){
            console.log(e)// {success: false}
        }
      
    };
//     const functionExample=()=>
// {
//     return (
//     <Model/>
//     );
// }
    const convertToSHA = async() => {
        setLoading(true);
      // console.log(password)
       await sha256(password).then(hash => {
            a=hash;
        })
        console.log(a)
            const data = {
                email: email,
                password:a
            }
            fetch('http://202.63.199.67:8082/api/token', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) =>res.json())
            
                    .then(async (data1) => {
                            const result = Object.keys(data1).map(key => ({ [key]: data1[key] }));
                            console.log(result)
                            if (result[2].userName == "User")
                             {
                                setLoading(false)
                                setEmail("")
                                setPassword("")
                                // console.log(result[2].userName)
                                try {
                                   value=await AsyncStorage.setItem('@storage_Key',JSON.stringify(data1))
                                } 
                                catch (e) 
                                {
                                    console.log("Error ")
                                }
                                try {
                                    value = await AsyncStorage.getItem('@storage_Key')
                                    if (value!== null) 
                                    {
                                        console.log(value)
                                        navigation.navigate("Userpanel",{value});
                                    }
                                }
                                 catch (e) {
                                    console.log("Error Navigation")
                                }
                            }
                        else if(result[2].userName == "Admin")
                        {  
                            setLoading(false)
                            setEmail("")
                            setPassword("")
                            try {
                                value=await AsyncStorage.setItem('@storage_Key',JSON.stringify(data1))
                             } 
                             catch (e) 
                             {
                                 console.log("Error ")
                             }
                             try {
                                 value = await AsyncStorage.getItem('@storage_Key')
                                 if (value!== null) 
                                 {
                                     navigation.navigate("Admin",{value});
                                 }
                             }
                              catch (e) {
                                 console.log("Error Navigation")
                             }
                        } 
                           
                        else if(result[3].email !=email)
                        {
                          //  new  Model.onPressHandler()
                            setLoading(false)
                            setEmail("")
                            setPassword("")  
                            // functionExample()
                            Alert.alert('AMS!','Invalid Email Address')
                          
                        } 
                    
                            else {
                                setLoading(false)
                                setEmail("")
                                setPassword("")
                                Alert.alert('AMS!','Something went wrong')
                            }
    
                    }).catch((err) => {
                        setLoading(false)
                        Snackbar.show({
                            text: 'Internet not working',
                            duration: Snackbar.LENGTH_SHORT,
                            numberOfLines: 2,
                            textColor: '#fff',
                            backgroundColor: '#cc0000'
                          });
                    }).finally(() => setLoading(false));
    

        
       
    };

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off-outline');
            //setRightIconColor('#FF0000')  
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off-outline') {
            setRightIcon('eye');
            //setRightIconColor('#0C8A7B')
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const verifyEmail = () => {
        const strongRegex = new RegExp(/^(([^<>()[\]\.,;:?\s@\"]+(\.[^<>()[\]\.,;:?\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (email=="") {
            Snackbar.show({
                text: 'Email address is Empty',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: '#fff',
                backgroundColor: '#cc0000'
              });
            return false;
        } 
        else if (!strongRegex.test(email)) {
            Snackbar.show({
                text: 'Invalid Email address',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: '#fff',
                backgroundColor: '#cc0000'
              });
            return false;
        }
        else if (password=="") {
            Snackbar.show({
                text: 'Password Empty',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: '#fff',
                backgroundColor: '#cc0000'
              });
            return false;
        }
        else if (password.length < 8) {
            Snackbar.show({
                text: 'Password is too short',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                textColor: '#fff',
                backgroundColor: '#cc0000'
              });
            return false;
        }
        else {
            convertToSHA()
            return true;
        }
    }

    const handleSubmit = () => {
        verifyEmail()

    }
    return (
        <Background style={{backgroundColor:"#0096FF"}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize:50,
              fontWeight: 'bold',
              marginVertical: 20,
             marginRight:height*.01
            }}>
            Login
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              height:height*.99,
            //   width: 460,
              borderTopLeftRadius:height*.2,
              paddingTop:height*.2,
             padding:height*.05
            }}>
            
            <View style={styles.inputView}>
            <Icon name="email" size={20} style={styles.icon1}/>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    value={email}
                    // placeholderTextColor="#fff"
                    keyboardType="email-address"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
            <Icon name="lock" size={20} style={styles.icon1}/>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    // placeholderTextColor="#fff"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <Icon name={rightIcon} size={20} style={styles.icon1} onPress={() => handlePasswordVisibility()} />
            </View>
            <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => { navigation.navigate("forgot") }}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
             <View style={styles.row1}>
            <TouchableOpacity style={styles.roundButton1} onPress={() => handleSubmit()}>
                {loading ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    <Icon name="cached" size={30} style={styles.icon1}/>
                    // <Text style={styles.Text}>Login</Text>
                )}
            </TouchableOpacity>
            </View>
            <View style={styles.row}>
        <Text style={styles.Text1}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
            {/* <TouchableOpacity style={styles.loginBtn} onPress={() => { navigation.navigate("Signup") }}>
                <Text style={styles.Text}>Registration</Text>
            </TouchableOpacity> */}
            <View style={styles.row3}>
            {visible &&  
      <Text style={{ 
              backgroundColor:netInfo?.isConnected ? "#228B22":'#A0A0A0',
              textAlign:'center',borderRadius:10,paddingVertical:12,width:width*.4,
              fontWeight:'bold', fontSize:13,color:'black'}}>{netInfo?.isConnected? <Icon name="wifi" size={20} style={styles.icon1}/>:<Icon name="wifi-off" size={20} />}
             {netInfo?.isConnected? "Online" :"Offline..."} 
      </Text>
      }</View>
          </View>
        </View>
      </Background>
    );
}

const styles = StyleSheet.create({
    row3: {
        alignItems: 'center',
       paddingTop:height*.1
      },
    row1: {
        alignItems: 'center',
      },
    roundButton1: {
        width:width*.2,
        height:height*.1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#0096FF',
      },
   
    text2:{
        fontWeight:'bold',
        fontSize:30,
        color:'blue'
      },
    a: {
        alignItems: 'center',
        marginBottom:height*.1,
        
      },
    Text1: {
        color: 'red',
        fontSize: 16,
    },
    link: {
        fontWeight: 'bold',
        color:"red",
        fontSize: 18,
      },
    row: {
        marginTop:height*.03,
        flexDirection: 'row',
        paddingLeft:height*.06
       
      },
    forgotPassword: {
        width: '100%',
        alignSelf:'flex-end',
        marginBottom: 24,
        paddingLeft:height*.2
      },
      forgot: {
        fontSize: 18,
        color:"#0096FF",
      },
    container: {
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    icon1:
    {
        color: 'black',
        padding:5,
    },

    image: {
        width:height*.3,
        height:height*.31
    },
    Text: {

        color: 'white',
        fontSize: 18,
        fontWeight:'bold'

    },

    inputView: {
       
        borderWidth:2,
        borderRadius: 10,
        width: width * .8,
        height: height * .09,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextInput: {
        width: width * .6,
        height: height * .07,
        // color: 'white',   
        fontSize: 16,
    },

    forgot_button: {
        height: 30,

    },

    loginBtn: {
        width: width * .6,
        borderRadius: 11,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "blue",
    },
});