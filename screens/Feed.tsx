import React, { useEffect, useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { FlatList } from "react-native";
import Post from "../components/Post";

const FEED_QUERY = gql`
  query seeFeed($offset: Int) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

interface IPhoto {
  caption: string;
  commentNumber: number;
  comments: {
    createdAt: string;
    payload: string;
  }[];
  createdAt: string;
  id: number;
  image: string;
  isLiked: boolean;
  isMine: boolean;
  likes: number;
  user: {
    username: string;
    avatar: string;
  };
}

interface ISeeFeed {
  seeFeed: IPhoto[];
}

const Feed = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery<ISeeFeed>(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderPhoto = ({ item: photo }: { item: IPhoto }) => {
    return <Post {...photo} fullView={false} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        keyExtractor={(photo, index) => index.toString()}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
};

export default Feed;
