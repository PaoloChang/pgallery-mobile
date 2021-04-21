import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { View, Text, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/core";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import ScreenLayout from "../components/ScreenLayout";
import ListSeparator from "../components/ListSeparator";
import Comment from "../components/Comment";

const SEE_COMMENTS_QUERY = gql`
  query seeComments($photoId: Int!, $offset: Int) {
    seeComments(photoId: $photoId, offset: $offset) {
      id
      user {
        id
        username
        avatar
      }
      payload
      isMine
      createdAt
    }
  }
`;

interface IComment {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  payload: string;
  isMine: boolean;
  createdAt: string;
}

interface ISeeComments {
  seeComments: {
    id: number;
    user: {
      id: number;
      username: string;
      avatar: string;
    };
    payload: string;
    isMine: boolean;
    createdAt: string;
  }[];
}

type CommentsScreenRouteProp = RouteProp<SharedStackParamList, "Comments">;

type Props = {
  route: CommentsScreenRouteProp;
};

const Comments: React.FC<Props> = ({ route: { params } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(SEE_COMMENTS_QUERY, {
    variables: {
      photoId: params.photoId,
      offset: 0,
    },
  });

  useEffect(() => {
    refetch();
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderUser = ({ item: comment }: { item: IComment }) => {
    return <Comment {...comment} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seeComments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUser}
        ItemSeparatorComponent={() => <ListSeparator />}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
};

export default Comments;
