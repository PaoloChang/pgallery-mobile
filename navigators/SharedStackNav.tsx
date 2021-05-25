import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo, { Size } from "../components/Logo";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notification from "../screens/Notifications";
import Gallery from "../screens/Gallery";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export type SharedStackParamList = {
  Feed: undefined;
  Search: undefined;
  Gallery: { id: number; username: string };
  Photo: { photoId: number };
  Likes: { photoId: number };
  Comments: { photoId: number };
  Profile: undefined;
  Messages: undefined;
};

interface ISharedStackNav {
  screenName: string;
}

export default function SharedStackNav({ screenName }: ISharedStackNav) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
          height: 103,
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: () => <Logo size={Size.HEADER} />,
          }}
        />
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
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
