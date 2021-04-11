import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

type TScreenLayout = {
  loading: boolean;
  children: any;
};

const ScreenLayout: React.FC<TScreenLayout> = ({ loading, children }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
};

export default ScreenLayout;
