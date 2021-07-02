import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

export default class RadioButton extends Component {
  state = {
    value: null,
  };

  render() {
    const { PROP } = this.props;
    const { value } = this.state;

    return (
      <View>
        {PROP.map((res) => {
          return (
            <View key={res.key} style={styles.container}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={res.image}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text style={styles.radioText}>{res.text}</Text>
              </View>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                  this.props.setSelected(res.text);
                }}
              >
                {value === res.key && <View style={styles.selectedRb} />}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
    marginRight: 35,
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
    fontFamily: "Comfortaa_Regular",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ff6c00",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#ff6c00",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
