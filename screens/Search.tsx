import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  Image,
} from "react-native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBar = styled.TextInput<ISearchBar>`
  background-color: rgba(255, 255, 255, 1);
  padding: 7px 10px;
  border-radius: 7px;
  width: ${(props) => props.width / 1.5};
`;
const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  color: white;
  font-weight: 600;
`;

const SEARCH_PHOTOS_QUERY = gql`
  query searchPhotos($keyword: String!, $offset: Int) {
    searchPhotos(keyword: $keyword, offset: $offset) {
      id
      image
    }
  }
`;

interface IPhoto {
  id: number;
  image: string;
}

interface ISearchPhotos {
  searchPhotos: {
    id: number;
    image: string;
  }[];
}

interface ISearchBar {
  width: number;
}

type SearchScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Search"
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

const Search: React.FC<Props> = ({ navigation }) => {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [
    startQueryFunc,
    { loading, data, called },
  ] = useLazyQuery<ISearchPhotos>(SEARCH_PHOTOS_QUERY, {
    onCompleted: (data) => {
      console.log(`Search / onCompleted / data: ${JSON.stringify(data)}`);
    },
    onError: (e) => {
      console.log(`Search / onError / e: ${e}`);
    },
  });

  const onValid = (data: any) => {
    console.log(`Search / onValid / data: ${JSON.stringify(data)}`);
    startQueryFunc({
      variables: {
        ...data,
      },
    });
  };

  const SearchBox = () => (
    <SearchBar
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search photos"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 2,
    });
  }, []);

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
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        {loading ? (
          <MessageContainer>
            <ActivityIndicator />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword...</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data.searchPhotos.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data.searchPhotos}
              keyExtractor={(photo) => photo.id.toString()}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
