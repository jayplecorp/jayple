import React from "react";
import { ActivityIndicator, Dimensions, Platform, View } from "react-native";

const LoaderScreen = ({ isLoading }: { isLoading: boolean }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View
      className="absolute flex flex-row items-center justify-center h-full w-full bg-primary z-10"
      style={{ height: screenHeight }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={Platform.OS === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default LoaderScreen;
