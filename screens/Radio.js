import * as React from 'react';
import { useState, useEffect, } from 'react';
import {Pressable,Alert,BackHandler,View,StyleSheet ,Text,ScrollView,Dimensions,TouchableOpacity,PermissionsAndroid,ActivityIndicator,ImageBackground } from 'react-native';
import { Baseurl } from './BaseURL';
const { height } = Dimensions.get('window');
var width = Dimensions.get('window').width;
import Geocoder from 'react-native-geocoding';
import { launchCamera } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import { Image } from 'react-native-compressor';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';
import Snackbar from "react-native-snackbar"
import DropDownPicker from '../components/DropdownList';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


var addressComponent="nuhail";
var element=[];
var img;
var a;



const Radio = ({navigation,route}) => {

  const [active, setActive] = useState(false);
  const [isFirstLogin, setisFirstLogin] = useState(true);
  const {value} = route.params;
  const user = JSON.parse(value);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [checked, setChecked] = React.useState("i");
  const url = `${Baseurl}/attendance`;
  const url1 = `${Baseurl}/attendance/${user.userId}`;
  const [position, setPosition] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [openAddress, setOpenAddress] = useState(false);
  const [valueAddress, setValueAddress] = useState(null);
  const [itemsAddress, setItemsAddress] = useState([
    { label: 'Network Error', value: 'apple' },
  ]);
 
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [dt, setDt] = useState(moment().format(' hh:mm:ss A'));
  const [m, setm] = useState(moment().format('LL'));

  

  
  const AuditClient=()=>{
    fetch('http://202.63.199.67:8082/api/attendance/clients', {
      method: "GET",
      headers: {"Authorization": `Bearer ${user.password}`}
    }).then(res => res.json() ).then(json => formatGallons(json))
  
    const formatGallons = (b) => {
     let l_Data = [];
    //  console.log("Basits res" + b)
     
      
      for(var i=0;i<=b.length-1;i++){
        l_Data.push({label: b[i].fldName, value: b[i].fldID})
       }
      setItemsAddress(l_Data)
  
    }
   }
 

   
  useEffect(() => {
    let secTimer = setInterval( () => {
      setm(moment().format(' hh:mm:ss A'))
    },1000)

    return () => clearInterval(secTimer);
}, []);


useEffect(() => {
  let sec = setInterval( () => {
    setDt(moment().format('LL'))
  },1000)

  return () => clearInterval(sec);
}, []);

  useEffect(() => { 
   AuditClient()
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
    // Geolocation.getCurrentPosition((pos) => {
    //   const crd = pos.coords;
    //   setPosition({
    //     latitude: crd.latitude,
    //     longitude: crd.longitude,
    //     latitudeDelta: 0.0421,
    //     longitudeDelta: 0.0421,
    //   });
    // })
    // {value.map(x=>x.userId)
    
    // }
     
  },[])

  const logout = async () => {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value!== null) 
    {
        const user = JSON.parse(value);
        console.log(user)
        try {
          await AsyncStorage.clear()
          // const value = await AsyncStorage.getItem('@storage_Key')
          // console.log(a)
          // console.log(value)
          navigation.navigate('Login')
          Alert.alert(   'Logout!',
          'Sucessfully Logout')
        } catch(e){
          alert("Failed")
        }
    }
   
   
  }

  const postuser = () => {
    console.log('postuser');
      Geocoder.init("AIzaSyAch-yWx3Q83D6WXdFFiHCbTOYvENkWon0");
      Geocoder.from(position.latitude,position.longitude)
      .then(json =>{
        console.log('location received');
        addressComponent = json.results[0].formatted_address;
        postuv();
        
      }) 
      .catch(error => console.log(error));
  
  };


  // var a=`${latitude="1234"},${longitude="12345"}`;
   const postuv = async () => {
    console.log('postuv');
    console.log('Basit :' + valueAddress);
    // console.log(data1.password,data1.userId);
    if (valueAddress === null ||valueAddress === undefined ) {
      Snackbar.show({
          text: 'location is Empty',
          duration: Snackbar.LENGTH_SHORT,
          numberOfLines: 2,
          textColor: '#fff',
          backgroundColor: '#cc0000'
      });
      return false;
  }
  else
  {
    console.log('Basit Im posting data:' + valueAddress);
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.password}`,
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        userID:user.userId,
        attendanceTime:currentDate,
        latitude:"123",
        longitude:"1234",
        // latitude:position.latitude.toString(),
        // longitude:position.longitude.toString(),
        attendanceType:checked,
        imageBytes:a.toString(),
        // attendanceAddress:addressComponent,
        attendanceAddress:"A.f Ferguson",
        userInfo:null,
        clientID:valueAddress
      })
    })
      
      .then((json) => {
        console.log('Location Posted');
        setLoading(false)
        fetch(url1,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.password}`,
          Accept: 'application/json',
          'Content-Type':'application/json',
        }
      })
        .then(response => response.json())
        .then((response) =>{
          console.log('All data');
          setLoading(false)
          response.map((item) => 
          {
            if(item.attendanceType==checked)
            { 
            
              element.push(item);
            } 
          } 
          );
         
          // setTimeout(() => {
          //   navigation.navigate("attendance",{element});
          //   setLoading(false) 
          // } ,1000);
        } 
        )
        .catch((error) => console.log(error), setLoading(false) )
        return json;
      })
      .catch((error) => {
        setLoading(false) 
        console.log('Network Request Failed');
        console.log(error);
      });
  }
  }
    
     


    
   

  onRadioBtnClick = () => {
    setLoading(false);
    // setdisable(true)
    console.log('button clicked');
    
    // postuv(checked)
}


const openCamera = async function() {
  try{

  
    const result = await launchCamera({ mediaType: 'photo',cameraType:'front'})
   
    img = result.assets[0].uri;
    console.log("image agai"+img)
    
    const result1 = await Image.compress(img, {
      maxWidth: 200,
      maxHeight:200,
      quality: 1,
    });
    // img =img.split('/');
    // console.log(img[8])
    Base(result1)
  
    

  


    setIsStopwatchStart(!isStopwatchStart);
  setResetStopwatch(false);

  if(isFirstLogin)
  {
    setisFirstLogin(false);

  }
 
   if(active ?"#00A300":null)
  {
    
    setChecked("i")
    console.log(checked)
    onRadioBtnClick()
    setActive(!active);
   
  }
  else
  {
    setChecked("o")
    console.log(checked)
    onRadioBtnClick()
    setActive(!active);
   
  }

}
catch(e){
  alert("please capture your image");
  throw new Error("please capture your image")
}
 }
 
  
  
  

  const Base = async (img) => {
      ImgToBase64.getBase64String(img)
      .then(base64String =>{
       a=base64String
      
       try{
        console.log(a);
        console.log(checked)
        postuv(checked) 
      }
      catch{
        console.log("Error");
      }
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




// butonclick= () =>
// {
//     setChecked('i',console.log(checked))
//     setdisable(true)
// }
// butonclick1= () =>
// {
//   setChecked('o',console.log(checked))
//   setdisable(true)
 
// }

const handleClick = () => {

  if (valueAddress === null ||valueAddress === undefined ) {
    Snackbar.show({
        text: 'location is Empty',
        duration: Snackbar.LENGTH_SHORT,
        numberOfLines: 2,
        textColor: '#fff',
        backgroundColor: '#cc0000'
    });
    return false;
}

else{
requestPermission()

  
};

}


const options = {
  container: {
    backgroundColor:isFirstLogin ? "white" : active ? "#E9FCE9":"#FFD6D5",
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',

  },
};

  return (
    <Background style={{backgroundColor:isFirstLogin ? "#0096FF" : active ? "#1E9E1E":"red"}}>
    <View style={{alignItems: 'center'}}>

    <View style={{alignItems: 'center',flexDirection:'row'}}>
    <Pressable onPress={() => navigation.goBack(null)}>
        <Icon name='arrow-back' size={40}width={30} height={30} style={styles.icon3} />
      </Pressable>
      <Text
        style={{
          color: 'white',
          fontSize:30,
          fontWeight: 'bold',
          marginVertical: 40,
          marginRight:height*.07
        }}>
         Dashboard
      </Text>
      </View>
    <View
            style={{
              backgroundColor:isFirstLogin ? "white" : active ? "#E9FCE9":"#FFD6D5",
              height:height*.99,
              width:width*.9999,
              borderTopLeftRadius:height*.2,
              paddingTop:height*.12,
            //  padding:height*.05
            }}>
    <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
    <Icon name={'location-sharp'} size={30} style={{color:"red"}}/>
    <Text  style={{color:'black',fontSize:19,marginLeft:10,fontWeight:'bold'}}>Live Location</Text>
    </View>
    <View style={{alignItems:'center',paddingTop:height*.03,paddingLeft:height*.01}}>
    <Text  style={styles.text3}>A.F. Ferguson & Co.State Life Building No،, {'\n'}1-C I.I Chundrigar Rd, City Railway Colony ,{'\n'} Karachi, Karachi City, Sindh, Pakistan</Text>
    </View>
     <View style={styles.time}>
      <Text style={styles.time2}>{dt}</Text>
      <Text style={styles.time2}>{m}</Text>
    </View>
    <View style={styles.dp2}>
        <Text style={{ fontSize: 12, fontWeight:"bold",color:'black'}}>Client Location</Text>
        <DropDownPicker open={openAddress} value={valueAddress} items={itemsAddress} setOpen={setOpenAddress} setValue={setValueAddress}
          setItems={setItemsAddress} 
          
          />
      </View>

      <View style={styles.time5}>
      {isFirstLogin ? "" :active ?<Text style={styles.text9}>Check In</Text>:<Text style={styles.text10}>Check Out</Text>}</View>
     <View style={{flexDirection:'column',marginTop:height*.01,alignItems: 'center'}}>
  
     <TouchableOpacity   onPress={() => handleClick()}
     style={{backgroundColor: isFirstLogin ? "#E9DCC9" : active ? "#1E9E1E":"red",width:90,height:90,justifyContent: 'center',alignItems: 'center',padding: 10,borderRadius: 100} }  >  
    {loading ? (
                  <ActivityIndicator size="large" color="#000"  />
                ) : (
                  isFirstLogin ? <Icon name='md-shield-checkmark-outline' size={40} style={styles.icon4} />: active ?<Icon name='ios-checkmark-done-outline' size={30} style={styles.icon4} />:<Icon name='power' size={30} style={styles.icon4}/>
                )}
                
      </TouchableOpacity >  
      {isFirstLogin? "" :
      <View style={styles.sectionStyle}>
     <Stopwatch
      start={isStopwatchStart}
      //To start
      reset={resetStopwatch}
      //To reset
      options={options}
    />
</View>}
{/* 
      <TouchableOpacity onPress={() => viewattendance()} style={styles.button1}>  
    {loading1 ? (
                  <ActivityIndicator size="large" color="#000"  />
                ) : (
                  <Icon name='ios-search-outline' size={30} style={styles.icon4} />
                )}
                
      </TouchableOpacity > */}
      </View>
      {/* </Card> */}

      <View style={styles.view2}>
        <TouchableOpacity
          onPress={() =>logout()}
          style={styles.roundButton1}>
               {loading2 ? (
                  <ActivityIndicator size="small" color="#800000"  />
                ) : (
                  <Icon name="exit-outline" size={30} color="#000" />
                )}
          
        </TouchableOpacity>
        
      </View>
      </View>
      </View>
      </Background>
      
  );
};

export default Radio;

const styles = StyleSheet.create({
  sectionStyle: {
    marginTop: height*.01,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:height*.01 
  },

  text9:{
    fontSize:18,
    color:'#1E9E1E',
    // fontWeight:'bold'
   },
   text10:{
    fontSize:18,
    color:'red',
    // fontWeight:'bold'
   },

  dp2: {
    marginTop:height*.0,
    width:width*.8,
    marginLeft:height*.05
  },
  time2:{
     fontSize:18,
     color:'#000',
     fontWeight:'bold'
    },
  time:{
    flexDirection:"row",
    justifyContent:"space-around",
    margin:5,
    marginTop:height*.02
  },
  time5:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:height*.02
  },
  icon3:
  {
      color: 'black',
      padding:5,
      marginRight:height*.04,
  },
  icon4:
  {
      color: 'black',
      alignItems:'center'
  },
  view2: {
    marginTop:height*.001,
    marginRight:height*.04,
    alignItems:'flex-end'
  },
  roundButton1: {
    width:65,
    height:65,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 50,
    color: 'black',
    fontWeight:'bold',
  },
  card:{
    elevation:9,
    borderRadius:30,
    backgroundColor: "#7CA1B4",
    alignItems: "center",
    justifyContent: "center",
    marginTop:height*.1,
    height:height*.6,
    margin:8
  },

  View: {
    
    alignItems: 'center',
    flexDirection:'row',
    paddingLeft:height*.1,
    marginTop:height*.05
    // padding:"8%"
  },
  a: {
    
    alignItems: 'center',
  }, 
  c: {
    alignItems: 'center',
  },
  text:{
   color:'#000000',
   fontSize:20
  },
  button: {
    width:width*.2,
    height:height*.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#0096FF'
   
  },
  button1: {
    width:width*.2,
    height:height*.1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#0096FF',
    // borderColor:'black',
    // borderWidth:1,
    opacity:10,
    marginLeft:height*.05
  },

  text1: {
    fontFamily: "Cochin",
    fontWeight: "bold",
    fontSize: 12,
    color: '#FFFFFF'

  },
  text2:{
    fontWeight:'bold',
    fontSize:30,
    color:'#ff4500'
  },
  text3:{
    color: 'black',
    fontSize:18,
    alignItems:'center'
    

  },
  container:{
    marginTop:height*.1
  }
  
});