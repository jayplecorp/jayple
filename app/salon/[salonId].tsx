import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import ParallaxScrollView from "../../components/parallaxScrollView";
import { categories, topratedSaloons } from "../../constants/data";
import CategoryCard from "../../components/cards/categoryCard";
import { Ionicons } from "@expo/vector-icons";

const SalonScreen = () => {
  const { salonId } = useLocalSearchParams();

  const salon = topratedSaloons[parseInt(salonId as string) - 1];
  const salonServices = categories.filter((item) =>
    salon.services.includes(item.id)
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor="#121212"
      headerImage={
        <Image
          source={{ uri: salon.shopImageURL }}
          className="absolute bottom-0 left-0 h-full w-full"
        />
      }
    >
      <Text className="text-white font-semibold text-3xl">
        {salon.shopName}
      </Text>

      <View className="flex flex-row items-center">
        <Ionicons name="time" color="#ffffff" size={15} />
        <Text className="text-gray-400 ml-1 font-semibold">
          {salon.startTime} - {salon.endTime}
        </Text>
      </View>

      <Text className="text-gray-400 text-[15px] mt-3">{salon.bio}</Text>

      <Text className="text-white font-semibold text-2xl mt-5">
        Our Services
      </Text>
      <View className="flex flex-row flex-wrap justify-between mt-3">
        {salonServices.map((service) => (
          <CategoryCard key={service.id} category={service} isSalonPage />
        ))}
      </View>
    </ParallaxScrollView>
  );
};

export default SalonScreen;
