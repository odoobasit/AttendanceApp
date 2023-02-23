
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity, Dimensions, Alert, ActivityIndicator
} from "react-native";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { sha256 } from 'react-native-sha256';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');




export default function adminregister({ navigation }) {


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
    const [items, setItems] = useState([
        { label: 'Admin', value: 'Admin' },
        { label: 'User', value: 'User' }
    ]);
    // const biometric = () => {
    //     const rnBiometrics = new ReactNativeBiometrics()

    //     rnBiometrics.isSensorAvailable()
    //         .then((resultObject) => {
    //             const { available, biometryType } = resultObject

    //             if (available && biometryType === BiometryTypes.TouchID) {
    //                 console.log('TouchID is supported')
    //             } else if (available && biometryType === BiometryTypes.FaceID) {
    //                 console.log('FaceID is supported')
    //             } else if (available && biometryType === BiometryTypes.Biometrics) {
    //                 console.log('Biometrics is supported')
    //             } else {
    //                 console.log('Biometrics not supported')
    //             }
    //         })
    // }
    

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-slash');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-slash') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };
  
    const convertToSHA = async () => {
        setLoading(true);
        await sha256(password).then((hash) => {
            setResult(hash);
            console.log(result)
        });

        fetch('http://202.63.199.67:8082/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                displayName: displayname,
                userName: value,
                email: email,
                password: result,
                createdDate: null,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {

                setLoading(false)
                console.log("RESULTS HERE:", responseData)
                alert("User Registered Successfully")
                // navigation.navigate("Login");

            })
            .catch((error) => {
                setLoading(false)
                console.error(error);
            })

    };

    const Register = () => {
        {
            const strongRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            var usernameRegex = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
            if (!strongRegex.test(email)) {
                alert("Invalid Email");
                return false;
            }
            else if (displayname == "") {
                alert("Please enter displayname ");
                return false;
            }
            else if (!usernameRegex.test(displayname)) {
                alert("Name not include numbers");
                return false;
            }
            else if (password == "") {
                alert("Please enter password");
                return false;
            }
            else if (password.length < 8) {
                alert("Password is weak");
                return false;
            }
            else if (confirm == "") {
                alert("Please enter confirm password");
                return false;
            }
            else if (confirm.length < 8) {
                alert("Confirm Password is weak");
                return false;
            }
            else if (password !== confirm) {
                alert("Confirm password not match");
                return false;
            }
            else if (password > 8 && confirm > 8) {

                convertToSHA()
            }
        }   // setdisplayname('')
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image style={styles.image} source={require("../assests/pwc.png")} />

                <View style={styles.inputView}>
                    <TextInput
                        // value ={displayname}
                        style={styles.TextInput}
                        placeholder="User Name"
                        placeholderTextColor="#fff"
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
                        zIndex={1000}
                        style={{
                            backgroundColor: "#ff6347", borderRadius: 30, borderColor: "#ff6347",
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: "#ff6347", borderRadius: 30, borderColor: "#ff6347",
                        }}
                        labelStyle= {{
                            color:'white'
                          }}
                          listItemLabelStyle={{
                            color:'white'
                         }}
                         activeLabelStyle={{
                            arrowColor:'white'
                         }}
                         placeholderStyle={{  color:'white'}}
                         
                         
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.inputView2}>
                    <TextInput
                        style={styles.TextInput2}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry={passwordVisibility}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Icon name={rightIcon} size={20} style={styles.icon1} onPress={() => handlePasswordVisibility()} />
                </View>
                <View style={styles.inputView2}>
                    <TextInput
                        style={styles.TextInput2}
                        placeholder="Confirm Password"
                        placeholderTextColor="#fff"
                        secureTextEntry={passwordVisibility}
                        onChangeText={(text) => setconfirm(text)}
                    />
                    <Icon name={rightIcon} size={20} style={styles.icon1} onPress={() => handlePasswordVisibility()} />
                </View>
                <View style={styles.view2}>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => Register()}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#ffffff" />
                        ) : (
                            <Text  style={styles.Text}>Register</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.roundButton1}>
                        <Icon name="arrow-left" size={16} color="#ffffff" />
                    <Text style={styles.Text}>Back</Text>
                </TouchableOpacity>
                </View>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
  
    roundButton1: {
        width: width * 0.4,
        height: height * 0.07,
        marginLeft:height*.05,
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#ff6347",
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
        color:"#fff",
    },
    TextInput2: {
        width: width * 0.6,
        height: height * 0.07,
        marginLeft: 20,
        color:'white'
    },
    icon1:
    {
        color:"#fff",
        marginRight: 25
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    container1: {
        marginBottom: height * 0.1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: width * 0.6,
        height: height * 0.3
    },

    inputView: {
        backgroundColor: "#ff6347",
        borderRadius: 30,
        width: width * 0.8,
        height: height * 0.07,
        marginBottom: 20,
    },
    inputView1: {

        borderRadius: 30,
        width: width * 0.8,
        height: height * 0.07,
        marginBottom: 20,
    },
    TextInput1: {
        marginLeft: 20,
    },
    TextInput: {
        height: 50,
        padding: 10,
        color:'white'
    },

    forgot_button: {
        height: 30,
        marginLeft: height * 0.3
    },

    loginBtn: {
        width: width * 0.3,
        borderRadius: 25,
        height: height * 0.08,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff6347",
    },
    space: {
        marginBottom: 10,
        padding: 5
    },
});