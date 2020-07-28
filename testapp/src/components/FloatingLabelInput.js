import React, {Component} from 'react';
import {Text, View, TextInput, Animated} from 'react-native';
import {hp, wp} from '../components/common';

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(35), hp(0)],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(14), hp(14)],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#4A4A4A', '#4A4A4A'],
      }),
    };
    return (
      <View style={{paddingTop: hp(18)}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            height: hp(11 + 24 + 9),
            width: wp(305),
            fontSize: hp(20),
            lineHeight: hp(24),
            color: '#4A4A4A',
            paddingBottom: !isFocused ? hp(0) : hp(0),
            marginBottom: hp(10),

            borderBottomWidth: wp(1.5),
            borderBottomColor: !isFocused ? '#EAEAEA' : '#E25F38',
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

export default FloatingLabelInput;
