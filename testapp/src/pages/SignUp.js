import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  CheckBox,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {wp, hp, deviceWidth, deviceHeight} from '../components/common';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Button from '../components/Button';
import {connect} from 'react-redux';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: true,
      email: 'eve.holt@reqres.in',
      password: 'pistol',
      username: 'Ridwan',
      isLoading: false,
    };
  }

  handleUsername = (text) => {
    this.setState({username: text});
  };

  handleEmail = (text) => {
    this.setState({email: text});
  };

  handlePassword = (text) => {
    this.setState({password: text});
  };

  submit() {
    this.setState({isLoading: true});
    const {email, password, username} = this.state;

    if (
      email.trim() === '' ||
      password.trim() === '' ||
      username.trim() === ''
    ) {
      alert('enter a valid parameter');
    } else {
      var data = {
        email: email.toLowerCase(),
        password: password,
      };

      this.props.registerUser(data).then((a) => {
        console.log(a);
        this.setState({isLoading: false});
        if (this.props.friends.register_token) {
          this.props.navigation.navigate('Users');
        } else {
          alert("you've entered the wrong parameter");
        }
      });
      // fetch(`https://reqres.in/api/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((json) => {
      //     console.log('Success', json);
      //     this.setState({isLoading: false});
      //     alert(`your token is ` + json.token);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.backgroundImage}
              source={require('../assets/images/abstract-art-artistic-background-1103970.jpg')}
            />

            <View style={styles.upperContainer}>
              <View style={styles.roundedImage}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.logo}
                />
              </View>

              <Text style={styles.welcomeText}>Sign Up!</Text>

              {this.renderBox()}
            </View>
          </View>
          <View style={styles.questionView}>
            <Text style={styles.questionText}>Already have an account?</Text>
            <Text
              style={styles.signUpText}
              onPress={() => this.props.navigation.navigate('Sign In')}>
              Sign In
            </Text>
          </View>
        </View>
        {this.state.isLoading && (
          <View style={styles.isLoading}>
            <ActivityIndicator size="large" color="rgb(98,176,223)" />
          </View>
        )}
      </ScrollView>
    );
  }

  renderBox = () => {
    return (
      <View style={styles.box}>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          placeholderTextColor="rgba(87, 96, 111,1.0)"
          onChangeText={this.handleUsername}
          value={this.state.username}
        />
        <TextInput
          placeholder="E-mail"
          keyboardType="email-address"
          style={styles.textInput}
          placeholderTextColor="rgba(87, 96, 111,1.0)"
          onChangeText={this.handleEmail}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          placeholderTextColor="rgba(87, 96, 111,1.0)"
          secureTextEntry={true}
          onChangeText={this.handlePassword}
          value={this.state.password}
        />

        <View style={styles.baseText}>
          <View style={styles.rememberView}>
            <CheckBox
              value={this.state.checked}
              onValueChange={() =>
                this.setState({checked: !this.state.checked})
              }
              style={styles.checkbox}
            />

            <Text style={styles.questionText}>Remember me</Text>
          </View>

          {/* <Text style={styles.questionText}>
            Forgot <Text> Password</Text>
          </Text> */}
        </View>

        <Button name="Sign Up" onPress={() => this.submit()} />

        {/* <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity> */}
      </View>
    );
  };
}

const mapState = (state) => ({
  friends: state.friends,
});

const mapDispatch = (dispatch) => ({
  registerUser: (data) => dispatch.friends.registerUser(data),
});

export default connect(mapState, mapDispatch)(SignUp);

const styles = StyleSheet.create({
  isLoading: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  buttonText: {
    fontSize: hp(20),
    color: 'rgba(255, 255, 255,1)',
  },
  button: {
    // borderWidth: 1,
    width: wp(300),
    height: hp(56),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 99, 72,1.0)',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  baseText: {
    marginTop: hp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(300),
    marginBottom: hp(135 - 70),
  },
  checkbox: {
    // width: 40,
    marginRight: wp(20),
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: wp(300),
    height: hp(56),
    // borderWidth: 1,
    marginTop: hp(14),
    padding: hp(10),
    paddingLeft: wp(20),
    backgroundColor: 'rgba(241, 242, 246,.9)',
    color: 'rgba(87, 96, 111,1.0)',
  },
  questionText: {
    color: 'rgba(87, 96, 111,1.0)',
    letterSpacing: -0.9,
    marginRight: wp(3),
  },
  signUpText: {
    color: 'rgba(112, 161, 255,1.0)',
    letterSpacing: -1,
    fontSize: hp(20),
    fontWeight: 'bold',
  },
  questionView: {
    color: 'rgba(0,0,0,1.0)',
    marginTop: hp(380),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: wp(180),
  },
  welcomeText: {
    color: 'rgba(255, 255, 255,1.0)',
    fontSize: hp(30),
    marginTop: hp(16),
    letterSpacing: -1,
  },

  box: {
    minWidth: wp(320),
    height: hp(400),
    marginTop: hp(30),
    borderRadius: wp(10),
    backgroundColor: 'rgba(255, 255, 255,.98)',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  logo: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    resizeMode: 'cover',
  },
  upperContainer: {
    position: 'absolute',
    flex: 1,
    width: wp(375),
    height: hp(812),
    alignItems: 'center',
  },
  roundedImage: {
    width: wp(95),
    height: wp(95),
    borderRadius: wp(50),
    backgroundColor: 'white',
    marginTop: wp(100),
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 25,
  },
  backgroundImage: {
    width: wp(375),
    height: hp(375),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: wp(375),
    height: hp(812),
  },
});