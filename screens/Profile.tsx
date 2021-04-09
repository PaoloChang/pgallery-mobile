import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logOutUser } from "../apollo";

const Profile = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => logOutUser()}>
        <Text style={{ color: "white" }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
