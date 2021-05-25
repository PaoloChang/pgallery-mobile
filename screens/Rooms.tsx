import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import ListSeparator from "../components/ListSeparator";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";

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
const LastMessage = styled.Text``;
const UnreadText = styled.Text`
  margin-top: 2px;
  font-weight: 500;
  color: white;
`;

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

interface IRoom {
  id: number;
  unreadTotal: number;
  users: {
    avatar: string;
    username: string;
  }[];
  updatedAt: string;
}

interface ISeeRooms {
  seeRooms: IRoom[];
}

const Rooms = () => {
  const { data, loading } = useQuery<ISeeRooms>(SEE_ROOMS_QUERY);
  const { data: userData } = useUser();

  const renderRoom = ({ item: room }: { item: IRoom }) => {
    const opponent = room.users.find(
      (user) => user.username !== userData?.seeMe.username
    );
    return (
      <RoomContainer onPress={() => console.log(`Touched: ${room.id}`)}>
        <Column>
          <Avatar source={{ uri: opponent?.avatar }} />
          <Data>
            <Username>{opponent?.username}</Username>
            <UnreadText>
              {room.unreadTotal} unread{" "}
              {room.unreadTotal === 1 ? "message" : "messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room, index) => index.toString()}
        renderItem={renderRoom}
        ItemSeparatorComponent={() => <ListSeparator />}
      />
    </ScreenLayout>
  );
};

export default Rooms;
