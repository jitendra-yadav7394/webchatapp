import React from 'react';
import { Image, TextInput, View } from 'react-native';
import images from '../../../constants/images';
import loginStyles from '../styles';

function PhoneNoInput() {
  return (
    <View style={loginStyles.InputContainer}>
      <Image style={loginStyles.userIcon} source={images.flag_image} />
      <TextInput
        placeholder="Enter your phone numbers"
        style={loginStyles.TextInput}
        keyboardType="numeric"
      />
    </View>
  );
}
export default PhoneNoInput;
