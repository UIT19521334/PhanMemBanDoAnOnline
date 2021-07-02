import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import FoodScreen from "../screens/FoodScreen";
import ListFoodByCategory from "../components/food/foodByCategory/ListFoodByCategory";
import SingleFood from "../components/food/SingleFood";
import CartNavigator from "./CartNavigator";

const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={FoodScreen}
      />
      <Stack.Screen
        name="FoodByCategory"
        component={ListFoodByCategory}
        options={({ route }) => ({ title: route.params.category })}
      />
      <Stack.Screen
        name="FoodDetail"
        component={SingleFood}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default HomeStack;
