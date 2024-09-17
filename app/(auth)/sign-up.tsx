import auth from "@react-native-firebase/auth";
import { Link, Redirect, router } from "expo-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Alert from "../../components/alert";
import Container from "../../components/container";
import CustomButton from "../../components/customButton";
import FormField from "../../components/formField";
import LayoutGradient from "../../components/layoutGradient";
import SocialButtons from "../../components/socialButtons";
import { useAuthContext } from "../../contexts/authContextProvider";
import { FIREBASE_ERRORS } from "../../firebase/errors";
import { firestore } from "../../firebase/firebaseConfig";

const SignUp = () => {
  const { isLoading: loadingUser, isAuthenticated } = useAuthContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      if (!form.email || !form.name || !form.password) return;

      if (error) setError("");

      setIsLoading(true);

      const { user } = await auth().createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      if (user) {
        await setDoc(doc(firestore, `/users/${user.uid}`), {
          name: form.name,
          email: form.email,
          type: "user",
          imageURL: "",
          createdAt: serverTimestamp(),
        });
      }

      router.push("/add-phone");
    } catch (error: any) {
      console.log("handleSignup Error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!loadingUser && isAuthenticated) return <Redirect href="/home" />;

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="relative justify-center h-full w-full p-5"
      >
        <LayoutGradient />

        <Text className="text-3xl text-center text-white font-extrabold mb-4">
          Signup to Jayple
        </Text>

        <SocialButtons />

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

        {error && (
          <Alert severity="error">
            {FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS] ??
              "Error, Try again later!"}
          </Alert>
        )}

        <CustomButton
          title="Signup"
          containerStyle="mt-7"
          isLoading={isLoading}
          handlePress={() => handleSignup()}
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
