import React, { useEffect, useState } from "react";
//import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Header, Item, Input, Icon, Button, Text, Right } from "native-base";

const HeaderSearch = (props) => {
  const [selectedIconCart, setSelectedIconCart] = useState(false);
  const [selectedIconMess, setSelectedIconMess] = useState(false);
  const [textInput, setTextInput] = useState();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setSelectedIconCart(false);
  }, [selectedIconCart]);
  useEffect(() => {
    setSelectedIconMess(false);
  }, [selectedIconMess]);
  return (
    <Header style={{ backgroundColor: "rgb(255, 128, 0)" }} searchBar rounded>
      <Item style={{ flex: 0.9 }}>
        <Icon name="search-outline" onPress={() => console.log("clicked")} />
        <Input
          placeholder="Search"
          onChangeText={(textInput) => {
            setTextInput(textInput);
            props.foodName(textInput);
          }}
          onFocus={() => {
            setFocus(true);
            props.isFocus(true);
          }}
          value={textInput}
        />

        {focus ? (
          <Icon
            //When press icon x => set focus is false to show  food list
            name="close-outline"
            onPress={() => {
              props.isFocus(false);
              Keyboard.dismiss();
              setTextInput("");
              setFocus(false);
            }}
          />
        ) : (
          <View></View>
        )}
      </Item>
      <Right style={{ flex: 0.15 }}>
        <Icon
          name={selectedIconCart ? "cart" : "cart-outline"}
          onPress={() => props.navigation.navigate("CartNavigator")}
        />
      </Right>
      <Right style={{ flex: 0.15 }}>
        <Icon
          name={
            selectedIconMess
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline"
          }
          onPress={() => setSelectedIconMess(true)}
        />
      </Right>
    </Header>
  );
};
export default HeaderSearch;
