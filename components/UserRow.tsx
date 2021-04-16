import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
const FollowButton = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 10px 20px;
  border-radius: 7px;
`;
const FollowButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

interface Props {
  id: number;
  username: string;
  avatar: string;
  isFollowing: boolean;
  isMine: boolean;
}

const UserRow: React.FC<Props> = ({
  id,
  username,
  avatar,
  isFollowing,
  isMine,
}) => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Gallery", { id, username })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMine ? (
        <FollowButton>
          <FollowButtonText>
            {isFollowing ? "Unfollow" : "Follow"}
          </FollowButtonText>
        </FollowButton>
      ) : null}
    </Wrapper>
  );
};

export default UserRow;
