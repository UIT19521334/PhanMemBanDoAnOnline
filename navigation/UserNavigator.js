import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/User/ProfileScreen";
import EditProfileScreen from "../screens/User/EditProfileScreen";
import EditAddressScreen from "../screens/User/Address/EditAddressScreen";
import ProvincesScreen from "../screens/User/Address/ProvincesScreen";
import DistrictsScreen from "../screens/User/Address/DistrictsScreen";
import WardsScreen from "../screens/User/Address/WardsScreen";
import ChangePass from "../screens/ChangePass";
const Stack = createStackNavigator();
function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{
          title: "Địa chỉ mới",
          headerStyle: {
            backgroundColor: "#f5f0f0",
          },
        }}
      />
      <Stack.Screen
        name="ProvincesScreen"
        component={ProvincesScreen}
        options={{
          title: "Tỉnh/Thành phố",
          headerStyle: {
            backgroundColor: "#f5f0f0",
          },
        }}
      />
      <Stack.Screen
        name="DistrictsScreen"
        component={DistrictsScreen}
        options={{
          title: "Quận/Huyện",
          headerStyle: {
            backgroundColor: "#f5f0f0",
          },
        }}
      />

      <Stack.Screen
        name="WardsScreen"
        component={WardsScreen}
        options={{
          title: "Phường/Xã",
          headerStyle: {
            backgroundColor: "#f5f0f0",
          },
        }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePass"
        component={ChangePass}
      />
    </Stack.Navigator>
  );
}
export default UserStack;
