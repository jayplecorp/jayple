import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Container from "../../components/container";
import FormField from "../../components/formField";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthContext } from "../../contexts/authContextProvider";
import LoaderScreen from "../../components/loaderScreen";

const Home = () => {
  const { user, isLoading } = useAuthContext();
  const [searchQ, setSearchQ] = useState("");

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

  return (
    <Container>
      <View className="p-5">
        <Text className="text-gray-100 text-2xl font-psemibold mt-3 mb-4">
          Welcome, {user?.name}!
        </Text>
        <FormField
          placeholder="Search"
          value={searchQ}
          handleChangeText={(e) => setSearchQ(e)}
        />

        <View className="flex flex-row pt-5 gap-3">
          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="bg-secondary flex-1 items-center justify-center gap-2 py-4 rounded"
          >
            <Ionicons name="male" size={32} color="#555658" />
            <Text className="text-gray-100 text-xl font-psemibold">Men</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="bg-secondary flex-1 items-center justify-center gap-2 py-4 rounded"
          >
            <Ionicons name="female" size={32} color="#555658" />
            <Text className="text-gray-100 text-xl font-psemibold">Female</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Home;
