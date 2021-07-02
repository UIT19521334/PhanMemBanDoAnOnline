//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// create a component
const BT_Login = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => props.onPress()}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  loginBtn: {
    width: 200,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#ebdb2d",
  },
});

//make this component available to the app
export default BT_Login;
