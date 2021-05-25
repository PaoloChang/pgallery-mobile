import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadPhoto from "../screens/UploadPhoto";
import MessagesNav from "./MessagesNav";

const Stack = createStackNavigator();

export type LoggedInStackParamList = {
  Tabs: undefined;
  UploadPhoto: { file: string };
  Messages: undefined;
};

export default function LoggedInNav() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadPhoto"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload Photo",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "black" },
        }}
        component={UploadPhoto}
      />
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
}
