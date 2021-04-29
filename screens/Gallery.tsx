import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT } from "../fragments";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import GalleryHeader from "../components/GalleryHeader";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMine
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

interface IHeader {
  username: string;
  avatar: string;
}

interface IPhoto {
  id: number;
  image: string;
}

interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  avatar: string;
  photos: Array<{
    id: number;
    image: string;
    likes: number;
    isLiked: boolean;
    commentNumber: number;
  }>;
  totalFollowing: number;
  totalFollowers: number;
  isMine: boolean;
  isFollowing: boolean;
}

interface ISeeProfile {
  seeProfile: IProfile;
}

type GalleryScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Gallery"
>;

type GalleryScreenRouteProp = RouteProp<SharedStackParamList, "Gallery">;

interface Props {
  navigation: GalleryScreenNavigationProp;
  route: GalleryScreenRouteProp;
}

const Gallery: React.FC<Props> = ({ navigation, route: { params } }) => {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { data, loading } = useQuery<ISeeProfile>(SEE_PROFILE_QUERY, {
    variables: {
      username: params.username,
    },
    onCompleted: (data) => {
      console.log("onCompleted");
      console.log(data);
    },
  });

  useEffect(() => {
    if (params.username) {
      navigation.setOptions({
        title: params.username,
      });
    }
  }, []);

  const ListHeaderComponent = () => (
    <GalleryHeader
      username={data ? data.seeProfile.username : params.username}
      avatar={data ? data.seeProfile.avatar : ""}
      bio={data ? data.seeProfile.bio : ""}
      totalFollowing={data ? data.seeProfile.totalFollowing : 0}
      totalFollowers={data ? data.seeProfile.totalFollowers : 0}
      isFollowing={data ? data.seeProfile.isFollowing : false}
      isMine={data ? data.seeProfile.isMine : false}
    />
  );

  const renderItem = ({ item: photo }: { item: IPhoto }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Photo", {
            photoId: photo.id,
          })
        }
      >
        <Image
          source={{ uri: photo.image }}
          style={{ height: width / numColumns, width: width / numColumns }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={data?.seeProfile.photos}
        renderItem={renderItem}
        keyExtractor={(photo) => photo.id.toString()}
        numColumns={numColumns}
        ListHeaderComponent={ListHeaderComponent}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default Gallery;
