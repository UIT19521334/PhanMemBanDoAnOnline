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
    Keyboard,
    SafeAreaView,
    Dimensions,
    ScrollView
} from 'react-native';
import { Picker, Item } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Title } from "react-native-paper";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';
import MyInput from './box'

var { width } = Dimensions.get("window")

function GetCategories(props) {

    const [image, setImage] = useState(null);
    const [Categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState()
    const [category, setCategory] = useState();
    const [countInStock, setCountInStock] = useState();

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

        axios
            .get(`https://food-order-app12.herokuapp.com/api/categories`)
            .then((res) => {
                console.log("connected caterory api ");
                setCategories(res.data);
            });

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

    const addProduct = () => {
        let formData = new FormData();
        const imageUri = "file:///" + image.split("file:/").join("");

        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('isFeatured', true)
        formData.append('countInStock', countInStock)
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
            .post("https://food-order-app12.herokuapp.com/api/foods", formData, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    alert("upload món ăn thành công !")
                }
            })
            .catch((err) => {
                alert("Có lỗi xảy ra khi upload món ăn")
                console.log(err)
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <MyInput
                            title={"Tên"}
                            placeholder={"bánh giò"}
                            keyboardType={"default"}
                            onChangeText={(text) => setName(text)}
                        />
                        <MyInput
                            title={"Mô tả"}
                            placeholder={"Là 1 món ăn ngon"}
                            keyboardType={"default"}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <MyInput
                            title={"Giá tiền"}
                            placeholder={"100.000"}
                            keyboardType={"numeric"}
                            onChangeText={(text) => setPrice(text)}
                        />
                        <MyInput
                            title={"Số lượng"}
                            placeholder={"50"}
                            keyboardType={"numeric"}
                            onChangeText={(text) => setCountInStock(text)}
                        />
                        <Item picker style={{ width: width * 0.4 }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" color="#ff6c00" />}
                                placeholder="Chọn loại đồ ăn"
                                selectedValue={category}
                                placeholderStyle={{ fontFamily: 'Comfortaa_Regular' }}
                                onValueChange={(e) => [setCategory(e)]}
                                style={{ marginTop: 15, width: width * 0.4, height: 50 }}
                                textStyle={{ fontFamily: 'Comfortaa_Regular' }}
                            >
                                {Categories.map((c) => {
                                    return (
                                        <Picker.Item key={c.id} label={c.name} value={c.id} />
                                    )
                                })}
                            </Picker>
                        </Item>
                        <TouchableOpacity
                            style={styles.BtnSubmit}
                            onPress={() => addProduct()}
                        >
                            <Text style={styles.SubmitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    avatarInfo: {
        alignItems: "center",
        marginTop: 10,
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