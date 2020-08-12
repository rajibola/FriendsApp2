import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {hp, wp, deviceWidth, deviceHeight} from '../../components/common';
import {ScrollView} from 'react-native-gesture-handler';

class MapPage extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Text>Maps</Text> */}
        <MapView
          provider={PROVIDER_GOOGLE}
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
