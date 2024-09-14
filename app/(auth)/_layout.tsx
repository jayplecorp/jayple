import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAuthContext } from "../../contexts/authContextProvider";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="add-phone" />
    </Stack>
  );
};

export default AuthLayout;
