import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const CategoryItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("FoodByCategory", {
          category: props.item.name,
          categoryId: props.item.id,
          navigation: props.navigation,
        });
      }}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.item.image }} />
        <Text style={styles.text}>{props.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: screenWidth / 3,
    height: screenWidth / 3 - 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth / 3,
    height: screenWidth / 3 - 70,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CategoryItem;
