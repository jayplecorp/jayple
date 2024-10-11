import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../../components/container";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebaseConfig";
import CategoryCard from "../../../../components/cards/categoryCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const serviceDocRef = collection(firestore, `/services`);
    const unsubscribe = onSnapshot(serviceDocRef, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(services);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <View className="p-5">
        <View className="flex flex-row items-center justify-between mb-4">
          <View className="flex flex-row items-center">
            <TouchableOpacity
              className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
              onPress={() => router.push("/admin")}
            >
              <Ionicons name="arrow-back" size={25} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white font-psemibold text-2xl capitalize ml-2">
              Services
            </Text>
          </View>
          <TouchableOpacity
            className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
            onPress={() => router.push("/admin/service/create")}
          >
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row flex-wrap justify-between mt-4">
          {services.map((service) => (
            <CategoryCard key={service.id} category={service} />
          ))}
        </View>
      </View>
    </Container>
  );
};

export default Services;
