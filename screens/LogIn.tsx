import React, { useEffect, useRef } from "react";
import { RouteProp } from "@react-navigation/core";
import { LoggedOutStackParamList } from "../navigators/LoggedOutNav";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
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

type LogInScreenRouteProp = RouteProp<LoggedOutStackParamList, "LogIn">;

type Props = {
  route: LogInScreenRouteProp;
};

export default function LogIn({ route: { params } }: Props) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const passwordRef = useRef(null);
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      console.log(data);
      const {
        login: { status, token },
      } = data;
      if (status) {
        // isLoggedInVar(true);
        await logUserIn(token);
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
