import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout, { onNextField } from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      status
      token
      error
    }
  }
`;

export default function LogIn({ route: { params } }: any) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const passwordRef = useRef(null);
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      const {
        login: { status, token },
      } = data;
      if (status) {
        isLoggedInVar(true);
      }
    },
  });

  useEffect(() => {
    register("username", {
      required: true,
      minLength: {
        value: 6,
        message: "Username should be longer than 6 characters",
      },
    });
    register("password", {
      required: "Password is required",
    });
  }, [register]);

  const onValid = (data: any) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.5)"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={passwordRef}
        value={watch("password")}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        returnKeyType="done"
        lastInput={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
