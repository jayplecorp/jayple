import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { firestore } from "../firebase/firebaseConfig";

const SocialButtons = () => {
  GoogleSignin.configure({
    webClientId:
      "873957741068-hnv4j9ehovp2u2cr2h1jv2ced18ss529.apps.googleusercontent.com",
  });

  const [isLoading, setisLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setisLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {
        data: { idToken },
      } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { user } = await auth().signInWithCredential(googleCredential);

      const userRef = doc(firestore, `/users/${user.uid}`);
      const userData = await getDoc(userRef);

      if (user) {
        if (userData.exists()) {
          router.push("/home");
        } else {
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            type: "user",
            imageURL: user.photoURL,
            createdAt: serverTimestamp(),
          });

          router.push("/add-phone");
        }
      }
    } catch (error) {
      console.log("handleGoogleAuth Error", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <View className="flex items-center justify-center">
      <TouchableOpacity
        className="bg-secondary rounded-md flex flex-row items-center justify-center mr-4 p-3"
        onPress={() => handleGoogleAuth()}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size={30} animating={isLoading} />
        ) : (
          <Ionicons name="logo-google" size={30} color="#b2b2b2" />
        )}
        <Text className="text-gray-100 font-psemibold ml-2 text-[17px]">
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;
