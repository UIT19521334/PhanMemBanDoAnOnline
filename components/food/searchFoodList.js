import React, { Component, useState } from "react";
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
  View,
} from "native-base";
import FoodItem from "./foodItem";

const SearchListFood = (prop) => {
  if (prop.data.length) {
    return (
      <Content>
        <List>
          {prop.data.map((item) => {
            return (
              <FoodItem
                name={item.name}
                price={item.price}
                image={item.image}
                key={item.id}
                id={item.id}
                description={item.description}
                navigation={prop.navigation}
              />
            );
          })}
        </List>
      </Content>
    );
  } else {
    return (
      <View style={{ alignItems: "center", margin: 30 }}>
        <Text style={{ fontSize: 18 }}>Không có món ăn nào được tìm thấy</Text>
      </View>
    );
  }
};
export default SearchListFood;
