import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CategoryItem from "./categoryItem";
import axios from "axios";

const ListCategory = (props) => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios
      .get(`https://food-order-app12.herokuapp.com/api/categories`)
      .then((res) => {
        console.log("connected caterory api ");
        const categories = res.data;
        setCategories(categories);
      });
  }, []);
  const renderCategoryItem = ({ item }) => {
    return <CategoryItem item={item} navigation={props.navigation} />;
  };
  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};
export default ListCategory;
