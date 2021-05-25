import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import colors from "../../colors";
import useUser from "../../hooks/useUser";

const RoomContainer = styled.TouchableOpacity`
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;
const Username = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: white;
`;
// const LastMessage = styled.Text``;
const UnreadText = styled.Text`
  margin-top: 2px;
  font-weight: 500;
  color: white;
`;

type Prop = {
  id: number;
  users: {
    avatar: string;
    username: string;
  }[];
  unreadTotal: number;
};

const RoomItem: React.FC<Prop> = ({ id, users, unreadTotal }) => {
  const navigation = useNavigation();
  const { data: userData } = useUser();
  const opponent = users.find(
    (user) => user.username !== userData?.seeMe.username
  );

  const goToRoom = () => navigation.navigate("Room", { id, opponent });

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: opponent?.avatar }} />
        <Data>
          <Username>{opponent?.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
};

export default RoomItem;
