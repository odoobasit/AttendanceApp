import React,{useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';

const Splash = ({navigation}) => {
    const { colors } = useTheme();

    useEffect(()=> {
        setTimeout(() => {
          navigation.navigate("Login");
        }, 3000);
       
      }, [])
      
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0096FF' barStyle="light-content"/>
        <View style={styles.header}>


            <Text  style={styles.text2}>Attendance Management System</Text>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Welcome to AMS!</Text>
            <Text style={styles.text}>Sign in with account?</Text>
        </Animatable.View>
      </View>
    );
};

export default Splash;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  text2:{
    fontWeight:'bold',
    fontSize:30,
    color:'#fff',
    textAlign: 'center'
  },
  container: {
    flex: 1, 
    backgroundColor: '#0096FF'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5,
      fontSize: 18,
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});