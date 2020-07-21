import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {connect} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

class About extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Text style={styles.imageText}>RA</Text>
          </View>
          <View>
            <Text style={styles.title}>Ridwan Ajibola</Text>
            <Text style={styles.experience}>
              Software Engineer at Rocket Digital Solutions
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // padding: wp(20),
    width: deviceWidth,
    borderWidth: 1,
    alignItems: 'center',
  },
  experience: {
    color: 'black',
    fontSize: hp(18),
    fontFamily: 'WorkSans-Thin',
    width: wp(180),
  },
  title: {
    color: 'black',
    fontSize: hp(30),
    fontFamily: 'WorkSans-Light',
  },
  imageText: {
    fontSize: hp(80),
    color: 'white',
    fontFamily: 'WorkSans-Thin',
  },
  imageContainer: {
    width: wp(100),
    height: wp(100),
    margin: wp(15),
    borderRadius: wp(75),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,1)',//#
    width: deviceWidth,
    height: deviceHeight,
  },
});
export default About;
