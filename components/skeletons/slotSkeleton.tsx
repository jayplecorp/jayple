import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SlotSkeleton = () => {
  return (
    <TouchableOpacity
      className={`bg-secondary-100 opacity-30 mr-2 mb-3 p-3 rounded-md w-[30%]`}
    >
      <Text className="text-white text-lg"></Text>
    </TouchableOpacity>
  );
};

export default SlotSkeleton;
