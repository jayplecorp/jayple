import { View, Text } from "react-native";
import React from "react";
import Container from "../../components/container";
import LottieView from "lottie-react-native";

const Cart = () => {
  return (
    <Container>
      <View className="p-5">
        <Text className="text-white font-psemibold text-2xl">My Cart</Text>

        <View className="flex items-center justify-center h-[65vh]">
          <LottieView
            source={require("../../assets/images/no-result.json")}
            autoPlay
            loop
            style={{ height: 250, width: 250 }}
          />
          <Text className="text-gray-400 font-psemibold text-xl">
            No items in the cart!
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default Cart;
