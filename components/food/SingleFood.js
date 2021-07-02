import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import NumberFormat from "react-number-format";

import * as action from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";

var { width, height } = Dimensions.get("window");

const SingleFood = (props) => {
  const [food, setFood] = useState(props.route.params.food);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(food.price);

  function editQuantity(action) {
    if (action == "+") {
      let newQty = quantity + 1;
      setTotalPrice(food.price * newQty);
      setQuantity(newQty);
    } else {
      if (quantity > 1) {
        let newQty = quantity - 1;
        setTotalPrice(food.price * newQty);
        setQuantity(newQty);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={{ uri: food.image }} style={styles.image} />
      </View>
      <View style={styles.detail}>
        <View style={styles.editQty}>
          <TouchableOpacity
            style={styles.btnMinus}
            onPress={() => editQuantity("-")}
          >
            <Text style={styles.textMinus}>-</Text>
          </TouchableOpacity>
          <View style={styles.viewQty}>
            <Text style={styles.quantity}>{quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnPlus}
            onPress={() => editQuantity("+")}
          >
            <Text style={styles.textPlus}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, top: -20 }}>
          <Text style={styles.title}>{food.name}</Text>

          <NumberFormat
            value={food.price}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <Text style={styles.price}>{value} đồng</Text>
            )}
          />

          <Text style={{ fontSize: 20, fontFamily: "Comfortaa_Bold" }}>
            Mô tả
          </Text>

          <ScrollView style={{ height: 150 }}>
            <Text style={{ fontFamily: "Comfortaa_Regular", lineHeight: 25 }}>
              {food.description}
            </Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Comfortaa_Regular",
              padding: 3,
            }}
          >
            Tổng tiền
          </Text>
          <NumberFormat
            value={totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <Text
                style={{
                  fontSize: 19,
                  fontFamily: "Comfortaa_Regular",
                  padding: 3,
                }}
              >
                {value} đồng
              </Text>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => props.addItemToCart(food, quantity)}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontFamily: "Comfortaa_Bold",
            }}
          >
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (food, quantity) =>
      dispatch(action.addToCart({ food, quantity })),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  image: {
    width: width,
    height: 300,
  },
  detail: {
    backgroundColor: "white",
    width: width,
    top: -50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  editQty: {
    flexDirection: "row",
    alignSelf: "center",
    top: -20,
    height: 40,
    shadowColor: "#ff6c00",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 3,
    shadowRadius: 2,
    elevation: 10,
  },
  btnMinus: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#ff6c00",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textMinus: {
    color: "white",
    fontSize: 30,
    top: -2,
  },
  viewQty: {
    width: 40,
    backgroundColor: "#ff6c00",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "Coiny_Regular",
    padding: 3,
  },
  button: {
    width: 60,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#ececec",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    color: "white",
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    alignSelf: "flex-end",
    fontFamily: "Comfortaa_Regular",
    color: "#ff6c00",
    padding: 3,
  },
  btnPlus: {
    backgroundColor: "#ff6c00",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  textPlus: {
    color: "white",
    fontSize: 25,
    top: -2,
  },
  bottomContainer: {
    width: width,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor: "white",
  },
  buttonAdd: {
    borderRadius: 20,
    padding: 20,
    width: 200,
    backgroundColor: "#ff6c00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(null, mapToDispatchToProps)(SingleFood);
