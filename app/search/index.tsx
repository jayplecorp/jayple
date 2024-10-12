import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import CategoryCard from "../../components/cards/categoryCard";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import ServiceSkeleton from "../../components/skeletons/serviceSkeleton";

const Search = () => {
  const [searchQ, setSearchQ] = useState("");
  const [services, setServices] = useState([]);
  const [isServicesLoading, setIsServicesLoading] = useState(false);

  const getServices = async () => {
    try {
      setIsServicesLoading(true);

      const servicesRef = collection(firestore, `/services`);
      const serviceDocs = await getDocs(servicesRef);
      const services = serviceDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(services);
    } catch (error) {
      console.log("getServices Error", error);
    } finally {
      setIsServicesLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Container>
      <View className="p-5 pt-2">
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

        {isServicesLoading ? (
          <View className="flex flex-row flex-wrap justify-between mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </View>
        ) : (
          <View className="flex flex-row flex-wrap justify-between mt-6">
            {services.map((service, index) => (
              <CategoryCard key={index} category={service} />
            ))}
          </View>
        )}
      </View>
    </Container>
  );
};

export default Search;
