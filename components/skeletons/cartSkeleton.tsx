import { View, Text } from "react-native";
import React from "react";

const CartSkeleton = () => {
  return (
    <View className="p-3 bg-secondary w-full rounded-md mb-4">
      <View className="flex flex-row">
        <View className="w-[100px] h-[100px] rounded-md mr-2 bg-secondary-100"></View>

        <View className="flex-1">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-white text-2xl font-bold bg-secondary-100 opacity-30 w-[90px] h-[25px]"></Text>

            <View className="bg-secondary-100 w-[30px] h-[30px] flex items-center justify-center rounded-full"></View>
          </View>

          <Text className="text-gray-400 text-lg font-bold bg-secondary-100 opacity-30 mt-1 mb-1"></Text>
          <Text className="text-gray-400 text-lg font-bold bg-secondary-100 opacity-30"></Text>
        </View>
      </View>

      <View className="mt-2">
        <Text className="text-white text-xl font-semibold bg-secondary-100 opacity-30"></Text>
        <View className="flex flex-row items-center justify-between mt-1">
          <Text className="text-gray-400 text-lg font-bold w-[120px] h-[20px] bg-secondary-100 opacity-30"></Text>
          <Text className="text-gray-400 text-lg font-bold w-[70px] h-[20px] bg-secondary-100 opacity-30"></Text>
        </View>

        <View className="flex flex-row items-center justify-between mt-1">
          <Text className="text-gray-400 text-lg font-bold w-[120px] h-[20px] bg-secondary-100 opacity-30"></Text>
          <Text className="text-gray-400 text-lg font-bold w-[70px] h-[20px] bg-secondary-100 opacity-30"></Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-1">
          <Text className="text-white text-xl font-bold w-[120px] h-[20px] bg-secondary-100 opacity-30"></Text>
          <Text className="text-accent text-xl font-bold w-[70px] h-[20px] bg-secondary-100 opacity-30"></Text>
        </View>
      </View>

      <View className="bg-accent flex items-center justify-center p-3 rounded-md mt-3 opacity-30">
        <Text className="text-white text-lg font-bold">Book Now</Text>
      </View>
    </View>
  );
};

export default CartSkeleton;
