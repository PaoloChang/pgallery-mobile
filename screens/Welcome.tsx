import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type WelcomeProps = {
  navigation: {
    navigate: Function;
  };
};

export default function Welcome({ navigation }: any) {
  // const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <View>
          <Text>Log In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// export default Welcome;
