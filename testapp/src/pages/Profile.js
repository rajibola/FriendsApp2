import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/dist/Fontisto';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.displayProfile(this.props.route.params.id).then((a) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    console.log('USER', this.props.friends.user_data);
    var data = this.props.friends.user_data;
    return (
      <View>
        {data && (
          <View>
            {this.renderBackground()}
            {this.renderData()}
          </View>
        )}
        {this.state.isLoading && (
          <View style={styles.isLoading}>
            <ActivityIndicator size="large" color="rgb(98,176,223)" />
          </View>
        )}
      </View>
    );
  }

  renderData() {
    var {data, ad} = this.props.friends.user_data;
    return (
      <View style={styles.profileScreen}>
        <Image style={styles.image} source={{uri: data.avatar}} />
        <View style={styles.name}>
          <Text style={styles.firstName}>{data.first_name}</Text>
          <Text style={styles.lastName}>{data.last_name}</Text>
        </View>
        <Text style={styles.profession}>Software Engineer</Text>

        <View style={styles.box}>
          <Text style={styles.aboutMe}>ABOUT ME</Text>
          <Text style={styles.level}>CEO at {ad.company}</Text>
          <Text style={styles.aboutMeText}>{ad.text}</Text>

          <View style={styles.linkView}>
            <View style={styles.link}>
              <Icon name="world-o" size={13} color="#636e72" />
              <Text style={styles.linkText}>
                {/* www.{data.first_name}
                {data.last_name}.com */}

                {ad.url}
              </Text>
            </View>
            <View style={styles.link}>
              <Icon name="email" size={13} color="#636e72" />
              <Text style={styles.linkText}>{data.email}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Follow Me</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderBackground() {
    return (
      <View style={styles.background}>
        <Image
          source={require('../assets/images/codeLogo2.png')}
          style={styles.backgroundImage}
        />
      </View>
    );
  }
}

const mapState = (state) => ({
  friends: state.friends,
});
const mapDispatch = (dispatch) => ({
  displayProfile: (data) => dispatch.friends.displayProfile(data),
});

export default connect(mapState, mapDispatch)(Profile);

const styles = StyleSheet.create({
  linkText: {
    paddingLeft: wp(5),
    textTransform: 'lowercase',
    color: '#636e72',
    fontSize: hp(14),
  },
  linkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(12),
  },
  link: {
    alignItems: 'center',
    height: hp(18),
    justifyContent: 'center',
    flexDirection: 'row',
    // width: wp(130),
  },
  level: {
    marginTop: hp(15),
    color: '#636e72',
  },
  aboutMeText: {
    marginTop: hp(9),
    color: '#b2bec3',
  },
  aboutMe: {
    fontWeight: 'bold',
    color: '#57606f',
  },
  buttonText: {
    fontSize: hp(20),
    color: 'rgba(255, 255, 255,1)',
  },
  button: {
    marginTop: hp(18),
    width: wp(350),
    // borderWidth: 1,
    height: hp(55),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 4,
  },
  box: {
    width: wp(350),
    height: 160,
    backgroundColor: 'white',
    borderRadius: wp(2),
    padding: wp(15),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 3,
  },
  profession: {
    color: 'white',
    marginTop: hp(5),
    marginBottom: hp(130),
  },
  isLoading: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
    zIndex: 1000,
  },
  firstName: {
    fontSize: hp(25),
    paddingRight: wp(6),
    color: '#fff',
  },
  lastName: {
    fontSize: hp(25),
    color: '#fff',
  },

  name: {flexDirection: 'row'},

  profileScreen: {
    position: 'absolute',
    alignItems: 'center',
    // justifyContent: 'center',
    width: deviceWidth,
    height: deviceHeight,
    // backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 10,
  },
  image: {
    width: wp(100),
    height: wp(100),
    borderRadius: wp(50),
    marginTop: wp(70),
    margin: wp(10),
    backgroundColor: 'rgba(0,0,0,1)',
  },
  backgroundImage: {
    width: deviceWidth,
    resizeMode: 'cover',
    height: deviceWidth,
  },
  background: {
    flex: 1,
  },
});
