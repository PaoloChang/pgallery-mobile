import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { MessageStackParamList } from "../navigators/MessagesNav";
import React, { useEffect } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import { Ionicons } from "@expo/vector-icons";

type IMessageContainer = {
  isMine: boolean;
};
const MessageContainer = styled.View<IMessageContainer>`
  padding: 5px 0px;
  flex-direction: ${(props) =>
    props.isMine === false ? "row" : "row-reverse"};
  align-items: center;
`;
const Author = styled.View`
  margin: 0px 10px;
`;
const Avatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;
const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
`;
const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 10px;
`;
const ChatInput = styled.TextInput`
  width: 88%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 10px 20px;
  border-radius: 18px;
`;
const SendBtn = styled.TouchableOpacity`
  margin-left: 7px;
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          avatar
          username
        }
        read
        isMine
      }
    }
  }
`;

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        avatar
        username
      }
      read
      isMine
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      status
      id
    }
  }
`;

interface IMessage {
  id: number;
  user: {
    avatar: string;
    username: string;
  };
  payload: string;
  read: boolean;
  isMine: boolean;
}

interface ISeeRoom {
  seeRoom: {
    messages: IMessage[];
  };
}

type RoomScreenNavigationProp = StackNavigationProp<
  MessageStackParamList,
  "Room"
>;

type RoomRouteProp = RouteProp<MessageStackParamList, "Room">;

type Props = {
  navigation: RoomScreenNavigationProp;
  route: RoomRouteProp;
};

const Room: React.FC<Props> = ({ navigation, route }) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const { data, loading, subscribeToMore } = useQuery<ISeeRoom>(ROOM_QUERY, {
    variables: { id: route.params.id },
  });
  const { data: userData } = useUser();
  const [sendMessageMutation, { loading: messageLoading }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: (cache, result) => {
        const {
          data: {
            sendMessage: { status, id },
          },
        } = result;
        if (status && userData) {
          const { message } = getValues();
          const newMessage = {
            __typename: "Message",
            id,
            payload: message,
            user: {
              avatar: userData.seeMe.avatar,
              username: userData.seeMe.username,
            },
            read: true,
            isMine: true,
          };
          const messageFragment = cache.writeFragment({
            fragment: gql`
              fragment NewMessage on Message {
                id
                payload
                user {
                  avatar
                  username
                }
                read
                isMine
              }
            `,
            data: newMessage,
          });
          cache.modify({
            id: `Room:${route.params.id}`,
            fields: {
              messages(prev) {
                return [...prev, messageFragment];
              },
            },
          });
        }
      },
      onCompleted: (data) => {
        setValue("message", "");
      },
      onError: (err) => console.log(`Error: ${err}`),
    }
  );

  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: {
          id: route.params.id,
        },
        onError: (e) => console.log(e),
      });
    }
  });

  useEffect(() => {
    navigation.setOptions({
      title: `Conversation with ${route.params.opponent.username}`,
    });
  }, []);

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  const renderItem = ({ item: message }: { item: IMessage }) => {
    return (
      <MessageContainer isMine={message.isMine}>
        <Author>
          <Avatar source={{ uri: message.user.avatar }} />
        </Author>
        <Message>{message.payload}</Message>
      </MessageContainer>
    );
  };

  const onValid = ({ message }: { message: string }) => {
    if (!messageLoading && userData) {
      Keyboard.dismiss();
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route.params.id,
        },
      });
    }
  };

  const messages = [...(data?.seeRoom.messages ?? [])];
  messages.reverse();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={40}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          data={messages}
          keyExtractor={(message, index) => index.toString()}
          renderItem={renderItem}
          inverted
          // showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        />
        <InputContainer>
          <ChatInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Write a message.."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            value={watch("message")}
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
          <SendBtn
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message"))
                  ? "rgba(255, 255, 255, 0.5)"
                  : "white"
              }
              size={30}
            />
          </SendBtn>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};

export default Room;
