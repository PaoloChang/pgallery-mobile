import React from "react";
import { View } from "react-native";

const ListSeparator: React.FC = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
      }}
    ></View>
  );
};

export default ListSeparator;
