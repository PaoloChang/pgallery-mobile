import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedInStackParamList } from "../navigators/LoggedInNav";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { FEED_PHOTO } from "../fragments";
import { ActivityIndicator, TouchableOpacity } from "react-native";
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

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($image: Upload!, $caption: String) {
    uploadPhoto(image: $image, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
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
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      color={colors.white}
      style={{ marginRight: 10 }}
    />
  );
  const { register, handleSubmit, setValue } = useForm();
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      onError: (err) => {
        console.log(`Failed to upload photo: ${err}`);
      },
      update: (cache, result) => {
        const {
          data: { uploadPhoto },
        } = result;
        if (uploadPhoto.id) {
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              seeFeed(prev) {
                return [uploadPhoto, ...prev];
              },
            },
          });
          navigation.navigate("Tabs");
        }
      },
    }
  );

  useEffect(() => {
    register("caption");
  }, [register]);

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Share</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }: { caption: string }) => {
    console.log(`UploadPhoto / onValid`);
    console.log(route.params.file);
    const image = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: `image/jpeg`,
    });
    uploadPhotoMutation({
      variables: {
        image,
        caption,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("caption", text)}
            returnKeyType="done"
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadPhoto;
