import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  Subtitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  TextLink,
  TextLinkContent,
} from "./../components/formStyles";

const { brand, darkLight } = Colors;
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const userID = await AsyncStorage.getItem("userID");
    const username = await AsyncStorage.getItem("username");
    const password = await AsyncStorage.getItem("password");
    return { token, userID, username, password };
  };
  useEffect(() => {
    getUser().then((user) => {
      setUsername(user.username);
      setPassword(user.password);
      if (user.token) {
        navigation.navigate("Home");
      }
    });
  }, []);
  const handleLogin = ({ username, password }) => {
    if (!username) {
      return Alert.alert("\n", "Vui lòng nhập tài khoản");
    }
    if (!password) {
      return Alert.alert("\n", "Vui lòng nhập mật khẩu");
    }
    AsyncStorage.setItem("username", username);
    AsyncStorage.setItem("password", password);

    axios
      .post("https://food-order-app12.herokuapp.com/api/users/login", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.setItem("userID", res.data.userID);
        AsyncStorage.setItem("token", res.data.token);

        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Thông báo",
            "Tên tài khoản hoặc mật khẩu không chính xác"
          );
        }
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <InnerContainer>
          <PageLogo source={require("./../assets/logo1.png")} />
          <PageTitle> Food App</PageTitle>
          <Subtitle>Đăng nhập</Subtitle>

          <Formik
            initialValues={{ username: username, password: password }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Tên đăng nhập"
                  icon="user"
                  placeholder="tài khoản đăng nhập"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />

                <MyTextInput
                  label="Mật khẩu"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Đăng nhập</ButtonText>
                </StyledButton>

                <StyledButton
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  <ButtonText>Đăng Ký</ButtonText>
                </StyledButton>
                <Line />
                <Text
                  onPress={() => {
                    navigation.navigate("ResetPassword");
                  }}
                  style={{ color: "#ff6347", textAlign: "center" }}
                >
                  Quên mật khẩu?
                </Text>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </TouchableWithoutFeedback>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Entypo name={icon} size={24} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Entypo
            name={hidePassword ? "eye-with-line" : "eye"}
            size={24}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
