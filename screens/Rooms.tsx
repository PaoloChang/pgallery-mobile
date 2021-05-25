import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import ListSeparator from "../components/ListSeparator";
import RoomItem from "../components/rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragments";

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

  const renderRoom = ({ item: room }: { item: IRoom }) => {
    return <RoomItem {...room} />;
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
