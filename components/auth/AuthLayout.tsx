import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0 40px;
`;

const Logo = styled.Text`
  max-width: 50%;
  margin-bottom: 20px;
  align-self: center;
  color: white;
  font-family: "Pacifico_400Regular";
  font-size: 36px;
`;

export default function AuthLayout({ children }: any) {
  let [fontsLoaded] = useFonts({ Pacifico_400Regular });
  if (!fontsLoaded) return <AppLoading />;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      <Container>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
          style={{
            width: "100%",
          }}
        >
          <Logo>PGallery</Logo>
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
