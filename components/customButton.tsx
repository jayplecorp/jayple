import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  containerStyle?: string;
  textStyle?: string;
  handlePress?: () => void;
  icon?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  handlePress,
  icon,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className={`h-[55px] bg-accent flex flex-row items-center justify-center w-full rounded ${containerStyle} ${
        disabled || isLoading ? "opacity-30" : ""
      }`}
      onPress={handlePress}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="mr-2"
        />
      )}

      {icon && (
        <Ionicons
          name={icon as any}
          color="#fff"
          size={28}
          style={{ marginRight: 4 }}
        />
      )}

      <Text className={`text-[18px] text-white font-semibold ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
