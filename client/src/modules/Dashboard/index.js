import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearStore} from '../../actions/UserActions';
import {store} from '../../store/index';

import loginStyles from './../Login/styles';

function DashboardContainer() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(clearStore());
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Dashboard Screen</Text>
      <Button title="click me" onPress={logout} />
    </View>
  );
}

export default DashboardContainer;
