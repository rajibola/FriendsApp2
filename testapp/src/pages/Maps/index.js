import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {hp, wp, deviceWidth, deviceHeight} from '../../components/common';
import {ScrollView} from 'react-native-gesture-handler';
import {MapStyle} from './map-style';
import Geolocation from '@react-native-community/geolocation';

class MapPage extends React.Component {
  componentDidMount() {
    this.locateCurrentPosition();
  }

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        this.setState({initialPosition});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          style={{
            height: deviceHeight - hp(20),
            width: deviceWidth,
            borderWidth: 1,
          }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}></MapView>
      </ScrollView>
    );
  }
}

export default MapPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // width: deviceWidth,
    minHeight: deviceHeight,
  },
});
