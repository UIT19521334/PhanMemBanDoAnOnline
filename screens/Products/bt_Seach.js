import React from "react";
import { Text, View,StyleSheet,TextInput } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
{/* SEACH */}
const BT_search = (props) => {
    return (
        <View style={styles.inputView}>
        <Feather name="search" size={24} color="black" style={styles.iconView}/>
        <TextInput
        style={styles.TextInput}
        placeholder="Seach"
        placeholderTextColor="gray"
        />
        </View>
    );
};
const styles = StyleSheet.create({
    inputView: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 15,
        width: "90%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      },
    iconView: {
        marginLeft:20,
        flex: 1,
      },
    TextInput: {
        height: 50,
        flex: 6,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      },
  });
export default BT_search;