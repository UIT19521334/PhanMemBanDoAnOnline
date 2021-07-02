import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../screens/Login";
import MyTab from "../navigation/Tab";
import Register from "../screens/Register";
import ResetPassword from "../screens/resetPassword";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
function LoginStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={MyTab}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default LoginStack;
