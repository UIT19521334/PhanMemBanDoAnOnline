import React, { useState, useEffect } from 'react';
import {
    Image,
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title } from "react-native-paper";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';


function GetCategories(props) {

    const [image, setImage] = useState(null);
    const [CategoriesName, setCategoriesName] = useState();
    const [token, setToken] = useState();

    useEffect(() => {

        AsyncStorage.getItem("token")
            .then((res) => {
                setToken(res)
            })
            .catch((err) => console.log(err));

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const addFoods = () => {
        let formData = new FormData();
        const imageUri = "file:///" + image.split("file:/").join("");

        formData.append('name', CategoriesName)
        formData.append('image', {
            uri: imageUri,
            type: mime.getType(imageUri),
            name: imageUri.split("/").pop()
        });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .post("https://food-order-app12.herokuapp.com/api/categories", formData, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    alert("upload category thành công !")
                }
            })
            .catch((err) => alert("Có lỗi xảy ra khi upload category"))


    }

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.avatarInfo}>
                <TouchableOpacity onPress={pickImage}>
                    <Avatar.Image
                        source={{
                            uri: image
                                ? image
                                : "https://res.cloudinary.com/hoquanglinh/image/upload/v1620296815/Linh/avatar_sokxzf.jpg",
                        }}
                        size={150}
                    />
                </TouchableOpacity>
                <Title style={styles.title}>Foods</Title>
                <View style={styles.TextBox}>
                    <TextInput
                        style={styles.CategoriesText}
                        value={CategoriesName}
                        onChangeText={(text) => setCategoriesName(text)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.BtnSubmit}
                    onPress={() => addFoods()}
                >
                    <Text style={styles.SubmitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    avatarInfo: {
        alignItems: "center",
        marginTop: 60,
    },
    title: {
        fontSize: 25,
        marginTop: 20,
        right: 120
    },
    TextBox: {
        flexDirection: "row",
        backgroundColor: "#99D9F2",
        borderRadius: 30,
        width: "80%",
        height: 70,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "#FFCC00",

    },
    CategoriesText: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 25

    },
    BtnSubmit: {
        width: 180,
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FFCC00",
    },
    SubmitText: {
        fontSize: 30
    }




})

export default GetCategories;