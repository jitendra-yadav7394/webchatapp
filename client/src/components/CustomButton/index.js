import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

// TODO: include prop-types
// import PropTypes from 'prop-types';

import styles from './styles';

function CustomButton(props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      // onPress={() => props.onPressFunction()}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

// CustomButton.propTypes = {
//     onPressFunction: PropTypes.func.isRequired,
//     buttonText: PropTypes.string.isRequired,
//   };

export default CustomButton;
