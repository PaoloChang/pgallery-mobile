import React from "react";
import { View, Text } from "react-native";
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
  height: 15%;
  color: white;
  font-family: "Pacifico_400Regular";
  font-size: 36px;
`;

export default function AuthLayout({ children }: any) {
  let [fontsLoaded] = useFonts({ Pacifico_400Regular });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <Container>
      <Logo>PGallery</Logo>
      {children}
    </Container>
  );
}
