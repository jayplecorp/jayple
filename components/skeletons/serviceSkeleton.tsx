import { View, Text } from "react-native";
import React from "react";

const ServiceSkeleton = ({
  isSalonPage,
  styles,
}: {
  isSalonPage?: boolean;
  styles?: string;
}) => {
  return (
    <View
      className={`bg-secondary rounded-md w-[48%] ${
        isSalonPage ? "h-[230px]" : "h-[200px]"
      } mb-4 ${styles}`}
    >
      <View className="h-[140px] w-full rounded-md bg-secondary-100"></View>
      <View className="p-3">
        <Text className="text-white font-semibold text-xl bg-secondary-100 opacity-30"></Text>

        {isSalonPage && (
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="text-accent text-xl font-psemibold w-[80px] h-[25px] bg-secondary-100 opacity-30"></Text>
            <View className="bg-accent w-[33px] h-[33px] flex items-center justify-center rounded-full border border-white/20 opacity-30"></View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceSkeleton;
