import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface FormFieldProps {
  containerStyles?: string;
  title?: string;
  value: string;
  handleChangeText: (e: any) => void;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  containerStyles,
  title,
  value,
  handleChangeText,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      {title && (
        <Text className="text-base text-gray-100 font-medium">{title}</Text>
      )}

      <View className="w-full h-14 px-4 bg-secondary rounded-md focus:border-accent flex flex-row items-center">
        <TextInput
          className="flex-1 h-full text-white font-psemibold text-base placeholder:text-gray-400"
          placeholder={placeholder}
          placeholderTextColor="#555658"
          value={value}
          onChangeText={handleChangeText}
          keyboardType={title === "Email" ? "email-address" : "default"}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="w-[40px] h-[30px] flex items-center justify-center"
          >
            {!showPassword ? (
              <Ionicons name="eye" size={25} color="#555658" />
            ) : (
              <Ionicons name="eye-off" size={25} color="#555658" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
