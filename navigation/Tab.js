import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
//Stacks
import HomeStack from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import OrderNavigator from "./OrderNavigator";
import UserStack from "./UserNavigator";
import SettingStack from "./SettingNavigator";

import { View } from "native-base";
import CartIcon from "../Shared/CartIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
const Tab = createBottomTabNavigator();

const MyTab = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();
  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");

    return { token, userID };
  };
  useEffect(() => {
    getUser().then((user) => {
      setToken(user.token);
      setUserID(user.userID);
      console.log({ userID });
      const apiUrl = `https://food-order-app12.herokuapp.com/api/users/${user.userID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      Axios.get(apiUrl, config)
        .then((res) => {
          setIsAdmin(res.data.isAdmin);
          console.log({ isAdmin: res.data.isAdmin });
        })
        .catch((err) => console.log("loi"));
    });
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,

        showLabel: false,
        activeTintColor: "#ff6c00",
      }}
    >
      <Tab.Screen
        name="Food"
        component={HomeStack}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarLabel: "Đơn hàng",
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="first-order" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <Ionicons name="cart-sharp" size={size} color={color} />
                <CartIcon />
              </View>
            );
          },
        }}
      />
      {isAdmin ? (
        <Tab.Screen
          name="Setting"
          component={SettingStack}
          options={{
            tabBarLabel: "Setting",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <View>
                  <FontAwesome name="cog" size={size} color={color} />
                </View>
              );
            },
          }}
        />
      ) : null}
      <Tab.Screen
        name="User"
        component={UserStack}
        options={{
          tabBarLabel: "Tôi",
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default MyTab;
