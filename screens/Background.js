import React from 'react';
import {View, ImageBackground} from 'react-native';

const Background = ({ children,style }) => {
  return (
    <View>
      {/* <ImageBackground source={require("../assests/logo2.png")} style={{ height: '100%' }} /> */}
      <View style={style}>
        {children}
      </View>
    </View>
  );
}

export default Background;