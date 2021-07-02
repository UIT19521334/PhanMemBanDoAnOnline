import { StyleSheet } from "react-native";
import { FoodCard } from "../../../AppStyle";

const styles = StyleSheet.create({
  container: FoodCard.container,
  photo: FoodCard.photo,
  name: FoodCard.name,
  price: FoodCard.price,
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    margin: 3,
    width: "100%",
  },
});

export default styles;
