import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Container from "../../components/container";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SalonType = () => {
  const { gender } = useLocalSearchParams();

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
          </Text>
        </View>

        <View className="mt-6 flex items-center justify-center h-[70vh]">
          <View className="flex flex-row bg-secondary rounded-md p-2 mb-6">
            <Image
              source={{
                uri: "https://cdn.shopify.com/s/files/1/0013/3536/1603/files/Barber_Leaning_On_Barber_Chair.jpg",
              }}
              className="w-[150px] h-full rounded-md"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">
                Economical
              </Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Sai salon | Baba | MrCut | Vikram | Perfect Cut
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text className="bg-secondary-100 p-2 rounded-2xl text-white font-extrabold text-lg">
                  ₹
                </Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/${gender}/economical`)}
                >
                  <Ionicons name="arrow-forward" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row bg-secondary rounded-md p-2 mb-6">
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmAUgbhf1gMBnaWjQXU5_VTdAWu61V6K_cY8VPuSeSJ5JpLwzE2o3zN3CbNZh-OyYhpzA&usqp=CAU",
              }}
              className="w-[150px] h-full rounded-md"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">Prime</Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Top one | Thanvi | Academic singles | Fiona
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text className="bg-secondary-100 p-2 rounded-2xl text-white font-extrabold text-lg">
                  ₹₹
                </Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/${gender}/prime`)}
                >
                  <Ionicons name="arrow-forward" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row bg-secondary rounded-md p-2">
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-_JMKQWByzTxTh0INRsLSRiAcc0AN6et3_g&s",
              }}
              className="w-[150px] h-full rounded-md"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">Luxury</Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Naturals | Lakme | Green trends | Lo'real
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text className="bg-secondary-100 p-2 rounded-2xl text-white font-extrabold text-lg">
                  ₹₹₹
                </Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/${gender}/luxury`)}
                >
                  <Ionicons name="arrow-forward" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default SalonType;
