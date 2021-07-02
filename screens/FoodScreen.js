import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  ProgressViewIOSComponent,
  Image,
} from "react-native";
import { Button, Container, Text } from "native-base";
import ListFood from "../components/food/ListFood";
import HeaderSearch from "../components/header";
import SearchListFood from "../components/food/searchFoodList";
import Banner from "../components/food/banner";
import ListCategory from "../components/category/listCategory";

import Axios from "axios";
const FoodScreen = ({ navigation }) => {
  const [foods, setFoods] = useState();
  const [focus, setFocus] = useState(false);
  const [foodName, setFoodName] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("connect to api food");
    Axios.get("https://food-order-app12.herokuapp.com/api/foods")
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    return function Clear() {
      setFoods([]);
    };
  }, []);

  function isFocus(focus) {
    setFocus(focus);
  }
  function getFoodName(name) {
    setFoodName(name);
  }
  function getFoodByName(name) {
    if (!name) return foods;
    return foods.filter((x) => 
      x.name.toLowerCase().includes(name.toLowerCase())
    )
  }
  console.log("render foodScreen");
  return (
    <>
      {loading == false ? (
        <Container>
          <HeaderSearch isFocus={isFocus} foodName={getFoodName} navigation={navigation} />

          {focus ? (
            <SearchListFood
              data={getFoodByName(foodName)}
              navigation={navigation}
            />
          ) : (
            <ScrollView style={{ backgroundColor: "white" }}>
              <Banner />
              <ListCategory navigation={navigation} />
              <ListFood data={foods} navigation={navigation} />
            </ScrollView>
          )}
        </Container>
      ) : (
        //Loading
        <Container
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/loading.gif")}
            style={{
              width: 300,
              height: 100,
            }}
          />
        </Container>
      )}
    </>
  );
};
export default FoodScreen;
