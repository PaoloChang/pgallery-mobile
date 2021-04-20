import React, { useEffect, useState } from "react";
import {
  useWindowDimensions,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const Container = styled.View``;
const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 54px;
`;
const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 15px;
`;
const Username = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-right: 5px;
`;
const SImage = styled.Image``;
const Descriptions = styled.View`
  padding: 10px;
`;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Likes = styled.Text`
  color: white;
  font-weight: 600;
  margin: 5px 0px;
`;
const Caption = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CaptionText = styled.Text`
  color: white;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      status
      error
    }
  }
`;

interface Props {
  id: number;
  user: {
    avatar: string;
    username: string;
  };
  caption: string;
  image: string;
  isLiked: boolean;
  likes: number;
  fullView: boolean;
}

const Post: React.FC<Props> = ({
  id,
  user,
  caption,
  image,
  isLiked,
  likes,
  fullView,
}) => {
  const navigation = useNavigation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(windowHeight - 450);

  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setImageHeight(height / (width / windowWidth));
    });
  }, [image]);

  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { status },
      },
    } = result;

    if (status) {
      const photoId = `Photo:${id}`;

      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  const goToGallery = () => {
    navigation.navigate("Gallery", { id, username: user.username });
  };

  return (
    <Container>
      <TouchableOpacity onPress={goToGallery}>
        <Header>
          <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
          <Username>{user.username}</Username>
        </Header>
      </TouchableOpacity>
      <SImage
        resizeMode="cover"
        style={{ width: windowWidth, height: imageHeight }}
        source={{ uri: image }}
      />
      <Descriptions>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={25}
            />
          </Action>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comments")}
            hitSlop={{ top: 30, bottom: 20, left: 20, right: 20 }}
          >
            <Action>
              <Ionicons name={`chatbubble-outline`} color={"white"} size={25} />
            </Action>
          </TouchableOpacity>
        </Actions>
        <TouchableOpacity
          onPress={() => navigation.navigate("Likes", { photoId: id })}
        >
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={goToGallery}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </Descriptions>
      {fullView ? (
        <View>
          <Text style={{ color: "white" }}>Show all comments here</Text>
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>Show recent comments</Text>
        </View>
      )}
    </Container>
  );
};

export default Post;
