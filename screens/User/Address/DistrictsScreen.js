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

const DistrictsScreen = ({ route, navigation }) => {
  let province = route.params?.province;
  useEffect(() => {
    Axios.get(
      "https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json"
    ).then((res) => {
      let code = res.data[province].code;
      Axios.get(
        `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${code}.json`
      ).then((res) => setDistricts(res.data.district));
    });
  }, []);
  const [districts, setDistricts] = useState(["Thủ Đức", "Bình Thạnh"]);
  return (
    <Content>
      <List>
        {districts.map((district, index) => {
          return (
            <ListItem
              key={index}
              onPress={() => {
                navigation.navigate("EditAddressScreen", {
                  district: district.name,
                  wards: district.ward,
                });
              }}
            >
              <Left>
                <Text>{district.name}</Text>
              </Left>
            </ListItem>
          );
        })}
      </List>
    </Content>
  );
};

export default DistrictsScreen;
