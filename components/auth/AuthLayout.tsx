import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";
import Logo, { Size } from "../Logo";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0 40px;
`;

export const onNextField = (nextElement: any) => {
  nextElement?.current?.focus();
};

export default function AuthLayout({ children }: any) {
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
          style={{
            width: "100%",
          }}
        >
          <Logo size={Size.WELCOME}>PGallery</Logo>
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}
