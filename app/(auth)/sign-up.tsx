import { Link, router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import Container from "../../components/container";
import CustomButton from "../../components/customButton";
import FormField from "../../components/formField";
import LayoutGradient from "../../components/layoutGradient";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        className="relative justify-center h-screen w-full p-5"
      >
        <LayoutGradient />

        <Text className="text-3xl text-white font-extrabold mb-4">
          Signup to Jayple
        </Text>

        <FormField
          title="Name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
          containerStyles="mt-4"
          placeholder="Your Name"
        />
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
          title="Signup"
          containerStyle="mt-7"
          handlePress={() => router.push("/home")}
        />

        <View className="flex justify-center pt-3 flex-row gap-2">
          <Text className="text-lg text-gray-400 font-regular">
            Already have an account?
          </Text>
          <Link href="/sign-in" className="text-lg font-semibold text-accent">
            Login
          </Link>
        </View>

        <LayoutGradient isFooter />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;
