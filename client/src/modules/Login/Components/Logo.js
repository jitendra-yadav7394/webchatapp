import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import loginStyles from '../styles';
import logo from '../../../constants/images';

function AppLogo() {
  return (
    <View style={loginStyles.ImageContainer}>
      <Image 
      source={logo.Logo_TurboCloud}
      />
    </View>
  );
}
export default AppLogo;


