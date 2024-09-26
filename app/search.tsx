import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Container from "../components/container";
import { categories } from "../constants/data";
import CategoryCard from "../components/cards/categoryCard";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const [searchQ, setSearchQ] = useState("");

  return (
    <Container>
      <View className="p-5">
        <View className="flex flex-row items-center mb-4">
          <TouchableOpacity
            className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-psemibold text-2xl capitalize ml-2">
            Search
          </Text>
        </View>

        <TextInput
          className="flex-1 w-full h-14 px-4 bg-secondary rounded-md text-white font-psemibold text-base placeholder:text-gray-400"
          placeholder="Search"
          placeholderTextColor="#555658"
          autoFocus
          value={searchQ}
          onChangeText={(e) => setSearchQ(e)}
        />

        <View className="flex flex-row flex-wrap justify-between mt-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </View>
      </View>
    </Container>
  );
};

export default Search;
