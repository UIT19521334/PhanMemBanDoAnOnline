import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

//Screen
import Pending from '../screens/Order/Pending';
import Shipping from '../screens/Order/Shipping';
import Delivered from '../screens/Order/Delivered';

const Tab = createMaterialTopTabNavigator();

function MyTab () {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Pending" component={Pending}/>
            <Tab.Screen name="Shipping" component={Shipping}/>
            <Tab.Screen name="Delivered" component={Delivered}/>
        </Tab.Navigator>
    )
}

export default function OrderNavigator() {
    return <MyTab/>
}