import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function LogIn({ navigation }: any) {
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.5)"
        returnKeyType="next"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        returnKeyType="done"
        lastInput={true}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
