import React from "react";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { FlatList } from "react-native";
import Post from "../components/Post";

const FEED_QUERY = gql`
  query seeFeeds {
    seeFeeds {
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

const Feed = ({ navigation }: any) => {
  const { data, loading } = useQuery(FEED_QUERY);
  console.log(data);

  const renderPhoto = ({ item: photo }: { item: IPhoto }) => {
    return <Post {...photo} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeFeeds}
        keyExtractor={(photo) => photo.id.toString()}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
};

export default Feed;
