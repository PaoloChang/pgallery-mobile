import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SharedStackParamList } from "../navigators/SharedStackNav";

type GalleryScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Gallery"
>;

type GalleryScreenRouteProp = RouteProp<SharedStackParamList, "Gallery">;

interface Props {
  navigation: GalleryScreenNavigationProp;
  route: GalleryScreenRouteProp;
}

const Gallery: React.FC<Props> = ({ navigation, route: { params } }) => {
  useEffect(() => {
    if (params.username) {
      navigation.setOptions({
        title: params.username,
      });
    }
  }, []);

  console.log(navigation, params);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someone's Gallery</Text>
    </View>
  );
};

export default Gallery;
