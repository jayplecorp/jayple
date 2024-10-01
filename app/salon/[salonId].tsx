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
      <View className="absolute top-[-70px] left-[38%] w-[140px] h-[140px] bg-black rounded-full flex items-center justify-center">
        <Image
          source={{ uri: salon.shopLogo }}
          className="w-[120px] h-[120px] rounded-full"
        />
      </View>
      <Text className="text-white font-semibold text-3xl mt-10">
        {salon.shopName}
      </Text>

      <Text className="text-gray-400 text-[15px] mt-1">{salon.bio}</Text>

      <View className="flex flex-row items-center mt-3">
        <Ionicons name="time" color="#ffffff" size={15} />
        <Text className="text-gray-400 ml-1 font-semibold">
          {salon.startTime} - {salon.endTime}
        </Text>
      </View>
      <View className="flex flex-row mt-1">
        <Ionicons name="location" color="#ffffff" size={15} />
        <Text className="text-gray-400 ml-1 font-semibold">
          {salon.location}
        </Text>
      </View>

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
