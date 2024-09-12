import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import LayoutGradient from "../../components/layoutGradient";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import Container from "../../components/container";
import FormField from "../../components/formField";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="relative justify-center h-full w-full p-5"
      >
        <LayoutGradient />

        <Text className="text-3xl text-white font-extrabold mb-4">
          Reset your password
        </Text>

        <FormField
          title="Email"
          value={email}
          handleChangeText={(e) => setEmail(e)}
          containerStyles="mt-4"
          placeholder="Your Email"
        />

        <CustomButton
          title="Send Reset Email"
          containerStyle="mt-7"
          handlePress={() => router.push("/home")}
        />

        <Link href="/sign-in" className="text-lg text-center mt-3 text-accent">
          Go back to Login
        </Link>

        <LayoutGradient isFooter />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ResetPassword;
