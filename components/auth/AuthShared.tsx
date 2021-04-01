import styled from "styled-components/native";

interface TextInput {
  lastInput?: boolean;
  autoCapitalize?: string;
}

export const TextInput = styled.TextInput<TextInput>`
  width: 100%;
  padding: 10px 5px;
  border-radius: 4px;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.15);
  margin-bottom: ${(props) => (props.lastInput ? "20" : "8")}px;
`;
