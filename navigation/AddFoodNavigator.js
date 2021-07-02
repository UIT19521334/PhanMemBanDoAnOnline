import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import AddInforFood from "../screens/AddFood/AddInforFood";
    
import AddToFood from '../screens/AddFood/AddToFood';

const Stack = createStackNavigator();
function AddFoodStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen
                    options={{headerShown: false}}
                    name="AddToFood"
                    component={AddToFood}
                />
                <Stack.Screen
                    options={{headerShown: false}}
                    name="AddInforFood"
                    component={AddInforFood}
                />
            </Stack.Navigator>
    )

}
export default AddFoodStack;