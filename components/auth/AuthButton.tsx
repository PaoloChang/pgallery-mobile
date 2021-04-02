import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import colors from "../../colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 12px 10px;
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 700;
`;

export default function AuthButton({
  onPress,
  disabled,
  text,
  loading,
}: {
  onPress: any;
  disabled: boolean;
  text: string;
  loading: any;
}) {
  return (
    <Button onPress={onPress} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
