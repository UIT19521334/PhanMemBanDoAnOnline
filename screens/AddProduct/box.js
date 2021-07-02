import React from 'react'
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native'

var { width } = Dimensions.get("window")

const MyInput = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ flexWrap: "wrap" , left : 5}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <TextInput
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                style={styles.textInput}
                keyboardType= {props.keyboardType}
                multiline = {true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        borderColor: "#ff6c00",
        borderRadius: 10,
        width: width * 0.8,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 20,
    },
    title: {
        top: -13,
        backgroundColor: "white",
        paddingLeft: 5,
        paddingRight: 5,
        alignContent: 'center',
        fontFamily: 'Comfortaa_Regular',
        fontSize: 14
    },
    textInput: {
        top: -8,
        fontSize : 16,
        fontFamily : 'Comfortaa_Regular'
    }
})

export default MyInput;