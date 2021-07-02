import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import NumberFormat from "react-number-format";
import * as action from "../../Redux/Actions/cartActions";

import { connect } from "react-redux";

var { width } = Dimensions.get("window");

const CartItem = (props) => {
  const data = props.item.item.food;
  const [quantity, setQuantity] = useState(props.item.item.quantity);

  function editQuantity(action) {
    if (action == "+") {
      let newQty = quantity + 1;
      setQuantity(newQty);
    } else {
      if (quantity > 1) {
        let newQty = quantity - 1;
        setQuantity(newQty);
      }
    }
  }

  return (
    <ListItem key={Math.random()} avatar>
      <View
        style={{
          flexDirection: "row",
          marginRight: 20,
          marginBottom: 10,
          padding: 10,
          borderRadius: 15,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#ececec",
          bottom: -10,
          width: width * 0.9,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: data.image }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 20,
            flex: 1,
          }}
        />
        <View style={{ flex: 2 }}>
          <View>
            <Text
              style={{ fontSize: 20, fontFamily: "Comfortaa_Bold", padding: 3 }}
            >
              {data.name.length > 12
                ? data.name.substring(0, 12 - 3) + "..."
                : data.name}
            </Text>
          </View>
          <NumberFormat
            value={data.price}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <Text
                style={{
                  fontFamily: "Comfortaa_Regular",
                  color: "#ff6c00",
                  padding: 3,
                }}
              >
                {value} đồng
              </Text>
            )}
          />
        </View>
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, marginBottom: 5 }}>{quantity}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                padding: 1,
                width: 30,
                backgroundColor: "#ff6c00",
              }}
              onPress={() => {
                editQuantity("_"), props.updateQty(data, "_");
              }}
            >
              <Text style={{ fontSize: 20, color: "white", top: -9 }}>_</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                padding: 1,
                width: 30,
                backgroundColor: "#ff6c00",
              }}
              onPress={() => {
                editQuantity("+"), props.updateQty(data, "+");
              }}
            >
              <Text style={{ fontSize: 20, color: "white", top: -1 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ListItem>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    updateQty: (food, plusOrMinus) =>
      dispatch(action.updateQty({ food, plusOrMinus })),
  };
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "#FAAC58",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 15,
    marginRight: 15,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(null, mapToDispatchToProps)(CartItem);
