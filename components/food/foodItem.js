import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import * as action from "../../Redux/Actions/cartActions";

const FoodItem = (props) => {
  const { name, price, image, id, description } = props;

  return (
    <ListItem
      onPress={() =>
        props.navigation.navigate("FoodDetail", {
          food: { name, price, image, id, description },
        })
      }
      thumbnail
    >
      <Left>
        <Thumbnail source={{ uri: image }} />
      </Left>
      <Body>
        <Text style={{ fontFamily: "Comfortaa_Bold" }}>{name}</Text>
        <NumberFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => (
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Comfortaa_Regular",
                color: "#ff6c00",
                marginTop: 5,
                padding: 3,
              }}
            >
              {value} đồng
            </Text>
          )}
        />
      </Body>
      <Right>
        <Button
          transparent
          onPress={() =>
            props.addItemToCart({ name, price, image, id, description })
          }
        >
          <Text uppercase={false} style={{ fontFamily: "Comfortaa_Regular" }}>
            Thêm vào giỏ{" "}
          </Text>
        </Button>
      </Right>
    </ListItem>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (food) =>
      dispatch(action.addToCart({ food, quantity: 1 })),
  };
};

export default connect(null, mapToDispatchToProps)(FoodItem);
