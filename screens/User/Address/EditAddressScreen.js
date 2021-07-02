import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get("window").width;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Axios from "axios";
const EditAddressScreen = ({ route, navigation }) => {
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();
  const [fullname, setFullname] = useState();
  const [province, setProvince] = useState("Hồ Chí Minh");
  const [district, setDistrict] = useState("Thủ Đức");
  const [ward, setWard] = useState("Linh Trung");
  const [addressDetail, setAddressDetail] = useState();
  useEffect(() => {
    if (route.params) {
      route.params.province
        ? setProvince(route.params.province)
        : setProvince("Hồ Chí Minh");
      route.params.district
        ? setDistrict(route.params.district)
        : setDistrict("Nhập quận,huyện");
      route.params.ward
        ? setWard(route.params.ward)
        : setWard("Nhập phường,xã");
    }
  }, [route.params]);
  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");
    return { token, userID };
  };
  useEffect(() => {
    getUser().then((user) => {
      setToken(user.token);
      setUserID(user.userID);

      const apiUrl = `https://food-order-app12.herokuapp.com/api/users/${user.userID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      Axios.get(apiUrl, config)
        .then((res) => {
          setFullname(res.data.fullname);
        })
        .catch((err) => console.log("loi"));
    });
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Họ & Tên</Text>
          <View style={styles.content}>
            <Text style={styles.text}>{fullname}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Tỉnh/Thành phố</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProvincesScreen");
            }}
          >
            <View style={styles.content}>
              <Text style={styles.text}>{province}</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Quận/Huyện</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DistrictsScreen", { province: province });
            }}
          >
            <View style={styles.content}>
              <Text style={styles.text}>{district}</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Phường/Xã</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WardsScreen", {
                wards: route.params ? route.params.wards : "",
              });
            }}
          >
            <View style={styles.content}>
              <Text style={styles.text}>{ward}</Text>
              <MaterialCommunityIcons
                name="greater-than"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#e3dada",
            marginHorizontal: 10,
            padding: 10,
          }}
        >
          <Text style={styles.text}>Địa chỉ cụ thể</Text>
          <Text style={{ color: "#bfb6b6" }}>
            Số nhà, tên toà nhà, tên đường, khu vực{" "}
          </Text>
          <TextInput
            style={styles.text}
            multiline={true}
            value={addressDetail}
            onChangeText={(text) => setAddressDetail(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log({ province, district, ward, addressDetail });
              const apiUrl = `https://food-order-app12.herokuapp.com/api/users/updateAddress/${userID}`;
              const newAddress = {
                address: `${addressDetail}, ${ward}, ${district}, ${province}`,
              };
              const config = {
                headers: { Authorization: `Bearer ${token}` },
              };
              Axios.post(apiUrl, newAddress, config)
                .then((res) =>
                  Alert.alert("\n", "Cập nhật thông tin thành công")
                )
                .catch((err) => console.log(err));
            }}
          >
            <Text style={styles.buttonText}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e3dada",
    justifyContent: "space-between",
    marginHorizontal: 10,
    padding: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginRight: 5,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#347aeb",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: width / 2,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default EditAddressScreen;
