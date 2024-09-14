import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import LayoutGradient from "../../components/layoutGradient";
import CustomButton from "../../components/customButton";
import { Link, Redirect, router } from "expo-router";
import Container from "../../components/container";
import FormField from "../../components/formField";
import { useAuthContext } from "../../contexts/authContextProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Alert from "../../components/alert";
import { FIREBASE_ERRORS } from "../../firebase/errors";

const ResetPassword = () => {
  const { isLoading: loadingUser, isAuthenticated } = useAuthContext();

  if (!loadingUser && isAuthenticated) return <Redirect href="/home" />;

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!email) return;

      if (error) setError("");
      if (success) setSuccess("");

      setIsLoading(true);

      await sendPasswordResetEmail(auth, email);

      setSuccess("Password reset email has been sent!");
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

        {(error || success) && (
          <Alert severity={error ? "error" : "success"}>
            {error
              ? FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS] ??
                "Error, Try again later!"
              : success}
          </Alert>
        )}

        <CustomButton
          title="Send Reset Email"
          containerStyle="mt-7"
          isLoading={isLoading}
          handlePress={() => handleResetPassword()}
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
