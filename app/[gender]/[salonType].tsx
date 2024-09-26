import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Container from "../../components/container";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { topratedSaloons } from "../../constants/data";
import SalonCard from "../../components/cards/salonCard";
import LottieView from "lottie-react-native";

const SalonType = () => {
  const { gender, salonType } = useLocalSearchParams();

  const filteredSalons = topratedSaloons.filter(
    (item) => item.type === salonType
  );

  return (
    <Container>
      <View className="p-5">
        <View className="flex flex-row items-center">
          <TouchableOpacity
            className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-psemibold text-2xl capitalize ml-2">
            {gender}
            {` > `}
            {salonType}
          </Text>
        </View>

        {filteredSalons.length > 0 ? (
          <View>
            {filteredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} styles="w-full mt-5" />
            ))}
          </View>
        ) : (
          <View className="flex items-center justify-center h-[65vh]">
            <LottieView
              source={require("../../assets/images/no-result.json")}
              autoPlay
              loop
              style={{ height: 250, width: 250 }}
            />
            <Text className="text-gray-400 font-psemibold text-xl">
              No results found!
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default SalonType;
