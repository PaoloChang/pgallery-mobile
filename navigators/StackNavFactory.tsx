import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notification from "../screens/Notifications";
import Gallery from "../screens/Gallery";

const Stack = createStackNavigator();

interface IStackNavFactory {
  screenName: string;
}

export default function StackNavFactory({ screenName }: IStackNavFactory) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen name={"Feed"} component={Feed} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notification" ? (
        <Stack.Screen name={"Notification"} component={Notification} />
      ) : null}
      {screenName === "Profile" ? (
        <Stack.Screen name={"Profile"} component={Profile} />
      ) : null}
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
