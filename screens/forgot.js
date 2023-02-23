import React,{ useState,useEffect }  from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,Image,Dimensions,BackHandler,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import Background from './Background';
import Snackbar from "react-native-snackbar"


export default function forgot({ navigation }) {
  const [email, setEmail] = useState("");

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
   }

  const handleSubmit = () => {
    verifyEmail()

}
    return (
      // <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
      <Background style={{backgroundColor:"#0096FF"}}>
        <View style={{alignItems: 'center'}}>

        <View style={{alignItems: 'center',flexDirection:'row'}}>
        <Pressable onPress={() => navigation.goBack(null)}>
            <Icon name='arrow-left' size={40}width={30} height={30} style={styles.icon3} />
          </Pressable>
          <Text
            style={{
              color: 'white',
              fontSize:30,
              fontWeight: 'bold',
              marginVertical: 20,
             marginRight:height*.07
            }}>
            Forgot Password
          </Text>
          </View>
           <View
            style={{
              backgroundColor: 'white',
              height:height*.99,
            //   width: 460,
              borderTopLeftRadius:height*.2,
              paddingTop:height*.3,
            //  padding:height*.05
            }}>
        {/* <View style={styles.a}>
        
         <Image style={styles.image} source={require("../assests/logo2.png")} /></View> */}
        <View style={{padding: 20}}>
          
        </View>
        <View style={{position: 'relative', bottom: 30}}>
          
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Reset?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter the address associated
                with your account
              </Text>
            </View>
            <View style={styles.formCon}>
              <View style={styles.textBoxCon}>
                <View style={styles.at}>
                  <Icon name='at-sign' size={22} width={20} height={20} style={styles.icon1} />
                </View>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Email ID'}
                    placeholderTextColor={'#aaa'}
                      keyboardType="email-address"
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, {marginTop: 40}]}>
              <Pressable
                style={styles.LoginBtn}
                onPress={() => handleSubmit()}
                >
                <Icon name='arrow-right' size={30} width={20} height={20} style={styles.icon2} />
                {/* <Text style={styles.loginBtnLbl}>Submit</Text> */}
              </Pressable>
            </View>
          </View>
        </View>
         </View>
         </View>
          </Background>
 
    );
  }


const styles = StyleSheet.create({
  icon3:
  {
      color: 'black',
      padding:5,
      marginRight:height*.04,
  },
    icon2:
    {
        color: 'black',
        padding:5,
    
    },
    loginCon:
    {
       alignItems:'center'
    },
    icon1:
    {
        color: 'black',
        padding:5,
        marginTop:10,
    },
    a: {
        alignItems: 'center',
        marginBottom:height*.1,
      },
    image: {
        width:height*.3,
        height:height*.31
    },
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
 
  formCon: {
    
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    // fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width:width*.8,
  },

  textInput: {
    borderBottomColor: '#000',
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color:'#000',
    fontSize: 16,
    height: 40,
  },
  LoginBtn: {
    width:width*.2,
    height:height*.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#0096FF',
  },

  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,  
    fontWeight:'bold',
    color: '#fff',
    paddingVertical: 10,
  },

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    // fontFamily: Fonts.type.NotoSansRegular,
  },
});