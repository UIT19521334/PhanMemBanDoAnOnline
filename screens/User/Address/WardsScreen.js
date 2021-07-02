import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
} from "native-base";
import Axios from "axios";

const WardsScreen = ({ route, navigation }) => {
  const [wards, setWards] = useState([]);
  useEffect(() => {
    if (route.params) {
      setWards(route.params.wards);
    }
  }, []);

  return (
    <Content>
      <List>
        {wards.map((ward, index) => {
          return (
            <ListItem
              key={index}
              onPress={() => {
                navigation.navigate("EditAddressScreen", {
                  ward: ward.name,
                });
              }}
            >
              <Left>
                <Text>{ward.name}</Text>
              </Left>
            </ListItem>
          );
        })}
      </List>
    </Content>
  );
};

export default WardsScreen;
