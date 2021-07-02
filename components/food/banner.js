import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
var { width } = Dimensions.get("window");

const Banner = () => {
  const bannerData = [
    { src: require("../../assets/banner1.png") },
    { src: require("../../assets/banner2.png") },
    { src: require("../../assets/banner3.png") },
  ];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay={true}
        autoplayDelay={2}
        autoplayLoop={true}
        showPagination
        data={bannerData}
        autoplayLoopKeepAnimation
        showPagination={false}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={item.src} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: width,
    height: width / 2,
  },
  image: {
    width: width - 20,
    height: width / 2,
    marginHorizontal: 10,
    borderRadius: 20
  },
});

export default Banner;
