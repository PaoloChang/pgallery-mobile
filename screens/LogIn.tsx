import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function LogIn({ navigation }: any) {
  return (
    <View>
      <Text>LogIn</Text>

      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
