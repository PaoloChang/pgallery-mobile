import React from "react";
import { View, Text } from "react-native";

const Notification = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Notification</Text>
    </View>
  );
};

export default Notification;
