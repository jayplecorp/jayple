import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SalonCard from "../../components/cards/salonCard";
import Container from "../../components/container";
import LoaderScreen from "../../components/loaderScreen";
import { categories, topratedSaloons } from "../../constants/data";
import { useAuthContext } from "../../contexts/authContextProvider";
import CategoryCard from "../../components/cards/categoryCard";

const Home = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

  return (
    <Container>
      <View className="p-5">
        <Text className="text-gray-100 text-2xl font-psemibold mt-3 mb-4">
          Welcome,{" "}
          {user?.name ? (
            user.name + "!"
          ) : (
            <Text className="text-gray-400 animate-pulse">-----</Text>
          )}
        </Text>
        <TextInput
          className="flex-1 w-full h-14 px-4 bg-secondary rounded-md text-white font-psemibold text-base placeholder:text-gray-400"
          placeholder="Search"
          placeholderTextColor="#555658"
          onFocus={() => router.push("/search")}
        />

        <View className="flex flex-row pt-5 gap-3">
          <TouchableOpacity
            onPress={() => router.push("/men")}
            className="bg-secondary flex-1 items-center justify-center gap-2 py-4 rounded"
          >
            <Ionicons name="male" size={32} color="#555658" />
            <Text className="text-gray-100 text-xl font-psemibold">Men</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/women")}
            className="bg-secondary flex-1 items-center justify-center gap-2 py-4 rounded"
          >
            <Ionicons name="female" size={32} color="#555658" />
            <Text className="text-gray-100 text-xl font-psemibold">Women</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <Text className="text-gray-400 text-xl font-semibold mb-5">
            Special Offers
          </Text>
          <View className="relative">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2020/05/14/12/37/barber-5194406_1280.jpg",
              }}
              className="w-full h-[180px] rounded-md"
            />
            <View className="absolute h-full w-full top-0 left-0 bg-black/60">
              <View className="p-8">
                <Text className="text-white text-lg">Haircut</Text>
                <Text className="text-white text-3xl font-bold">20% Off</Text>
                <TouchableOpacity className="bg-white w-[140px] p-1 px-2 rounded-full flex flex-row items-center mt-6">
                  <Text className="flex-1 font-psemibold text-[15px] ml-1">
                    Get Offer
                  </Text>
                  <View className="bg-accent w-[30px] h-[30px] flex items-center justify-center rounded-full">
                    <Ionicons name="arrow-forward" color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-gray-400 text-xl font-semibold mb-5">
            Top-rated Saloons
          </Text>

          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== "android" &&
              (({ highlighted }) => (
                <View style={[highlighted && { marginLeft: 0 }]} />
              ))
            }
            horizontal={true}
            data={topratedSaloons}
            renderItem={({ item, index, separators }) => (
              <SalonCard
                key={item.id}
                salon={item}
                styles="w-[230px]"
                separators={separators}
              />
            )}
          />
        </View>

        <View className="mt-5">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-gray-400 text-xl font-semibold">
              Services
            </Text>
            <TouchableOpacity
              className="bg-secondary w-[35px] h-[35px] rounded-full flex items-center justify-center"
              onPress={() => router.push("/search")}
            >
              <Ionicons name="arrow-forward" color="#DB4437" size={22} />
            </TouchableOpacity>
          </View>

          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== "android" &&
              (({ highlighted }) => (
                <View style={[highlighted && { marginLeft: 0 }]} />
              ))
            }
            horizontal={true}
            data={categories}
            renderItem={({ item, index, separators }) => (
              <CategoryCard
                key={item.id}
                category={item}
                separators={separators}
                styles="mr-3"
              />
            )}
          />
        </View>
      </View>
    </Container>
  );
};

export default Home;
