import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MessagesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => (
          <Ionicons color={tintColor} name="chevron-down" size={28} />
        ),
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
