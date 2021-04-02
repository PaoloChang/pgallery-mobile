import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout, { onNextField } from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function LogIn({ navigation }: any) {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef(null);

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
    console.log(data);
  };

  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.5)"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
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
        disabled={true}
        loading
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
