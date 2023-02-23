import React ,{useState,useEffect} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default function Tracker() {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    })
  }, []);
  return (
    console.log(position),
    <View style={styles.container}>
      <MapView style={styles.map}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});