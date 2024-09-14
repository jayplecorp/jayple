import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import Container from "../../components/container";
import CustomButton from "../../components/customButton";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Home = () => {
  return (
    <View className="flex flex-row items-center justify-center h-full w-full bg-primary">
      <CustomButton
        title="Logout"
        containerStyle="w-[250px]"
        handlePress={() => signOut(auth)}
      />
    </View>
  );
};

export default Home;
