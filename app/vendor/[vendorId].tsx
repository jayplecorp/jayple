import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import CategoryCard from "../../components/cards/categoryCard";
import LoaderScreen from "../../components/loaderScreen";
import ParallaxScrollView from "../../components/parallaxScrollView";
import { firestore } from "../../firebase/firebaseConfig";
import { UserData } from "../../types";
import ServiceSkeleton from "../../components/skeletons/serviceSkeleton";

const SalonScreen = () => {
  const { vendorId } = useLocalSearchParams();
  const [vendor, setVendor] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [isServicesLoading, setIsServicesLoading] = useState(false);

  const getVendor = async () => {
    try {
      const vendorRef = doc(firestore, `/users/${vendorId}`);
      const vendor = await getDoc(vendorRef);
      setVendor({ id: vendor.id, ...vendor.data() } as UserData);
    } catch (error) {
      console.log("getServices Error", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const vendorServicesIds = vendor?.services?.map((service) => service.id);
  const vendorServices = services?.filter((item) =>
    vendorServicesIds.includes(item.id)
  );

  useEffect(() => {
    getVendor();
    getServices();
  }, []);

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor="#121212"
      headerImage={
        <Image
          source={{ uri: vendor.cover }}
          className="absolute bottom-0 left-0 h-full w-full"
        />
      }
    >
      <View className="absolute top-[-70px] left-[38%] w-[140px] h-[140px] bg-black rounded-full flex items-center justify-center">
        <Image
          source={{ uri: vendor.imageURL }}
          className="w-[120px] h-[120px] rounded-full"
        />
      </View>
      <Text className="text-white font-semibold text-3xl mt-10">
        {vendor.name}
      </Text>

      <Text className="text-gray-400 text-[15px] mt-1">{vendor.bio}</Text>

      <View className="flex flex-row items-center mt-3">
        <Ionicons name="time" color="#ffffff" size={15} />
        <Text className="text-gray-400 ml-1 font-semibold">
          {vendor.startTime} - {vendor.endTime}
        </Text>
      </View>
      <View className="flex flex-row mt-1">
        <Ionicons name="location" color="#ffffff" size={15} />
        <Text className="text-gray-400 ml-1 font-semibold">
          {vendor.location}
        </Text>
      </View>

      <Text className="text-white font-semibold text-2xl mt-5">
        Our Services
      </Text>
      {isServicesLoading ? (
        <View className="flex flex-row flex-wrap justify-between mt-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <ServiceSkeleton key={i} isSalonPage />
          ))}
        </View>
      ) : (
        <View className="flex flex-row flex-wrap justify-between mt-3">
          {vendorServices.map((service) => (
            <CategoryCard
              key={service.id}
              category={service}
              isSalonPage
              servicePrice={
                vendor.services.find((item) => item.id === service.id)?.price
              }
            />
          ))}
        </View>
      )}
    </ParallaxScrollView>
  );
};

export default SalonScreen;
