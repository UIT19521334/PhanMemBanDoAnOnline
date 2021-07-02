import React from "react";
import { Text, View, Button } from "react-native";
const OrderScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is Order Screen</Text>
      <Button
        title="Click me"
      />
    </View>
  );
};
export default OrderScreen;
