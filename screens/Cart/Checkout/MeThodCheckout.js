import React, { Component, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
const MethodCheckout = () => {
  const [selected, setSelected] = useState(0);
  const methods = [
    {
      text: "Thanh toán khi nhận hàng",
      key: 1,
      image: require("../../../assets/loan.png"),
    },
    { text: "Mono", key: 2, image: require("../../../assets/momo.png") },
    { text: "PayPal", key: 3, image: require("../../../assets/paypal.png") },
  ];

  return (
    <View>
      {methods.map((res) => {
        return (
          <View key={res.key} style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={res.image}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={styles.radioText}>{res.text}</Text>
            </View>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => setSelected(res.key)}
            >
              {selected === res.key ? (
                <View style={styles.selectedRb} />
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
    marginRight: 35,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
    fontFamily: "Comfortaa_Regular",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ff6c00",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#ff6c00",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});

export default MethodCheckout;
