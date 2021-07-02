import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { View, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
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
const ChangePass = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    const handleChangePassword = async ({ password, newPassword, reNewPassword }) => {
        const userID = await AsyncStorage.getItem("userID");
        const token = await AsyncStorage.getItem("token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        let apiUrl = `https://food-order-app12.herokuapp.com/api/users/changePassword/${userID}`;
        console.log({ password, newPassword, reNewPassword })

        if (!password) {
            return Alert.alert("\n", "Vui lòng nhập password");
        } else if (!newPassword) {
            return Alert.alert("\n", "Vui lòng nhập password mới");
        } else if (reNewPassword !== newPassword) {
            return Alert.alert("\n", "Mật khẩu mới không khớp");
        }
        axios
            .post(apiUrl, { password, newPassword }, config)
            .then((res) => {
                console.log(res.data);
                Alert.alert(
                    "Thông báo",
                    "Thay đổi mật khẩu thành công",
                    [{
                        text : "Ok",
                        onPress: () => { navigation.navigate("ProfileScreen")}
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
            onPress = {Keyboard.dismiss }
        >
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>FoodApp</PageTitle>
                    <Subtitle>Đổi mật khẩu</Subtitle>
                    <Formik
                        initialValues={{ password: "", newPassword: "", reNewPassword: "" }}
                        onSubmit={(values) => {
                            handleChangePassword(values);
                        }}

                    >{({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                        <MyTextInput
                            label="Mật khẩu hiện tại"
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
                            label="Mật khẩu mới"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange("newPassword")}
                            onBlur={handleBlur("newPassword")}
                            value={values.newPassword}
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
                            onChangeText={handleChange("reNewPassword")}
                            onBlur={handleBlur("reNewPassword")}
                            value={values.reNewPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Lưu thay đổi</ButtonText>
                        </StyledButton>
                        <Line />
                    </StyledFormArea>)}

                    </Formik>
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
export default ChangePass;