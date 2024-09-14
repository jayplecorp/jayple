import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface AlertProps {
  children: React.ReactNode;
  severity: "error" | "success";
  containerStyles?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  severity,
  containerStyles,
}) => {
  return (
    <View
      className={`${containerStyles} ${
        severity === "error" ? "bg-red-950/60" : "bg-green-700/40"
      } p-5 mt-4 rounded flex flex-row items-center`}
    >
      <Ionicons
        name="information-circle-outline"
        color={severity === "error" ? "#de3e32" : "#00ae97"}
        size={25}
      />
      <Text className="text-gray-300 ml-3 text-[15px] font-semibold">
        {children}
      </Text>
    </View>
  );
};

export default Alert;
