import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { wp, hp } from "./common";

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: hp(20),
    color: "rgba(255, 255, 255,1)",
  },
  button: {
    // borderWidth: 1,
    width: wp(300),
    height: hp(56),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 99, 72,1.0)",

    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
});
