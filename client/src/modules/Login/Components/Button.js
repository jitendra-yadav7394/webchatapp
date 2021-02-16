import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import loginStyles from '../styles';
import PropTypes from 'prop-types';

function LoginBtn(props){
    return <View style={loginStyles.LoginBtnContainer}>
        {/* passsing the onPressFuntion as the props  */}
        <TouchableOpacity onPress={() => props.onPressFunction()}>      
        <Text style={loginStyles.LoginText}>Login</Text>
        </TouchableOpacity>
    
    </View>
}
LoginBtn.propTypes = {                                      // for the login props 
    onPressFunction: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  };
export default LoginBtn;




