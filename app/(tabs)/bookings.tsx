import React from "react";
import { Text, View } from "react-native";
import Container from "../../components/container";
import LottieView from "lottie-react-native";

const Bookings = () => {
  return (
    <Container>
      <View className="p-5">
        <Text className="text-white font-psemibold text-2xl">My Bookings</Text>

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
      </View>
    </Container>
  );
};

export default Bookings;
