import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {connect} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Icona from 'react-native-vector-icons/dist/Entypo';
import Markdown from 'react-native-markdown-display';

class SingleJobPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    console.log(this.props.route.params.id);
    this.props.getJob(this.props.route.params.id).then((a) => {
      this.setState({isLoading: false});
    });
  }

  //   fetchUserData()

  render() {
    console.log('JOB', this.props.friends.job_data);
    var data = this.props.friends.job_data;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.companyView}>
            <Text>{data.company}</Text>
          </View>
          <Image style={styles.image} source={{uri: data.company_logo}} />
          <View style={styles.markdownContainer}>
            <Markdown
              style={{
                body: {
                  fontFamily: 'Lato-Light',
                  width: wp(350),
                  // borderWidth: 1,
                },
                heading2: {
                  color: 'purple',
                  fontFamily: 'RobotoCondensed-Light',
                },

                code_block: {color: 'black', fontSize: 14},
                image: {
                  width: wp(250),
                  height: wp(250),
                  resizeMode: 'center',
                  borderWidth: 1,
                },
              }}>
              {data.description}
            </Markdown>
          </View>
          {/* <Markdown>{data.how_to_apply}</Markdown> */}
          {this.state.isLoading && (
            <View style={styles.isLoading}>
              <ActivityIndicator size="large" color="rgb(98,176,223)" />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapState = (state) => ({
  friends: state.friends,
});
const mapDispatch = (dispatch) => ({
  getJob: (data) => dispatch.friends.getJob(data),
});

export default connect(mapState, mapDispatch)(SingleJobPage);

const styles = StyleSheet.create({
  companyView: {
    width: deviceWidth,
    height: deviceWidth,
  },
  markdownContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,.7)',
    marginTop: hp(100),
  },
  image: {
    width: deviceWidth,
    height: hp(290),
    resizeMode: 'center',
    // borderRadius: wp(50),
    backgroundColor: 'rgba(0,0,0,1)',
  },
  isLoading: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.9)',
    zIndex: 1000,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,1)',//#
    width: deviceWidth,
    minHeight: deviceHeight,
  },
});
