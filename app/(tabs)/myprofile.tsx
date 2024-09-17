import auth from "@react-native-firebase/auth";
import React from "react";
import { View } from "react-native";
import CustomButton from "../../components/customButton";

const Home = () => {
  return (
    <View className="flex flex-row items-center justify-center h-full w-full bg-primary">
      <CustomButton
        title="Logout"
        containerStyle="w-[250px]"
        handlePress={() => auth().signOut()}
      />
    </View>
  );
};

export default Home;
