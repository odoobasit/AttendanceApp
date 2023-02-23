import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Linking,TouchableOpacity,RefreshControl,BackHandler,Alert} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Moment from 'moment';
import { Baseurl } from './BaseURL';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Snackbar from "react-native-snackbar"


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');
var element1=[];

const History= ({ navigation,route }) => {

const {value} = route.params;
const user = JSON.parse(value);
const url1 = `${Baseurl}/attendance/${user.userId}`;
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
// const [input, setInput] = useState([]);


var Namee;
try{
  Namee=user.displayName;
}catch
{
  console.log("Error")
}
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    fetchData();
  });

  return unsubscribe;
}, [navigation]);

const fetchData = async () => {
  try {
    fetch(url1, {
      method: "GET",
      headers: {"Authorization": `Bearer ${user.password}`}
    }).then(res => res.json() ).then(json => setData(json))
  } catch (error) {
    console.error(error);
  }
}
useEffect(() => {
  fetchData();
}, []);

 useEffect(() => {
  console.log(user) 
  // setInput(element1)
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
  },1000)

  
  const LeftSwipeActions = (key) => {
    return (
      <View
          style={{
            // margin: 0,
            alignContent: 'center',
            justifyContent: 'center',
            width:width*.3,
            backgroundColor:'red',
            marginTop:height*.02,
            borderRadius:20,
            marginBottom:height*.002,

            
          }}>
            <Icon name='delete' size={30} style={styles.icon4} />
            {/* <Text    style={{alignSelf:'center',fontSize:18,color:"#fff" }}>Delete</Text> */}
          {/* <TouchableOpacity ></TouchableOpacity > */}
        </View>
    );
  };
    
  return (
    //  console.log(element1),
    <ScrollView style={styles.view1} >
    <View style={styles.view4}>
      {/* <Image style={{ width:width*.27,
                            height:height*.13,  borderRadius: 100}} /> */}
     <Text style={styles.text4} >Welcome {Namee}</Text>
 
     </View>  
    
      {
       data.slice(0).reverse().map((item,key) => (
        <Swipeable key={key}
        renderRightActions={LeftSwipeActions}>
          <View style={styles.view}>
            <Card style={styles.cardWrapper} >
          
              <View style={styles.card}>
                <Text style={styles.title}>
                  {/* key:{key} {'\n'} */}
                  Attentance Time:{Moment(item.attendanceTime).format('DD-MM-YYYY h:mm A')}
                  {'\n'}Attentance:{`${item.attendanceType}`}{item.attendanceType == "i" ?(<Image style={styles.icon} source={require('../assests/checked.png')} />) : (<Image style={styles.icon} source={require('../assests/delete.png')} />)}{'\n'}
                  Client Name: {item.client.fldName} {'\n'}
                  Formatted Address: {item.attendanceAddress}{'\n'}
               
                </Text>
                {/* <TouchableOpacity>
                <Icon name="trash-o" size={25} style={styles.icon1}/>
                  {/* <Text style={styles.text1}>Delete</Text> */}
                {/* </TouchableOpacity>  */}
              </View>
             
            </Card>
            
          </View>
          </Swipeable>
     
        ))
       
      }
       
</ScrollView>
  )

}


export default History;
const styles = StyleSheet.create({
  icon4:
  {
      color: '#fff',
      alignSelf:'center'
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
  icon1:
  {
      color: 'red',
   
  },
  cardWrapper: {
    flexDirection: 'row',
    // elevation: 10,
    borderWidth:1,
    borderRadius: 15,
    borderColor: "#0096FF"

  },
  view: {
    paddingTop: height * 0.02,
    padding: 3,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'flex-end',
    // alignContent: 'space-around',
    // backgroundColor: "#ff7f50"

  },
  text: {
    width:width*0.8,
    fontFamily: "Cochin",
    fontWeight: 'normal',
    fontSize: 18,
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
    width: '90%',
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
