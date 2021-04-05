import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout, { onNextField } from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      status
      error
    }
  }
`;

export default function CreateAccount({ navigation }: any) {
  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        const { username, password } = getValues();
        const {
          createAccount: { status },
        } = data;
        if (status) {
          navigation.navigate("LogIn", {
            username,
            password,
          });
        }
      },
    }
  );
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    register("firstName", {
      required: true,
    });
    register("lastName", {
      required: true,
    });
    register("username", {
      required: true,
      minLength: {
        value: 6,
        message: "Username should be longer than 6 characters",
      },
    });
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  const onValid = (data: any) => {
    console.log(data);
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />

      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />

      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.5)"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />

      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.5)"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />

      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        returnKeyType="done"
        lastInput={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />

      <AuthButton
        text="Create Account"
        disabled={
          !watch("firstName") ||
          !watch("email") ||
          !watch("username") ||
          !watch("password")
        }
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
