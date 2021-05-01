import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, useWindowDimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { UploadStackParamList } from "../navigators/UploadNav";

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

interface IPhoto {
  filename: string;
  id: string;
  uri: string;
}

type SelectPhotoScreenNavigationProp = StackNavigationProp<
  UploadStackParamList,
  "SelectPhoto"
>;

type Props = {
  navigation: SelectPhotoScreenNavigationProp;
};

export default function SelectPhoto({ navigation }: Props) {
  const [approved, setApproved] = useState(false);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const { width } = useWindowDimensions();
  const numColumns = 4;

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const {
      accessPrivileges,
      canAskAgain,
    } = await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setApproved(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setApproved(true);
      getPhotos();
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);

  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };

  const renderItem = ({ item: photo }: { item: IPhoto }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </Bottom>
    </Container>
  );
}
