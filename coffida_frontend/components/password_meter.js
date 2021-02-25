/* eslint-disable lines-between-class-members */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */

import React, {Component} from 'react';
import {View} from 'react-native';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import styles from './stylesheet';

export default class PasswordInput extends Component {
  onChange = (password, score, {label, labelColor, activeBarColor}) => {
    // console.log(password, score, {label, labelColor, activeBarColor});
  };
  render() {
    return (
      <View style={styles.container}>
        <RNPasswordStrengthMeter onChangeText={this.onChange} meterType="bar" />
      </View>
    );
  }
}
