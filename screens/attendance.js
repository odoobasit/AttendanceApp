import React,{useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Linking,TouchableOpacity,RefreshControl } from 'react-native';
import { Card } from 'react-native-paper';
import Model from '../screens/Model';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
import Moment from 'moment';


const attendance = ({ route }) => {
const { element } = route.params;
var mapslocation;
var Namee;
 useEffect(() => {

console.log(element)
try{Namee=element1[0].userInfo.displayName}catch{console.log("Error")}



   }, [])

  openGps = (latitude,longitude) => {
    try {
      var a=`${latitude},${longitude}`;
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = a;
      const label = 'Current Location';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url);
    } catch { console.log('invalid') }
  }

  return (
    // console.log("attendance.js"),
    // console.log(element),
    <ScrollView style={styles.view1} >
      <View style={styles.view4}>
      {/* <Image style={{ width:width*.27,
                            height:height*.13,  borderRadius: 100}} /> */}
   <Text style={styles.text4} >Welcome {Namee}</Text>
 
     </View> 
      {
       element.slice(0).reverse().map((item) => (
       
          mapslocation=`${item.latitude},${item.longitude}`,
         
          <View style={styles.view}  >
            <Card style={styles.cardWrapper} >
              <View style={styles.card}>
                <Text style={styles.title}>
                  {/* Key:{item.id} {'\n'} */}
                  {/* Google map:{item.latitude} {item.longitude}{'\n'} */}
                  Attentance Time:{Moment(item.attendanceTime).format('DD-MM-YYYY h:mm A')}{'\n'}
                  Attentance:{`${item.attendanceType}`}{item.attendanceType == "i" ? (<Image style={styles.icon} source={require('../assests/checked.png')} />) : (<Image style={styles.icon} source={require('../assests/delete.png')} />)}
                  {'\n'}
                  {/* Employee Name: {item.userInfo.displayName} {'\n'} */}
                  Formatted Address: {item.attendanceAddress}{'\n'}
                  {/* Client Name: {item.client} */}
                   {/* {data} */}
                </Text>
                <TouchableOpacity >
                <Icon name="trash-o" size={25} style={styles.icon1}/>
                  {/* <Text style={styles.text1}>Delete</Text> */}
                </TouchableOpacity>

                {/* <TouchableOpacity>
                  <Text style={styles.text}>Update</Text>
                </TouchableOpacity> */}
                {/* <View style={styles.view1}>

                <TouchableOpacity  onPress={() => openGps(item.latitude,item.longitude)}>
                  <Text style={styles.text1}>Google map</Text>
                </TouchableOpacity></View> */}
              </View>
            </Card>
          </View>
     
        ))
       
      }
</ScrollView>
  )

}


export default attendance;
const styles = StyleSheet.create({
  icon1:
  {
      color: 'red',
   
  },
  view4:
  {   marginTop:10,
      alignItems:'center',
    
  },
  text4:
  {   
      fontWeight: 'bold',
      color: '#000',
      fontSize:20,
   
  },
  cardWrapper: {
    flexDirection: 'row',
    elevation: 6,
    borderRadius: 15,
    borderColor: "#0096FF",
    borderWidth:1

  },
  view: {
    paddingTop: height * 0.02,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    alignContent: 'space-around',
    // backgroundColor: "#ff7f50"

  },
  // view1: {
  //   // backgroundColor: "#ff7f50"

  // },
  text: {
    width:width*0.8,
    fontFamily: "Cochin",
    fontWeight: 'normal',
    fontSize: 17,
    color: 'blue',
  },
  text1: {
    width:width*0.8,
    fontFamily: "Cochin",
    fontWeight: 'normal',
    fontSize: 17,
    color: 'blue',
  },
  title: {
    width: '80%',
    fontFamily: "Cochin",
    fontWeight: 'normal',
    fontSize: 18,
    color: '#000000',
    paddingVertical: 16,
    paddingLeft: 15
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 150,
  },
  icon: {
    resizeMode: 'center',
    height: -50,
    width: 15
  },
 

});
