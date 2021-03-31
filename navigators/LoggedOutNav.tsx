import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";
import { withTheme } from "styled-components";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "white",
        }}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
    </Stack.Navigator>
  );
}
