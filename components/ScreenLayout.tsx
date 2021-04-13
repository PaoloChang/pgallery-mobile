import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

type Props = {
  loading: boolean;
  children: any;
};

const ScreenLayout: React.FC<Props> = ({ loading, children }) => {
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
