import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout, { onNextField } from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    register("firstName");
    register("lastName");
    register("username");
    register("email");
    register("password");
  }, [register]);

  const onValid = (data: any) => {
    console.log(data);
  };

  const onFinish = () => {
    alert("done");
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

      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
