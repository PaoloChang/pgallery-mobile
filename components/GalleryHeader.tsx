import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import AuthButton from "./auth/AuthButton";

const Container = styled.View``;
const UpperView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const Avatar = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin-right: 150px;
`;
const LabelWrapper = styled.View`
  flex-direction: column;
  align-items: center;
`;
const Indicator = styled.Text`
  font-size: 20px;
  color: white;
`;
const Label = styled.Text`
  font-size: 16px;
  color: white;
`;
const UnderView = styled.View`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Biography = styled.Text`
  color: white;
`;
const Buttons = styled.View`
  flex-direction: row;
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
        <LabelWrapper>
          <Indicator>{totalFollowers}</Indicator>
          <Label>Followers</Label>
        </LabelWrapper>
        <LabelWrapper>
          <Indicator>{totalFollowing}</Indicator>
          <Label>Following</Label>
        </LabelWrapper>
      </UpperView>
      <UnderView>
        <Biography>{bio}</Biography>
        <Buttons></Buttons>
      </UnderView>
    </Container>
  );
};

export default GalleryHeader;
