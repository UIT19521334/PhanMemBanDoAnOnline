import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Entypo } from "@expo/vector-icons";
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
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
} from "./../components/formStyles";
import axios from "axios";

const { brand, darkLight } = Colors;
const ResetPassword = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [isConfirmed, setIsConfirmed] = useState(false)
    const handleResetPassword = ({ email }) => {

        let apiUrl = `https://food-order-app12.herokuapp.com/api/users/resetPassword`;
        console.log({ email })

        if (!email) {
            return Alert.alert("\n", "Vui lòng email");
        }
        axios
            .post(apiUrl, { email })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    Alert.alert(
                        "Thông báo",
                        "Email không tồn tại"
                    );
                }
            });
    };
    const handleChangePasswordWithAthenEmail = ({ authenEmail, password, rePassword }) => {

        let apiUrl = `https://food-order-app12.herokuapp.com/api/users/changePasswordWithAuthenEmail`;
        console.log({ authenEmail, password, rePassword })

        if (!authenEmail) {
            return Alert.alert("\n", "Vui lòng nhập mã xác nhận");
        } else if (!password) {
            return Alert.alert("\n", "Vui lòng nhập password");
        } else if (rePassword !== password) {
            return Alert.alert("\n", "Mật khẩu không khớp");
        }
        axios
            .post(apiUrl, { authenEmail, password })
            .then((res) => {
                console.log(res.data);
                Alert.alert(
                    "Thông báo",
                    "Thay đổi mật khẩu thành công",
                    [{
                        text: "Ok",
                        onPress: () => { navigation.navigate("Login") }
                    }]
                );
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    Alert.alert(
                        "Thông báo",
                        "Thay đổi mật khẩu thất bại"
                    );
                }
            });
    };
    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>FoodApp</PageTitle>
                    <Subtitle>Đổi mật khẩu</Subtitle>
                    {isConfirmed == false ? (
                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={(values) => {
                                handleResetPassword(values);
                                setIsConfirmed(true)
                            }}

                        >{({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label="Email"
                                icon="mail"
                                placeholder="abcd@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                            />

                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Gửi mã xác nhận</ButtonText>
                            </StyledButton>
                            <Line />
                        </StyledFormArea>)}

                        </Formik>
                    ) : (
                        <Formik
                            initialValues={{ authenEmail: "", password: "", rePassword: "" }}
                            onSubmit={(values) => {
                                handleChangePasswordWithAthenEmail(values);
                            }}

                        >{({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label="Mã xác thưc"
                                icon="mail"
                                placeholder="1234"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("authenEmail")}
                                onBlur={handleBlur("authenEmail")}
                                value={values.authenEmail}
                            />

                            <MyTextInput
                                label="Mật khẩu mới"
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
                                label="Nhập lại mật khẩu mới"
                                icon="key"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("rePassword")}
                                onBlur={handleBlur("rePassword")}
                                value={values.rePassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Xác nhận</ButtonText>
                            </StyledButton>
                            <Line />
                        </StyledFormArea>)}

                        </Formik>
                    )}

                </InnerContainer>
            </StyledContainer>
        </TouchableWithoutFeedback>
    );
};
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
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
    )

}
export default ResetPassword;