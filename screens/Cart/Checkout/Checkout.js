import React, { useState, useEffect, useRef } from "react";
import Constants from 'expo-constants';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import MethodCheckout from "./MeThodCheckout";
import axios from 'axios';

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications'

var { width, height } = Dimensions.get("window");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



const Checkout = (props) => {

  const [expoPushToken, setExpoPushToken] = useState('ExponentPushToken[KqR-zJCQTihZ-jyp5v8UEI]');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  const getUser = async () => {
    try {
      const userID = await AsyncStorage.getItem("userID")
      const Token = await AsyncStorage.getItem("token")

      if (userID != null && Token != null) {
        setUserId(userID)
        setToken(Token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [subPrice, setSubPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    setSubPrice(props.route.params.total);
    setTotalPrice(props.route.params.total + 20000);
    getUser();

    return () => {
      setOrderItems();
    };
  }, []);

  const chechOut = () => {
    sendPushNotification(expoPushToken)
    axios.post("https://food-order-app12.herokuapp.com/api/orders", {
      orderItems,
      shippingAddrees: address,
      user: userId
    }, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          props.navigation.navigate("Thankyou", { address: address });
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ height: height * 0.58 }}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.addressContainer}>
              <Text style={styles.text}>Địa chỉ</Text>
              <TextInput
                style={styles.TextInput}
                placeholder="Nhập địa chỉ nhận hàng."
                multiline={true}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>

            <View style={styles.deliveryContainer}>
              <Text style={styles.text}>Giao hàng</Text>
              <Text style={[styles.text, { color: "#a4a4a4" }]}>
                Tiêu chuẩn(20,000 đồng)
              </Text>
            </View>

            <View style={[styles.paymentContainer, { marginBottom: 20 }]}>
              <Text style={styles.text}>Thanh Toán</Text>
              <MethodCheckout />
            </View>
          </View>
        </ScrollView>
      </View>

      <View>
        <View style={[styles.something, { marginTop: 5 }]}>
          <Text style={styles.textContainer}>Món ăn</Text>
          <Text style={styles.textContainer}>{subPrice} đồng</Text>
        </View>

        <View style={styles.something}>
          <Text style={styles.textContainer}>Phí giao hàng</Text>
          <Text style={styles.textContainer}>20,000 đồng</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.something}>
          <Text style={styles.textContainer}>Tổng tiền</Text>
          <Text style={styles.textContainer}>{totalPrice} đồng</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmContainer}
          // onPress={() => chechOut()}
          onPress={() => chechOut()}
        >
          <Text
            style={{
              fontFamily: "Comfortaa_Regular",
              fontSize: 20,
              color: "white",
              alignSelf: "center",
            }}
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};


const styles = StyleSheet.create({
  addressContainer: {
    borderRadius: 20,
    padding: 10,
    width: width * 0.9,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  deliveryContainer: {
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: width * 0.9,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  paymentContainer: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmContainer: {
    marginTop: 20,
    borderRadius: 20,
    width: width * 0.5,
    alignSelf: "center",
    backgroundColor: "#ff6c00",
    padding: 10,
    marginBottom: 10,
  },
  textContainer: {
    fontFamily: "Comfortaa_Regular",
    fontSize: 18,
    padding: 3,
  },
  line: {
    width: width * 0.8,
    height: 1,
    backgroundColor: "#bdbdbd",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    fontFamily: "Comfortaa_Regular",
    fontSize: 15,
    padding: 3,
  },
  something: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.8,
    alignSelf: "center",
  },
  TextInput: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    fontFamily: "Comfortaa_Regular",
    padding: 10,
    borderColor: "#ff6c00",
  },
  bottomContainer: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "white",
    width: width,
  },
});

const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: "Bạn có đơn hàng kìa! 📬",
    body: 'Mau vô xem để chuẩn bị đơn hàng nào!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default connect(mapStateToProps)(Checkout);

