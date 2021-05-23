import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedInStackParamList } from "../navigators/LoggedInNav";
import { TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import colors from "../colors";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

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
const Photo = styled.Image`
  height: 300px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 7px 10px;
  border-radius: 10px;
`;

type UploadPhotoScreenNavigationProp = StackNavigationProp<
  LoggedInStackParamList,
  "UploadPhoto"
>;

type UploadPhotoRouteProp = RouteProp<LoggedInStackParamList, "UploadPhoto">;

type Props = {
  navigation: UploadPhotoScreenNavigationProp;
  route: UploadPhotoRouteProp;
};

const UploadPhoto: React.FC<Props> = ({ navigation, route }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("caption");
  }, [register]);

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        console.log('navigation.navigate("UploadPhoto", { file: chosenPhoto })')
      }
    >
      <HeaderRightText>Share</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);

  return (
    <DismissKeyboard>
      <Container>
        <Photo source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onChangeText={(text) => setValue("caption", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadPhoto;
