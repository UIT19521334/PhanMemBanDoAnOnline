import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

//Screen
import Pending from '../screens/EditOrder/Pending';
import Shipping from '../screens/EditOrder/Shipping';
import Deliveried from '../screens/EditOrder/Delivered';

const Tab = createMaterialTopTabNavigator();

function MyTab () {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Pending" component={Pending}/>
            <Tab.Screen name="Shipping" component={Shipping}/>
            <Tab.Screen name="Deliveried" component={Deliveried}/>
        </Tab.Navigator>
    )
}

export default function EditOrderNavigator() {
    return <MyTab/>
}