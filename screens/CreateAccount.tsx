import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onNextField = (nextElement: any) => {
    nextElement?.current?.focus();
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
      />

      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="rgba(255,255,255,0.5)"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(usernameRef)}
      />

      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.5)"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(emailRef)}
      />

      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.5)"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNextField(passwordRef)}
      />

      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.5)"
        secureTextEntry
        returnKeyType="done"
        lastInput={true}
        onSubmitEditing={() => onFinish()}
      />

      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
