import React from "react";
import { View, Text } from "react-native";

const Gallery = () => {
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
