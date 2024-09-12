import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  containerStyle?: string;
  textStyle?: string;
  handlePress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      className={`min-h-[55px] bg-accent flex items-center justify-center w-full rounded ${containerStyle}`}
      onPress={handlePress}
    >
      <Text className={`text-[18px] text-white font-semibold ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
