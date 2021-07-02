import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
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
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "./../components/formStyles";

const { brand, darkLight } = Colors;

const Register = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const handleRegister = ({
    username,
    password,
    confirmpassword,
    phonenumber,
  }) => {
    console.log({ username, password, confirmpassword, phonenumber });
    if (!username) {
      Alert.alert("\n", "Vui lòng nhập tài khoản");
    } else if (!password) {
      Alert.alert("\n", "Vui long nhập mật khẩu");
    } else if (password !== confirmpassword) {
      Alert.alert("\n", "Mật khẩu không khớp");
    } else if (!phonenumber) {
      Alert.alert("\n", "Vui lòng nhập số điện thoại");
    } else {
      axios
        .post("https://food-order-app12.herokuapp.com/api/users/register", {
          username,
          password,
          phone: phonenumber,
          isAdmin: false,
        })
        .then((res) => {
          Alert.alert("Đăng kí tài khoản thành công");
          setTimeout(() => {
            console.log(res.data);
            navigation.navigate("Login");
          }, 1000);
        })
        .catch((err) => {
          console.error(err.response.data);
          Alert.alert("Tài khoản đã tồn tại");
        });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <InnerContainer>
          <PageTitle> Food App</PageTitle>
          <Subtitle>Đăng Ký</Subtitle>

          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmpassword: "",
              phonenumber: "",
            }}
            onSubmit={(values) => {
              handleRegister(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Tên đăng nhập"
                  icon="user"
                  placeholder="Tài khoản đăng nhập"
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
                <MyTextInput
                  label="Xác nhận mật khẩu"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("confirmpassword")}
                  value={values.confirmpassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MyTextInput
                  label="Số điện thoại"
                  icon="phone"
                  placeholder="Số điện thoại liên lạc"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("phonenumber")}
                  onBlur={handleBlur("phonenumber")}
                  value={values.phonenumber}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Đăng ký</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Bạn đã có tài khoản ? </ExtraText>
                  <TextLink
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <TextLinkContent>Đăng nhập</TextLinkContent>
                  </TextLink>
                </ExtraView>
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
        <RightIcon>
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
export default Register;
