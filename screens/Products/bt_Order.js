//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
// create a component
const BT_Order = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.Btn} onPress={() => props.onPress()}>
        <SimpleLineIcons name="handbag" size={24} color="black" style={styles.iconBtn} />
        <Text style={styles.Text}>Orders</Text>
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
    marginLeft:15,
    flex: 2,
  },
});

//make this component available to the app
export default BT_Order;
