import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { View, Text, FlatList } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import { RouteProp } from "@react-navigation/core";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import ListSeparator from "../components/ListSeparator";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

interface IUser {
  id: number;
  username: string;
  avatar: string;
  isFollowing: boolean;
  isMine: boolean;
}

interface ISeePhotoLikes {
  seePhotoLikes: IUser[];
}

type LikesScreenRouteProp = RouteProp<SharedStackParamList, "Likes">;

type Props = {
  route: LikesScreenRouteProp;
};

const Likes: React.FC<Props> = ({ route: { params } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<ISeePhotoLikes>(LIKES_QUERY, {
    variables: {
      id: params.photoId,
    },
    skip: !params.photoId,
  });

  const renderUser = ({ item: user }: { item: IUser }) => {
    return <UserRow {...user} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUser}
        ItemSeparatorComponent={() => <ListSeparator />}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
};

export default Likes;
