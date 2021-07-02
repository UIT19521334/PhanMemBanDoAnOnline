import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

var minutes = Math.floor(Math.random() * 30) + 10;

const Thankyou = (props) => {
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };

  const confirm = props.route.params;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex : 1 }}>
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 35, fontFamily: "Comfortaa_Bold" }}>
          Cảm ơn
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#a4a7ab",
            marginTop: 20,
            fontFamily: "Comfortaa_Medium",
          }}
        >
          Đơn hàng của bạn đã được
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "#a4a7ab",
            marginTop: 10,
            fontFamily: "Comfortaa_Medium",
          }}
        >
          thêm vào thành công
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/girl-scooter-big.gif")}
          style={{
            width: 300,
            height: 200,
            borderRadius: 15,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#a4a7ab",
            fontFamily: "Comfortaa_Medium",
          }}
        >
          Ước tính giao hàng trong khoảng
        </Text>
        <Text style={{ fontSize: 18, fontFamily: "Comfortaa_Bold" }}>
          {minutes} phút
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#a4a7ab",
            fontFamily: "Comfortaa_Medium",
          }}
        >
          Đơn hàng sẽ được giao tới
        </Text>
        <Text
          style={{
            fontSize: 18,
            paddingTop: 5,
            fontFamily: "Comfortaa_Bold",
            textAlign: "center",
          }}
        >
          {confirm.address}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 250,
            backgroundColor: "#ff6c00",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
          onPress={confirmOrder}
        >
          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontFamily: "Comfortaa_Regular",
            }}
          >
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 1,
  },
});

export default connect(null, mapDispatchToProps)(Thankyou);
