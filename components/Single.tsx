import React, { useEffect, useState } from "react";
import { useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";

const Container = styled.View``;
const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 54px;
`;
const UserAvatar = styled.Image`
  width: 40;
  height: 40;
  border-radius: 20;
  margin-right: 15px;
`;
const Username = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
const SImage = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Likes = styled.Text`
  color: white;
`;
const Caption = styled.View``;
const CaptionText = styled.Text`
  color: white;
`;

interface ISingle {
  id: number;
  user: {
    avatar: string;
    username: string;
  };
  caption: string;
  image: string;
  isLiked: boolean;
  likes: number;
}

type Props = {
  onPress(): void;
};

const Single: React.FC<ISingle> = ({
  id,
  user,
  caption,
  image,
  isLiked,
  likes,
}) => {
  const navigation = useNavigation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(windowHeight - 450);
  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setImageHeight(height / (width / windowWidth));
    });
  }, [image]);

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate("Gallery")}>
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
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      <Caption>
        <TouchableOpacity onPress={() => navigation.navigate("Gallery")}>
          <Username>{user.username}</Username>
        </TouchableOpacity>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
};

export default Single;
