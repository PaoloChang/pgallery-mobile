import React from "react";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

export enum Size {
  WELCOME,
  HEADER,
}

const SLogo = styled.Text`
  max-width: ${(props: Prop) => (props.size === Size.HEADER ? "100%" : "50%")};
  margin-bottom: 20px;
  align-self: center;
  color: white;
  font-family: "Pacifico_400Regular";
  font-size: ${(props: Prop) =>
    props.size === Size.WELCOME ? "36px" : "22px"};
`;

type Prop = {
  size: Size;
};

const Logo: React.FC<Prop> = ({ size }) => {
  let [fontsLoaded] = useFonts({ Pacifico_400Regular });
  if (!fontsLoaded) return <AppLoading />;
  return <SLogo size={size}>PGallery</SLogo>;
};

export default Logo;
