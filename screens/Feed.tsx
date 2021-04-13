import React, { useEffect, useState } from "react";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { FlatList } from "react-native";
import Post from "../components/Post";

const FEED_QUERY = gql`
  query seeFeeds($offset: Int) {
    seeFeeds(offset: $offset) {
      ...PhotoFragment
      user {
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
  seeFeeds: IPhoto[];
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
    return <Post {...photo} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.18}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeeds.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        data={data?.seeFeeds}
        keyExtractor={(photo, index) => photo.id.toString()}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
};

export default Feed;
