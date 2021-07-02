import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    Alert
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import axios from 'axios'
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddToFood = ({ navigation }) => {
    const [categories, setCategories] = useState();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then((res) => {
                setToken(res)
            })
            .catch((err) => console.log(err))


        axios
            .get(`https://food-order-app12.herokuapp.com/api/categories`)
            .then((res) => {
                console.log("connected caterory api ");
                setCategories(res.data);
                setLoading(false);
            });
    }, []);

    const deleteFoods = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios
            .delete(`https://food-order-app12.herokuapp.com/api/categories/${id}`, config)
            .then((res) => {
                const newCategories = categories.filter((item) => item.id !== id);
                setCategories(newCategories);
                alert("Bạn đã xóa thành công !")
            })
            .catch((err) => {
                console.log(err)
                alert("Xóa thất bại.")
            })
    }

    return (
        <>
            {loading == false ? (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.PageTile}>Foods</Text>
                    <View style={styles.inputView}>
                        <TouchableOpacity onPress={() => navigation.navigate("AddInforFood")}>
                            <Ionicons
                                style={styles.Addicon}
                                name="add"
                                size={50}
                                color="#ff6c00" />
                        </TouchableOpacity>

                    </View>
                    <ScrollView >
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={(item) => {
                                return (
                                    <View style={styles.itemCategory}>
                                        <Image
                                            source={{ uri: item.item.image }}
                                            style={styles.image}
                                        />
                                        <Text style={styles.textStyle}>{item.item.name}</Text>
                                        <TouchableOpacity
                                            style={{ flex: 1, marginLeft: 20 }}
                                            onPress={() => {
                                                Alert.alert("Lưu ý !!!", "Bạn có muốn xóa không?", [
                                                    { text: "Có", onPress: () => deleteFoods(item.item.id) },
                                                    { text: "Không", onPress: () => console.log("alert close") }
                                                ])
                                            }}
                                        >
                                            <Icon
                                                name="trash"
                                                color={"#ff6c00"}
                                                size={30}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </ScrollView>
                </SafeAreaView>
            ) : (
                //Loading 
                <Container
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 340
                    }}
                >
                    <Image
                        source={require('../../assets/loading.gif')}
                        style={{
                            width: 300,
                            height: 100
                        }}
                    />
                </Container>
            )}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    PageTile: {

        fontSize: 50,
        textAlign: "center",

    },
    inputView: {
        alignItems: "center",
        padding: 10,


    },
    Addicon: {

    },
    image: {
        flex: 2,
        height: 80,
        width: 80
    },
    itemCategory: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: "row",
        borderRadius: 50,
        height: 80,
        width: 280,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#ff6c00",
        bottom: -10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20
    },
    textStyle: {
        flex: 3,
        fontFamily: 'Comfortaa_Regular',
        fontSize: 18,
        alignSelf: 'center'
    }
})

export default AddToFood;