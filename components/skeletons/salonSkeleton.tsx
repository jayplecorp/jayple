import { View, Text } from "react-native";
import React from "react";

const SalonSkeleton = ({ styles }: { styles: string }) => {
  return (
    <View className={`bg-secondary p-3 mr-3 rounded-md ${styles}`}>
      <View className="w-full h-[200px] rounded-md bg-secondary-100"></View>
      <View className="flex flex-row items-center mt-2">
        <Text className="text-accent uppercase font-semibold text-xs h-[25px] w-[50px] bg-secondary-100 opacity-30 mr-2"></Text>
        <Text className="text-gray-400 font-semibold text-xs h-[25px] w-[50px] bg-secondary-100 opacity-30"></Text>
      </View>
      <Text className="text-white font-semibold mt-1 text-lg bg-secondary-100 opacity-30"></Text>

      <View className="flex flex-row items-center mt-1">
        <Text className="text-gray-400 font-semibold h-[20px] w-[90px] bg-secondary-100 opacity-30"></Text>
      </View>

      <View className="flex flex-row items-center mt-2">
        <View className="bg-secondary-100 p-3 mr-2 rounded-md w-[50px] h-[50px] opacity-30"></View>
        <View className="bg-accent p-3 flex-1 flex items-center justify-center rounded-md opacity-30">
          <Text className="text-white font-bold text-lg">Book Now</Text>
        </View>
      </View>
    </View>
  );
};

export default SalonSkeleton;
