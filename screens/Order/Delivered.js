import React, {useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import { Container } from 'native-base';
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import FoodCard from "../EditOrder/Foodcard";
import NumberFormat from "react-number-format";


import axios from "axios";

var { width } = Dimensions.get("window")

const Delivered = () => {
  const [orders, setOrders] = useState()
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
            const pending = res.data.filter((item) => item.status == "delivered" && item.user._id == user.userID)
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
        <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={orders}
              keyExtractor={item => item._id}
              renderItem={(item) => {
                return (
                  <TouchableOpacity style={styles.container}>
                    <View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.textContainer}>MĐH : </Text>
                        <Text style={styles.textContainer}>{item.item._id}</Text>
                      </View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.textContainer}>ĐC : </Text>
                        <Text style={[styles.textContainer, { width: width * 0.65, textAlign: "right" }]}>{item.item.shippingAddrees}</Text>
                      </View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.textContainer}>SĐT : </Text>
                        <Text style={styles.textContainer}>{item.item.user.phone}</Text>
                      </View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.textContainer}>Người nhận : </Text>
                        <Text style={styles.textContainer}>{item.item.user.fullname}</Text>
                      </View>
                      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.textContainer}>TT : </Text>
                        <NumberFormat
                          value={item.item.totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => (
                            <Text style={styles.textContainer}>{value} VNĐ</Text>
                          )}
                        />
                      </View>
                    </View>
                    <View style={{height : 1.5, margin : 10, backgroundColor : '#ff6c00'}}/>

                    <FlatList
                      vertical
                      showsVerticalScrollIndicator={false}
                      data={item.item.orderItems}
                      renderItem={(item) => {
                        return <FoodCard item={item} />;
                      }}
                      keyExtractor={(item) => `${item.food.id}`}
                    />
                  </TouchableOpacity>

                )
              }}
            />
          </ScrollView>
        </View>
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
const styles = StyleSheet.create({
  insize: {
    flexDirection: "column",
  },
  textContainer: {
    fontFamily: 'Comfortaa_Regular',
    fontSize: 14,
  },
  container: {
    backgroundColor: "#ffffff",
    width: width * 0.9,
    marginBottom: 30,
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: "#ececec",
    bottom: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  }
});
export default Delivered;
