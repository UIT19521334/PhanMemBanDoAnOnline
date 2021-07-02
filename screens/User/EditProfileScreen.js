import React, { useEffect, useState } from "react";
import Constants from 'expo-constants';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Avatar, RadioButton } from "react-native-paper";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';



const EditProfileScreen = (prop) => {
  //Info Detail User
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [username, setUsername] = useState();
  const [image, setImage] = useState();
  const [imageBackground, setImageBackground] = useState();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [sex, setSex] = React.useState("male");
  const [address, setAddress] = useState();
  const [birthday, setBirthday] = useState();
  const [exponentPushToken,setExponentPushToken] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");
    return { token, userID };
  };
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExponentPushToken(token));

    getUser().then((user) => {
      setToken(user.token);
      setUserID(user.userID);
      console.log({ userID });
      const apiUrl = `https://food-order-app12.herokuapp.com/api/users/${user.userID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      Axios.get(apiUrl, config)
        .then((res) => {
          setImage(res.data.image);
          setImageBackground(res.data.imageBackground);
          setUsername(res.data.username);
          setFullname(res.data.fullname);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setSex(res.data.sex);
          setAddress(res.data.address);
          setBirthday(res.data.birthday);

          console.log(res.data);
        })
        .catch((err) => console.log("loi"));
    });
  }, []);

  const updateAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    //Update Avatar
    if (!result.cancelled) {
      setImage(result.uri);
      let apiUrl = `https://food-order-app12.herokuapp.com/api/users/avatar/${userID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let data = new FormData();
      data.append("image", {
        uri: result.uri,
        type: "image/png",
        name: "image.jpg",
      });
      Axios.put(apiUrl, data, config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data));
    }
  };

  const updateImageBackground = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    //Update Image Background
    if (!result.cancelled) {
      setImageBackground(result.uri);
      let apiUrl = `https://food-order-app12.herokuapp.com/api/users/imageBackground/${userID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let data = new FormData();
      data.append("image", {
        uri: result.uri,
        type: "image/png",
        name: "image.jpg",
      });
      Axios.put(apiUrl, data, config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data));
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const getMonthFromString = (mon) => {
    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth() + 1;
    }
    return -1;
  };
  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const parts = date.toString().split(/[- :]/);
    const day = parts[2];
    const month = getMonthFromString(parts[1]);
    const year = parts[3];
    const dateFormat = `${day}/${month}/${year}`;

    setBirthday(dateFormat);
    hideDatePicker();
  };

  const updateUserInfo = () => {
    const apiUrl = `https://food-order-app12.herokuapp.com/api/users/userdetail/${userID}`;
    const userInfo = {
      fullname: fullname,
      email: email,
      phone: phone,
      sex: sex,
      address: address,
      birthday: birthday,
      exponentPushToken: exponentPushToken
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    Axios.post(apiUrl, userInfo, config)
      .then((res) => Alert.alert("\n", "Cập nhật thông tin thành công"))
      .catch((err) => console.log(err));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{flex : 1}}>
        <View style={styles.container}>
          <View style={styles.avatarInfo}>
            <TouchableOpacity onPress={updateImageBackground}>
              <ImageBackground
                source={{
                  uri: imageBackground
                    ? imageBackground
                    : "https://res.cloudinary.com/hoquanglinh/image/upload/v1620405345/Linh/pngtree-creative-minimalist-peach-flower-beautiful-background-synthesis-image_229506_mp96ei.jpg",
                }}
                style={styles.backgroundImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={updateAvatar}>
              <Avatar.Image
                source={{
                  uri: image
                    ? image
                    : "https://res.cloudinary.com/hoquanglinh/image/upload/v1620296815/Linh/avatar_sokxzf.jpg",
                }}
                size={130}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
            <Text style={styles.username}>{username}</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome
              style={styles.icon}
              name="user-o"
              size={24}
              color="black"
            />
            <TextInput
              style={styles.text}
              placeholder="Họ và tên"
              value={fullname}
              onChangeText={(text) => setFullname(text)}
            />
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              style={styles.text}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.row}>
            <Feather name="phone" size={24} color="black" style={styles.icon} />
            <TextInput
              style={styles.text}
              placeholder="Số điện thoại"
              keyboardType="numeric"
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
            />
          </View>

          <View style={styles.row}>
            <FontAwesome
              style={styles.icon}
              name="intersex"
              size={24}
              color="black"
            />
            <Text style={styles.text}>Giới tính</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <RadioButton
                color="#42aaf5"
                value="male"
                status={sex === "male" ? "checked" : "unchecked"}
                onPress={() => setSex("male")}
              />
              <Text style={styles.text}>Nam</Text>
              <RadioButton
                value="second"
                color="#42aaf5"
                status={sex === "female" ? "checked" : "unchecked"}
                onPress={() => setSex("female")}
              />
              <Text style={styles.text}>Nữ</Text>
              <RadioButton
                value="different"
                color="#42aaf5"
                status={sex === "different" ? "checked" : "unchecked"}
                onPress={() => setSex("different")}
              />
              <Text style={styles.text}>Khác</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              prop.navigation.navigate("EditAddressScreen");
            }}
          >
            <View style={styles.row}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={[styles.text]}>{address}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={showDatePicker}>
            <View style={styles.row}>
              <AntDesign
                name="calendar"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.text]}>
                {birthday ? birthday.toString() : "Ngày sinh"}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display="spinner"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={updateUserInfo}>
              <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Comfortaa_Bold",
  },
  avatarInfo: {
    alignItems: "center",
  },
  backgroundImage: {
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "#039dfc",
    width: width - 20,
    height: height / 4 + 30,
    marginTop: 10,
    marginBottom: -60,

    borderRadius: 50,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e3dada",
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 18,
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

export default EditProfileScreen;
