import React, {useState,useCallback} from "react";
import { SafeAreaView, FlatList,Image } from "react-native";
import OrderCard from "./OrderCard";
import { Container } from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Shipping = () => {
  const [orders, setOrders] = useState()
  const [foods, setFoods] = useState()
  const [loading, setLoading] = useState(true)


  const getUser = async () => {
    const userID = await AsyncStorage.getItem("userID")
    const token = await AsyncStorage.getItem("token")
    return { userID, token }
  }

  useFocusEffect((
    useCallback(() => {
      getUser().then((user) => {
        const token = user.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get("https://food-order-app12.herokuapp.com/api/orders", config)
          .then((res) => {
            const pending = res.data.filter((item) => item.status == "shipping")
            setOrders(pending),
              setLoading(false)
          })
          .catch((err) => console.log(err))
      })
    }, [])
  ))
  return (
    <>
      {loading == false ? (
        <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem={(order) => {
              return <OrderCard order={order}/>;
            }}
            keyExtractor={order => order._id}
          />
        </SafeAreaView>
      ) : (
        <Container
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require('../../assets/loading.gif')}
            style={{
              width: 300,
              height: 100
            }}
          />
        </Container>
      )}
    </>
  );
};
export default Shipping;