
import React, { useState,useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity, Dimensions, Alert, ActivityIndicator, PermissionsAndroid,Pressable,BackHandler
} from "react-native";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { sha256 } from 'react-native-sha256';
import ImgToBase64 from 'react-native-image-base64';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera } from 'react-native-image-picker'
import Snackbar from "react-native-snackbar"
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import { sha1 } from 'react-native-sha1';
import { ScrollView } from "react-native-gesture-handler";
import { Baseurl } from './BaseURL';
import {useNetInfo} from "@react-native-community/netinfo";
var a;
var element1=[];
var object=[];



export default function Signup({ navigation }) {

    const [ImageData, setImageData] = useState(null);
    // const [disabled,setDisabled]=useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setconfirm] = useState("");
    const [displayname, setdisplayname] = useState("");
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [passwordVisibility1, setPasswordVisibility1] = useState(true);
    const [rightIcon1, setRightIcon1] = useState('eye');
    const netInfo = useNetInfo();
    const [visible, setVisible] = useState(true)
    const url = `${Baseurl}/user`;
    const [items, setItems] = useState([
        { label: 'Admin', value: 'Admin' },
        { label: 'User', value: 'User' }
    ]);


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

    useEffect(() => {
        let secTimer = setInterval( () => {
            fetch(url,{
                method:'GET',
                headers: {
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
                      return response.json().then((response) =>{
                         response.map((item) => 
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
                 .catch((err) => console.log(err),setLoading(false)
                )
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);

    useEffect(() => {
      
        const backAction = () => {
            Alert.alert(
              'Exit AMS!',
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
      },[]);

      
    const openCamera = async () => {
        
        const result = await launchCamera({ mediaType: 'photo', cameraType: 'front'});
        img = result.assets[0].uri;
        setImageData(result)
        Base(img)
      
        // console.log(img);
    }

    const Base = async (img) => {
        ImgToBase64.getBase64String(img)
            .then(base64String => {
                // console.log(base64String)
                adeel = base64String
                // console.log(adeel)
            }

            )
            .catch(err => console.log(err));
    }


    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                openCamera();
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handlePasswordVisibility1 = () => {
        if (rightIcon1 === 'eye') {
            setRightIcon1('eye-off');
            setPasswordVisibility1(!passwordVisibility1);
        } else if (rightIcon1 === 'eye-off') {
            setRightIcon1('eye');
            setPasswordVisibility1(!passwordVisibility1);
        }
    };
    // const convertToSHA1= async () => { await sha256(password).then(hash => {
    // //    setResult(hash)
    //    a=hash
    //    console.log(a)
    // })}
    const convertToSHA = async () => {
        // console.log("adeel")
        setLoading(true)
        // setDisabled(true)
        await sha256(password).then(hash => {
            a = hash;
            console.log(a)
        })
        // const filterEmail = object.includes(email);
        // console.log(filterEmail)
       
        if(element1.find( x => x.email == email.toLowerCase()))
        {   
            Snackbar.show({
            text: 'Email Already Exists',
            duration: Snackbar.LENGTH_SHORT,
            numberOfLines: 2,
            textColor: '#fff',
            backgroundColor: '#cc0000'
        })
      return setLoading(false)
    }
    else {
        fetch('http://202.63.199.67:8082/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                displayName: displayname,
                userName: value,
                email:email.toLowerCase(),
                password: a,
                // imageBytes: adeel.toString(),
                createdDate: null,
            })
        })
            .then((response) =>response.json())
            .then((responseData) => {
                setLoading(false)
                setEmail("")
                setValue("")
                setPassword("")
                setconfirm("")
                setdisplayname("")
                setImageData("")
                // setDisabled(false)
                console.log("RESULTS HERE:", responseData)
                Alert.alert( 'AMS!',
                'User Registered Successfully')
    
            })
            .catch((error) => {
                setLoading(false)
                // setDisabled(false)
                setEmail("")
                setPassword("")
                setconfirm("")
                setdisplayname("")
                setValue("")
                setImageData("")
                // setItems("")
                // // setOpen("")
                        Snackbar.show({
                            text: 'Internet not working/Server down',
                            duration: Snackbar.LENGTH_SHORT,
                            numberOfLines: 2,
                            textColor: '#fff',
                            backgroundColor: '#cc0000'
             });
            })

    }

    };

    const Register = () => {
        {
            const strongRegex = new RegExp(/^(([^<>()[\]\.,;:?\s@\"]+(\.[^<>()[\]\.,;:?\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
            var usernameRegex = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
            if (displayname == "") {
                Snackbar.show({
                    text: 'Display Name is Empty',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                return false;
            }
            else if (!usernameRegex.test(displayname)) {
                Snackbar.show({
                    text: 'Name not include numbers/spaces/special characters',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                return false;
            }
            else if (open == "" && value == "") {
                Snackbar.show({
                    text: 'Select user type',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                return false;
            }
            else if (email == "") {
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
                setEmail("")
                return false;
            }

            else if (password == "") {
                Snackbar.show({
                    text: 'Please enter password',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                return false;
            }
            else if (password.length < 8) {
                Snackbar.show({
                    text: 'Password is weak',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                setPassword("")
                return false;
            }
            else if (confirm == "") {
                Snackbar.show({
                    text: 'Please enter confirm password',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                return false;
            }
            else if (confirm.length < 8) {
                Snackbar.show({
                    text: 'Confirm Password is weak',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                setconfirm("")
                return false;
            }
            else if (password !== confirm) {
                Snackbar.show({
                    text: 'Confirm password not match',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                setconfirm("")
                return false;
            }
            else if (ImageData == null) {
                Snackbar.show({
                    text: 'Must Capture Image',
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 2,
                    textColor: '#fff',
                    backgroundColor: '#cc0000'
                });
                return false;
            }
            else {
                setLoading(false)
                convertToSHA()
            }
          
        }   // setdisplayname('')
    }

    return (
       
            <View style={styles.container}>
               
            {/* <Pressable onPress={() => navigation.goBack(null)} style={styles.buttoncolor} >
            <Icon name='arrow-left' size={40}width={30} height={30} style={styles.icon1} /> */}
            
          {/* </Pressable> */}
          
                <View style={styles.a}>
                {/* <Text  style={styles.text}>Signup</Text> */}
                    {/* <Image style={styles.image} source={require("../assests/logo2.png")} /> */}
                   
                    {ImageData ? (
                        <Image source={{ uri: ImageData.assets[0].uri}} style={{ width:width*.27,
                            height:height*.13,  borderRadius: 100}} />) : null}
                </View>
         
                <View style={styles.container1}>
               

                    <View style={styles.inputView}>
                        <Icon name="user" size={20} style={styles.icon1} />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Username"
                            placeholderTextColor="#000"
                            value={displayname}
                            onChangeText={(displayname) => setdisplayname(displayname)}
                        />
                    </View>
                    <View style={styles.inputView1}>
                  
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            // zIndex={1000}
                            style={{
                                width: width *.7999,
                                height: height *.085,
                                borderColor: "#000",borderWidth:2
                            }}
                            dropDownContainerStyle={{
                             borderColor: "#000",borderWidth:2
                            }}
                            labelStyle={{
                                color: 'black'
                            }}
                            listItemLabelStyle={{
                                color: 'black'
                            }}
                            activeLabelStyle={{
                                arrowColor: 'black'
                            }}
                            placeholderStyle={{ color: 'black' }}


                        />
                    </View>
                    <View style={styles.inputView}>
                    <Icon name="mail" size={20} style={styles.icon1} />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#000"
                            value={email}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <View style={styles.inputView}>
                    <Icon name="lock" size={20} style={styles.icon1} />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#000"
                            value={password}
                            secureTextEntry={passwordVisibility}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Icon name={rightIcon} size={20} style={styles.icon1} onPress={() => handlePasswordVisibility()} />
                    </View>
                    <View style={styles.inputView}>
                    <Icon name="lock" size={20} style={styles.icon1} />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Confirm Password"
                            placeholderTextColor="#000"
                            value={confirm}
                            secureTextEntry={passwordVisibility1}
                            onChangeText={(text) => setconfirm(text)}
                        />
                        <Icon name={rightIcon1} size={20} style={styles.icon1} onPress={() => handlePasswordVisibility1()} />
                    </View>
                   
                    <TouchableOpacity 
                    //  disabled={disabled} 
                    style={styles.cmaerabtn} onPress={() => requestPermission()} >
                    <Icon name="camera" size={35} style={styles.icon1}/>
                        {/* <Text style={styles.loginText}>CAMERA</Text> */}
                    </TouchableOpacity>

                    <View style={styles.view2}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => Register()}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#ffffff" />
                            ) : (
                                <Icon name="log-out" size={30} style={styles.icon1}/>
                                // <Text style={styles.Text}>Register</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.roundButton1}>
                            {/* <Icon name="arrow-left" size={16} color="#000"  onPress={() => navigation.goBack()}/> */}
                            <Text style={styles.Text}>Back To Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* <View style={styles.row3}>
            {visible &&  
      <Text style={{ 
              backgroundColor:netInfo?.isConnected ? "#228B22":'#A0A0A0',
              textAlign:'center',borderRadius:10,paddingVertical:12,width:width*.4,
              fontWeight:'bold', fontSize:13,color:'black'}}>{netInfo?.isConnected? <Icon name="wifi" size={20} style={styles.icon1}/>:<Icon name="wifi-off" size={20} />}
             {netInfo?.isConnected? "Online" :"Offline..."} 
      </Text>
      }</View> */}
            </View>
       

    );
}

const styles = StyleSheet.create({
    row3: {
       alignItems: 'center',
       marginTop:height*.001
      },

    head:
    {
        flexDirection:'row'
    },

    text:
    {
        color: 'black',fontSize:30,fontWeight:'bold' 
    },
    buttoncolor:
    {
        color: 'black',alignSelf:"flex-start", 
    },
   
    a: {
        marginBottom: height * .02,
        alignItems:'center'
    },

    cmaerabtn: {
        width: width * 0.3,
        borderRadius: 25,
        height: height * 0.06,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#ff6347",
        // marginTop: height * 0.01
    },

    roundButton1: {
        // width: width * 0.4,
        // height: height * 0.07,
        marginLeft: height * .15,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    inputView2: {
        backgroundColor: "#ff6347",
        borderRadius: 30,
        width: width * 0.8,
        height: height * 0.07,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Text: {
        color: "#0096FF",
        fontSize:16
    },
    TextInput2: {
        width: width * 0.6,
        height: height * 0.07,
        marginLeft: 20,
        color: 'white'
    },
    icon1:
    {
        color: 'black',
        padding:5
    },
    container: {
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    container1: {
        // marginBottom: height * 0.1,
     
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: height * 0.07
    },
    image: {
        width: width * 0.6,
        height: height * 0.3
    },
    inputView1: {

       
        borderRadius: 10,
        width: width * .8,
        height: height * .09,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    inputView: {

        borderWidth: 2,
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
    // inputView1: {
    //     borderRadius: 30,
    //     width: width * 0.8,
    //     height: height * 0.07,
    //     marginBottom: 20,
    // },
    TextInput1: {
        marginLeft: 20,
    },


    forgot_button: {
        height: 30,
        marginLeft: height * 0.3
    },
    loginBtn: {
        width:width*.2,
        height:height*.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#0096FF',
      },
    space: {
        marginBottom: 10,
        padding: 5
    },
});