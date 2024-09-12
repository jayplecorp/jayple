import { router } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import images from "../constants/images";

const Onboaring = () => {
  return (
    <Container>
      <ImageBackground
        source={images.gradientBackdrop}
        imageStyle={{ opacity: 0.35 }}
      >
        <View className="flex items-center justify-center h-full w-full px-5">
          <Text className="text-3xl font-extrabold text-white mb-10">
            Jayple
          </Text>

          <Image
            source={images.onboaring}
            resizeMode="contain"
            className="w-full h-[250px]"
          />

          <Text className="text-2xl font-extrabold text-center text-gray-400 mt-2 mb-3">
            Book your salon services seemlessly with Jayple
          </Text>

          <Text className="text-[18px] font-semibold text-gray-500 text-center">
            Let Jayple connect you to the best salons, tailored to your style
            and preferences.
          </Text>

          <CustomButton
            containerStyle="mt-16"
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ImageBackground>
    </Container>
  );
};

export default Onboaring;
