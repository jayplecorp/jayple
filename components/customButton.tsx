import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  containerStyle?: string;
  textStyle?: string;
  handlePress?: () => void;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  handlePress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`min-h-[55px] bg-accent flex flex-row items-center justify-center w-full rounded ${containerStyle} disabled:bg-opacity-60`}
      onPress={handlePress}
      disabled={isLoading}
    >
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="mr-2"
        />
      )}

      <Text className={`text-[18px] text-white font-semibold ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
