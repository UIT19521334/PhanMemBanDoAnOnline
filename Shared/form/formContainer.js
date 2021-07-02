import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

const Item= (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>{props.value}</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Image
            style={styles.image}
            source={require("../../assets/right-arrow.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});

export default FormContainer;
