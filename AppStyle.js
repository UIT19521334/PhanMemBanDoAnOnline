import { StyleSheet, Dimensions } from "react-native";

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const foodNumColums = 2;
// item size
const FOOD_ITEM_HEIGHT = 150;
const FOOD_ITEM_MARGIN = 20;

// 2 photos per width
export const FoodCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: FOOD_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (foodNumColums + 1) * FOOD_ITEM_MARGIN) / foodNumColums,
    height: FOOD_ITEM_HEIGHT + 85,
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white'
  },
  photo: {
    width:
      (SCREEN_WIDTH - (foodNumColums + 1) * FOOD_ITEM_MARGIN) / foodNumColums,
    height: FOOD_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    fontFamily: 'Comfortaa_Bold'
  },
  price: {
    marginTop: 5,
    marginBottom: 5,
  },
});
