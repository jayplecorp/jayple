import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Salon } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface SalonCardProps {
  salon: Salon;
  styles?: string;
  separators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: "leading" | "trailing", newProps: any) => void;
  };
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, styles, separators }) => {
  return (
    <TouchableHighlight
      key={salon.id}
      onPress={() => {}}
      onShowUnderlay={separators?.highlight ?? null}
      onHideUnderlay={separators?.unhighlight ?? null}
    >
      <View className={`bg-secondary p-3 mr-3 rounded-md ${styles}`}>
        <Image
          source={{ uri: salon.shopImageURL }}
          className="w-full h-[200px] rounded-md"
        />
        <View className="flex flex-row items-center mt-2">
          <Text className="text-accent uppercase font-semibold text-xs">
            {salon.shopStatus} |{" "}
          </Text>
          <Text className="text-gray-400 font-semibold text-xs">
            {salon.startTime} - {salon.endTime}
          </Text>
        </View>
        <Text className="text-white font-semibold mt-1 text-lg">
          {salon.shopName}
        </Text>

        <View className="flex flex-row items-center mt-2">
          <TouchableOpacity className="bg-secondary-100 p-3 mr-2 rounded-md">
            <Ionicons name="bookmark-outline" color="#fff" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-accent p-3 flex-1 flex items-center justify-center rounded-md"
            onPress={() => router.push(`/salon/${salon.id}`)}
          >
            <Text className="text-white font-bold text-lg">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SalonCard;