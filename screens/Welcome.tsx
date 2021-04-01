import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import colors from "../colors";
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
  align-self: center;
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 30px;
`;

type WelcomeProps = {
  navigation: {
    navigate: Function;
  };
};

export default function Welcome({ navigation }: any) {
  // const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {

  let [fontsLoaded] = useFonts({ Pacifico_400Regular });

  if (!fontsLoaded) return <AppLoading />;

  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");

  return (
    <AuthLayout>
      <AuthButton
        text="Create New Account"
        onPress={goToCreateAccount}
        disabled={false}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}

// export default Welcome;
