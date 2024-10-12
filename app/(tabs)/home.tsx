import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryCard from "../../components/cards/categoryCard";
import SalonCard from "../../components/cards/salonCard";
import Container from "../../components/container";
import LoaderScreen from "../../components/loaderScreen";
import SalonSkeleton from "../../components/skeletons/salonSkeleton";
import ServiceSkeleton from "../../components/skeletons/serviceSkeleton";
import images from "../../constants/images";
import { useAuthContext } from "../../contexts/authContextProvider";
import { firestore } from "../../firebase/firebaseConfig";

const Home = () => {
  const { user, isLoading } = useAuthContext();
  const [services, setServices] = useState([]);
  const [isServicesLoading, setIsServicesLoading] = useState(false);
  const [salons, setSalons] = useState([]);
  const [isSalonsLoading, setIsSalonsLoading] = useState(false);

  const getSalons = async () => {
    try {
      setIsSalonsLoading(true);
      const salonQ = query(
        collection(firestore, "/users"),
        where("type", "==", "vendor"),
        where("isPublished", "==", true)
      );
      const salonDocs = await getDocs(salonQ);
      const salons = salonDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSalons(salons);
    } catch (error) {
      console.log("getSalons Error", error);
    } finally {
      setIsSalonsLoading(false);
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

  useEffect(() => {
    getSalons();
    getServices();
  }, []);

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

  return (
    <Container>
      <View className="p-5 pt-2">
        <View className="flex flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-accent text-lg font-psemibold">Welcome</Text>
            <Text className="text-gray-100 text-2xl font-psemibold">
              {user?.name ? (
                user.name + "!"
              ) : (
                <Text className="text-gray-400 animate-pulse">-----</Text>
              )}
            </Text>
          </View>

          <Image
            source={images.logo}
            className="w-[45px] h-[45px] rounded-full bg-gray-500/20"
          />
        </View>

        <TextInput
          className="flex-1 w-full h-14 px-4 bg-secondary rounded-md text-white font-psemibold text-base placeholder:text-gray-400"
          placeholder="Search"
          placeholderTextColor="#555658"
          onFocus={() => router.push("/search")}
        />

        <View className="flex flex-row pt-5 gap-3">
          <TouchableOpacity
            onPress={() => router.push("/search/men")}
            className="bg-secondary flex-1 items-center justify-center gap-2 py-4 rounded"
          >
            <Ionicons name="male" size={32} color="#555658" />
            <Text className="text-gray-100 text-xl font-psemibold">Men</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/search/women")}
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

          {isSalonsLoading ? (
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== "android" &&
                (({ highlighted }) => (
                  <View style={[highlighted && { marginLeft: 0 }]} />
                ))
              }
              horizontal={true}
              data={[1, 1, 1, 1]}
              renderItem={({ item, index, separators }) => (
                <SalonSkeleton key={index} styles="w-[230px]" />
              )}
            />
          ) : (
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== "android" &&
                (({ highlighted }) => (
                  <View style={[highlighted && { marginLeft: 0 }]} />
                ))
              }
              horizontal={true}
              data={salons}
              renderItem={({ item, index, separators }) => (
                <SalonCard
                  key={item.id}
                  salon={item}
                  styles="w-[230px]"
                  separators={separators}
                />
              )}
            />
          )}
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

          {isServicesLoading ? (
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== "android" &&
                (({ highlighted }) => (
                  <View style={[highlighted && { marginLeft: 0 }]} />
                ))
              }
              horizontal={true}
              data={[1, 1, 1, 1]}
              renderItem={({ item, index, separators }) => (
                <ServiceSkeleton key={index} styles="mr-3" />
              )}
            />
          ) : (
            <FlatList
              ItemSeparatorComponent={
                Platform.OS !== "android" &&
                (({ highlighted }) => (
                  <View style={[highlighted && { marginLeft: 0 }]} />
                ))
              }
              horizontal={true}
              data={services}
              renderItem={({ item, index, separators }) => (
                <CategoryCard
                  key={item.id}
                  category={item}
                  separators={separators}
                  styles="mr-3"
                />
              )}
            />
          )}
        </View>
      </View>
    </Container>
  );
};

export default Home;
