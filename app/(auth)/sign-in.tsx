import { Link, router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Container from "../../components/container";
import CustomButton from "../../components/customButton";
import FormField from "../../components/formField";
import LayoutGradient from "../../components/layoutGradient";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="relative justify-center h-full w-full p-5"
      >
        <LayoutGradient invert />

        <Text className="text-3xl text-white font-extrabold mb-4">
          Login to Jayple
        </Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          containerStyles="mt-4"
          placeholder="Your Email"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          containerStyles="mt-4"
          placeholder="Your Password"
        />

        <CustomButton
          title="Login"
          containerStyle="mt-7"
          handlePress={() => router.push("/home")}
        />

        <Link
          href="/reset-password"
          className="text-lg text-center mt-2 text-accent"
        >
          Forgot password?
        </Link>

        <View className="flex justify-center pt-3 flex-row gap-2">
          <Text className="text-lg text-gray-400 font-regular">
            Don't have an account?
          </Text>
          <Link href="/sign-up" className="text-lg font-semibold text-accent">
            Signup
          </Link>
        </View>

        <LayoutGradient isFooter invert />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignIn;
