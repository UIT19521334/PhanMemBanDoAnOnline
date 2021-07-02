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

const ProvincesScreen = ({ navigation }) => {
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    Axios.get(
      "https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json"
    ).then((res) => {
      setProvinces(Object.keys(res.data).sort());
    });
  }, []);
  return (
    <Content>
      <List>
        {provinces.map((value, index) => {
          return (
            <ListItem
              key={index}
              onPress={() => {
                navigation.navigate("EditAddressScreen", {
                  province: value,
                });
              }}
            >
              <Left>
                <Text>{value}</Text>
              </Left>
            </ListItem>
          );
        })}
      </List>
    </Content>
  );
};

export default ProvincesScreen;
