import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import NumberFormat from "react-number-format";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { width } = Dimensions.get("window");

const FoodCard = (props) => {
  const [food, setFood] = useState(props.item);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate("FoodDetail", { food: food });
      }}
    >
      <Image source={{ uri: food.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>
          {food.name.length > 14
            ? food.name.substring(0, 14 - 3) + "..."
            : food.name}
        </Text>

        <View style={styles.price_addImage}>
          <NumberFormat
            value={food.price}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <Text style={{ fontFamily: "Comfortaa_Regular", padding: 3 }}>
                {value} đồng
              </Text>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              props.addItemToCart(food);
            }}
          >
            <Image
              source={require("../../assets/plus.png")}
              style={styles.imageAdd}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (food) =>
      dispatch(actions.addToCart({ quantity: 1, food })),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: width / 2 - 15,
    marginBottom: 30,

    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: "#ececec",
    bottom: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: width / 2 - 15,
    height: 150,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  name: {
    marginTop: 10,
    color: "#4f4a4a",
    fontSize: 15,
    fontFamily: "Comfortaa_Bold",
    padding: 3,
  },

  price_addImage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageAdd: {
    marginLeft: 20,

    width: 25,
    height: 25,
  },
});
export default connect(null, mapDispatchToProps)(FoodCard);
