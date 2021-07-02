import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { Container } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

var { width } = Dimensions.get("window");

const List = () => {
  const [foods, setFoods] = useState();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState();
  const [id, setId] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("token")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => console.log(err));

      console.log("connect to api food");
      axios
        .get("https://food-order-app12.herokuapp.com/api/foods")
        .then((res) => {
          setFoods(res.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [])
  );

  const deleteProduct = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`https://food-order-app12.herokuapp.com/api/foods/${id}`, config)
      .then((res) => {
        const newFoods = foods.filter((item) => item.id !== id);
        setFoods(newFoods);
        alert("Bạn đã xóa thành công !");
      })
      .catch((err) => {
        console.log(err);
        alert("Xóa thất bại.");
      });
    setVisible(false);
  };

  return (
    <>
      {loading == false ? (
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              setVisible(false);
            }}
          >
            <View style={styles.modalStyle}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}
                  style={{
                    alignSelf: "flex-end",
                    position: "absolute",
                    top: 5,
                    right: 10,
                  }}
                >
                  <Icon name="close" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Lưu ý !!!", "Bạn có muốn xóa không?", [
                      { text: "Có", onPress: () => deleteProduct() },
                      {
                        text: "Không",
                        onPress: () => console.log("alert close"),
                      },
                    ]);
                  }}
                >
                  <View style={styles.buttonContainer}>
                    <Text style={styles.textContainer}>Xóa</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <ScrollView>
            {foods.map((item, index) => (
              <TouchableOpacity
                onLongPress={() => {
                  [setVisible(true), setId(item.id)];
                }}
                activeOpacity={0.8}
              >
                <View key={item.id} style={styles.container}>
                  <View style={styles.header}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text
                      style={styles.bodyText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={styles.bodyText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.category?.name}
                    </Text>
                    <Text style={styles.bodyText}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        //Loading
        <Container
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 340,
          }}
        >
          <Image
            source={require("../../assets/loading.gif")}
            style={{
              width: 300,
              height: 100,
            }}
          />
        </Container>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  bodyText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    height: 55,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    flex: 1,
    padding: 30,
  },
  image: {
    borderRadius: 10,
    height: 40,
    width: width / 6,
    margin: 2,
  },
  buttonContainer: {
    borderRadius: 15,
    backgroundColor: "red",
    justifyContent: "center",
    padding: 10,
  },
  textContainer: {
    fontFamily: "Comfortaa_Regular",
    fontSize: 18,
    color: "white",
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default List;
