import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
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
      isLoading: false,
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

  markdownStyles = {
    body: {
      fontFamily: 'Lato-Light',
      // width: wp(350),
      fontSize: hp(15),
      paddingVertical: hp(10),
      padding: hp(20),
      color: '#333',
      borderWidth: 1,
      // lineHeight: hp(1.6),
    },

    link: {
      color: '#4183c4',
      textDecorationLine: 'none',
    },

    // strong: {},

    heading1: {
      marginTop: hp(20),
      marginBottom: hp(10),
      color: 'black',
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'bold',
      fontSize: hp(28),
    },

    heading2: {
      marginTop: hp(20),
      marginBottom: hp(10),
      color: 'black',
      borderBottomWidth: hp(1),
      borderBottomColor: '#ccc',
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'bold',
    },
    heading3: {
      fontSize: hp(18),
      marginTop: hp(20),
      marginBottom: hp(10),
      color: 'purple',
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'bold',
    },
    heading4: {
      fontSize: hp(16),
      marginTop: hp(20),
      marginBottom: hp(10),
      color: 'purple',
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'bold',
    },
    heading5: {
      fontSize: hp(14),
      marginTop: hp(20),
      marginBottom: hp(10),
      color: 'purple',
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'bold',
    },
    heading6: {
      fontSize: hp(14),
      marginTop: hp(20),
      marginBottom: hp(10),
      color: '#777',
      fontFamily: 'RobotoCondensed-Light',
      fontWeight: 'bold',
    },

    paragraph: {
      marginVertical: hp(15),
    },

    blockquote: {
      marginVertical: hp(15),
      borderLeftColor: '#ddd',
      borderWidth: wp(4),
      color: '#777',
      paddingHorizontal: wp(15),
    },

    bullet_list: {
      marginVertical: hp(15),
    },

    ordered_list: {
      marginVertical: hp(15),
    },
    bullet_list: {
      marginVertical: hp(15),
    },
    table: {
      marginVertical: hp(15),
    },

    tr: {
      backgroundColor: 'white',
      borderTopColor: '#ccc',
      borderTopWidth: hp(1),
      fontWeight: 'bold',
      textAlign: 'left',
      paddingHorizontal: wp(13),
      paddingVertical: hp(6),
    },

    th: {
      borderTopColor: '#ccc',
      borderTopWidth: hp(1),
      fontWeight: 'bold',
      textAlign: 'left',
      paddingHorizontal: wp(13),
      paddingVertical: hp(6),
    },

    td: {
      borderTopColor: '#ccc',
      borderTopWidth: hp(1),
      fontWeight: 'bold',
      textAlign: 'left',
      paddingHorizontal: wp(13),
      paddingVertical: hp(6),
    },

    span: {
      borderColor: '#ddd',
      borderWidth: hp(1),
      marginTop: hp(13),
      textAlign: 'left',
      padding: hp(7),
    },

    pre: {
      backgroundColor: '#f8f8f8',
      borderWidth: 1,
      borderColor: '#ccc',
      fontSize: hp(13),
      lineHeight: hp(19),
      paddingVertical: hp(6),
      paddingHorizontal: wp(10),
      borderRadius: wp(3),
    },

    code: {
      marginHorizontal: wp(2),
      paddingHorizontal: wp(5),
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#f8f8f8',
      borderRadius: wp(3),
    },

    tt: {
      marginHorizontal: wp(2),
      paddingHorizontal: wp(5),
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#f8f8f8',
      borderRadius: wp(3),
    },

    hr: {
      color: '#ccc',
      width: hp(4),
    },

    code_block: {color: 'black', fontSize: 14},
    image: {
      width: wp(250),
      height: wp(250),
      resizeMode: 'center',
      borderWidth: 1,
    },
  };

  handleBackButtonClick = () => {
    this.props.friends.job_data = [];
  };

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  render() {
    console.log('JOB', this.props.friends.job_data);
    var data = this.props.friends.job_data;
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: data.company_logo}} />

          <View style={styles.markdownContainer}>
            <View style={styles.companyView}>
              <Text style={styles.companyText}>{data.company}</Text>
            </View>
            <Markdown style={this.markdownStyles}>{data.description}</Markdown>
          </View>
          <View
            style={{
              // backgroundColor: '#000',
              marginTop: hp(25),
            }}>
            <Text>How To Apply</Text>
          </View>
          <Markdown style={this.markdownStyles}>{data.how_to_apply}</Markdown>
        </View>
        {this.state.isLoading && (
          <View style={styles.isLoading}>
            <ActivityIndicator
              animating={true}
              size="large"
              color="rgb(98,176,223)"
            />
          </View>
        )}
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
  scrollview: {flex: 1},
  companyText: {
    // fontSize: hp(30),
    // marginVertical: hp(15),
    // backgroundColor: 'rgba(255, 255, 255,.98)',
  },
  companyView: {
    marginVertical: hp(15),
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  markdownContainer: {
    backgroundColor: 'rgba(255,255,255,.98)',
    borderRadius: wp(3),
    alignItems: 'center',
    // borderWidth: 1,
    backgroundColor: '#fff',
    marginTop: deviceWidth - wp(200),
    width: wp(350),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: deviceWidth,
    height: hp(290),
    resizeMode: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: -10,
    elevation: -4,
  },
  isLoading: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.9)',
    zIndex: 1100,
    elevation: 1100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // width: deviceWidth,
    minHeight: deviceHeight,
    // position: 'relative',
  },
});
