import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logOutUser } from "../apollo";
import useUser from "../hooks/useUser";
import { SharedStackParamList } from "../navigators/SharedStackNav";

type ProfileScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Profile"
>;

type ProfileScreenRouteProp = RouteProp<SharedStackParamList, "Profile">;

interface Props {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const { data } = useUser();

  useEffect(() => {
    navigation.setOptions({
      title: data?.seeMe.username,
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => logOutUser()}>
        <Text style={{ color: "white" }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
