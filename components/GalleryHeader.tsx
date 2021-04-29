import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import AuthButton from "./auth/AuthButton";

const Container = styled.View``;
const UpperView = styled.View`
  display: flex;
  flex-direction: row;
`;
const Followers = styled.Text`
  color: white;
`;
const Following = styled.Text`
  color: white;
`;
const UnderView = styled.View`
  display: flex;
  flex-direction: column;
`;
const Biography = styled.Text`
  color: white;
`;
const Buttons = styled.View`
  flex-direction: row;
`;
const Avatar = styled.Image`
  margin-left: 10px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 150px;
`;
const Username = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: 400;
`;

interface Props {
  username: string;
  avatar: string;
  bio: string;
  totalFollowing: number;
  totalFollowers: number;
  isFollowing: boolean;
  isMine: boolean;
}

const GalleryHeader: React.FC<Props> = ({
  username,
  avatar,
  bio,
  totalFollowing,
  totalFollowers,
  isFollowing,
  isMine,
}) => {
  return (
    <Container>
      <UpperView>
        <Avatar source={{ uri: avatar }} />
        <Followers>{totalFollowers}</Followers>
        <Following>{totalFollowing}</Following>
      </UpperView>
      <UnderView>
        <Biography>{bio}</Biography>
        <Buttons></Buttons>
      </UnderView>
    </Container>
  );
};

export default GalleryHeader;
