import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const NoResult = () => {
  return (
    <View className="flex items-center justify-center h-[65vh]">
      <LottieView
        source={require("../../assets/images/no-result.json")}
        autoPlay
        loop
        style={{ height: 250, width: 250 }}
      />
      <Text className="text-gray-400 font-psemibold text-xl">
        No booking found!
      </Text>
    </View>
  );
};

export default NoResult;
