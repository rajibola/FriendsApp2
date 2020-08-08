import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp, hp} from './common';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class PrimaryButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {width: this.props.size, borderColor: this.props.color},
        ]}
        onPress={this.props.onPress}>
        <Text style={[styles.buttonText, {color: this.props.color}]}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(20),
    color: 'rgba(255, 255, 255,1)',
    letterSpacing: hp(0.89),
  },
  button: {
    // borderWidth: 1,
    width: wp(300),
    height: hp(56),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,

    // shadowColor: '#000',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 3,
  },
});
