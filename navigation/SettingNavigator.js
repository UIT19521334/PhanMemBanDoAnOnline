import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SettingScreen from "../screens/SettingScreen"
import AddInforFood from "../screens/AddFood/AddInforFood";
    
//screen AddFoods
import AddToFood from '../screens/AddFood/AddToFood';
import AddFoodStack from './AddFoodNavigator';

//screen AddProducts
import AddProduct from '../screens/AddProduct/AddProduct';

//screen EditOrders
import EditOrderNavigator from './EditOrderNavigator';

const Stack = createStackNavigator();
function SettingStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen
                    options={{headerShown: false}}
                    name="SettingScreen"
                    component={SettingScreen}
                />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="AddToFood"
                    component={AddFoodStack}
                />
                <Stack.Screen
                    options={{headerShown:false}}
                    name="AddProduct"
                    component={AddProduct}
                />
                <Stack.Screen
                    options={{headerShown:false}}
                    name="EditOrderNavigator"
                    component={EditOrderNavigator}
                />
            </Stack.Navigator>
    )

}
export default SettingStack;