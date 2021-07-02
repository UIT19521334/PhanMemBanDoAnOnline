import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Axios from "axios";
import FoodCard from "../foodCard";

const ListFoodByCategory = (props) => {
  const categoryId = props.route.params.categoryId;
  const getFoodByCategoryId = (foods, categoryId) => {
    return foods.filter((value) => {
      return value.category?.id == categoryId;
    });
  };

  const [foods, setFoods] = useState();
  useEffect(() => {
    console.log("connect to api food");
    Axios.get("https://food-order-app12.herokuapp.com/api/foods")
      .then((res) => {
        setFoods(getFoodByCategoryId(res.data, categoryId));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={(x) => {
          return <FoodCard item={x.item} navigation={props.navigation} />;
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};
export default ListFoodByCategory;
