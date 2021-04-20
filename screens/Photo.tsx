import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";
import { RouteProp } from "@react-navigation/core";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Post from "../components/Post";
import ScreenLayout from "../components/ScreenLayout";

const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;
// hashtags {
//   hashtag
// }

interface ISeePhoto {
  seePhoto: {
    id: number;
    user: {
      username: string;
      avatar: string;
    };
    caption: string;
    image: string;
    isLiked: boolean;
    likes: number;
  };
}
// hashtags: {
//   hashtag: string;
// }[];

type PhotoScreenRouteProp = RouteProp<SharedStackParamList, "Photo">;

type Props = {
  route: PhotoScreenRouteProp;
};

const Photo: React.FC<Props> = ({ route: { params } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<ISeePhoto>(SEE_PHOTO_QUERY, {
    variables: {
      id: params.photoId,
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{ flex: 1 }}
      >
        {data ? (
          <Post {...data.seePhoto} fullView={true} />
        ) : (
          <View>
            <Text>Error: cannot find photo</Text>
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Photo;
