//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
// create a component
const BT_Products = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.Btn} onPress={() => props.onPress()}>
        <Ionicons name="add" size={24} color="black"  style={styles.iconBtn} />
        <Text style={styles.Text}>Products</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Text:{
    flex:3,
  },
  Btn: {
    width: 110,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal:8,
    backgroundColor: "#f2ce55",
    flexDirection:'row',
  },
  iconBtn:{
    marginLeft:5,
    flex: 1,
  },
});

//make this component available to the app
export default BT_Products;
