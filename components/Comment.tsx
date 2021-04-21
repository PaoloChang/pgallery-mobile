import React, { useEffect } from "react";
import TabIcon from "../components/nav/TabIcon";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-right: 10px;
`;
const SComment = styled.Text`
  color: white;
`;
const Action = styled.TouchableOpacity`
  margin-left: 5px;
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      status
      error
    }
  }
`;

interface Props {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  payload: string;
  isMine: boolean;
  createdAt: string;
}

const Comment: React.FC<Props> = ({ id, user, payload, isMine, createdAt }) => {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
  });

  const removeComment = () => {
    deleteCommentMutation();
  };

  return (
    <Container>
      <Avatar source={{ uri: user.avatar }} />
      <Username>{user.username}</Username>
      <SComment>{payload}</SComment>
      {isMine ? (
        <Action onPress={removeComment}>
          <TabIcon iconName="close-circle" color="lightgray" focused={false} />
        </Action>
      ) : null}
    </Container>
  );
};

export default Comment;
