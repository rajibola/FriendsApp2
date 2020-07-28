import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {connect} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  header: {
    height: hp(60),
    borderWidth: 1,
    width: deviceWidth,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
