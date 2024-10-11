import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import Container from "../../../components/container";
import { Ionicons } from "@expo/vector-icons";

const Create = () => {
  return (
    <Container>
      <View className="p-5 mb-8">
        <View className="flex flex-row items-center mb-4">
          <TouchableOpacity
            className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
            onPress={() => router.push("/admin")}
          >
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-psemibold text-2xl capitalize ml-2">
            Create
          </Text>
        </View>

        <View className="flex items-center justify-center">
          <View className="flex flex-row bg-secondary rounded-md p-2 mb-6">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/11/03/08/56/service-1019821_640.jpg",
              }}
              className="w-[150px] h-full rounded-md bg-secondary-100"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">Services</Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Create services for your vendors
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text></Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/admin/service/create`)}
                >
                  <Ionicons name="arrow-forward" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row bg-secondary rounded-md p-2 mb-6">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
              }}
              className="w-[150px] h-full rounded-md bg-secondary-100"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">User</Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Create your users
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text className="bg-secondary-100 p-2 rounded-2xl text-white font-extrabold text-lg">
                  !
                </Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/admin/user`)}
                  disabled
                >
                  <Ionicons name="arrow-forward" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row bg-secondary rounded-md p-2 mb-6">
            <Image
              source={{
                uri: "https://davidpressleyschool.com/wp-content/uploads/2023/08/bigstock-hairstylist-trimming-hair-of-t-438871286-1.jpg",
              }}
              className="w-[150px] h-full rounded-md bg-secondary-100"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">Vendors</Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Create account for salons and home services
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text className="bg-secondary-100 p-2 rounded-2xl text-white font-extrabold text-lg">
                  !!
                </Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/admin/vendor/create`)}
                >
                  <Ionicons name="arrow-forward" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row bg-secondary rounded-md p-2">
            <Image
              source={{
                uri: "https://www.betterteam.com/images/office-administrator-job-description-3750x2500-2020124.jpeg",
              }}
              className="w-[150px] h-full rounded-md bg-secondary-100"
            />
            <View className="flex flex-1 p-2">
              <Text className="text-white font-semibold text-xl">Admin</Text>
              <Text className="text-gray-400 font-semibold text-[15px]">
                Create admins and moderators
              </Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <Text className="bg-secondary-100 p-2 rounded-2xl text-white font-extrabold text-lg">
                  !!!
                </Text>

                <TouchableOpacity
                  className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                  onPress={() => router.push(`/admin/new`)}
                  disabled
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

export default Create;
