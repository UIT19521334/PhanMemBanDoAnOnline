import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
  Container,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import NumberFormat from "react-number-format";

import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const CartScreen = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.food.price * cart.quantity);
  });

  return (
    <>
      {props.cartItems.length > 0 ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon
                    name="trash"
                    color={"white"}
                    size={30}
                    style={{
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ff6c00",
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
            style={{ marginBottom: 134 }}
          />
          <View style={styles.bottomContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Comfortaa_Bold",
                  fontSize: 18,
                  color: "white",
                  padding: 3,
                }}
              >
                Tổng tiền :{" "}
              </Text>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <Text
                    style={{
                      fontFamily: "Comfortaa_Bold",
                      fontSize: 18,
                      color: "white",
                      padding: 3,
                    }}
                  >
                    {value} đồng
                  </Text>
                )}
              />
            </View>
            <View
              style={{
                width: width * 0.8,
                borderWidth: 1,
                borderColor: "#ececec",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={[styles.buttonContainer]}
                onPress={() => props.clearCart()}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Comfortaa_Bold",
                    color: "black",
                  }}
                >
                  Xóa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  props.navigation.navigate("Checkout", { total: total })
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Comfortaa_Bold",
                    color: "black",
                  }}
                >
                  Đặt hàng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Image
            source={require("../../assets/empty-cart.png")}
            style={{
              width: width,
              height: height / 3,
            }}
          />
          <Text style={{ fontFamily: "Comfortaa_Regular", padding: 3 }}>
            Có vẻ như giỏ hàng của bạn đang trống
          </Text>
          <Text
            style={{
              fontFamily: "Comfortaa_Regular",
              padding: 3,
              marginTop: 5,
            }}
          >
            Hãy thêm món ăn vào giỏ hàng nào !!!
          </Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ff6c00",
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  buttonContainer: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 24,
  },
  hiddenButton: {
    //backgroundColor: '#ff6c00',
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
