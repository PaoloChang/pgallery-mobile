import React from "react";
import styled from "styled-components/native";
import colors from "../../colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 10px 10px;
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
}: {
  onPress: any;
  disabled: boolean;
  text: string;
}) {
  return (
    <Button onPress={onPress} disabled={disabled}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
