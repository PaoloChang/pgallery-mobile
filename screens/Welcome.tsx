import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import colors from "../colors";
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.Text`
  max-width: 50%;
  height: 15%;
  color: white;
  font-family: "Pacifico_400Regular";
  font-size: 36px;
`;

const CreateAccount = styled.View`
  background-color: ${colors.blue};
  padding: 10px 10px;
  border-radius: 5px;
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 700;
`;

const LoginLink = styled.Text`
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
    <Container>
      <Logo>PGallery</Logo>
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Login</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}

// export default Welcome;
