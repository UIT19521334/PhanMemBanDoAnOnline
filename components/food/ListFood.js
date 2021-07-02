import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import FoodCard from "./foodCard";

const ListFood = (prop) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Hôm nay ăn gì? </Text>
      <FlatList
        data={prop.data}
        renderItem={(x) => {
          return <FoodCard item={x.item} navigation={prop.navigation} />;
        }}
        keyExtractor={(x) => x.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  tittle: {
    fontSize: 25,
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: "Coiny_Regular",
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 12,
  },
});
export default ListFood;
