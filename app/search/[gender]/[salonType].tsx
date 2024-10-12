import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SalonCard from "../../../components/cards/salonCard";
import Container from "../../../components/container";
import SalonSkeleton from "../../../components/skeletons/salonSkeleton";
import { firestore } from "../../../firebase/firebaseConfig";

const SalonType = () => {
  const { gender, salonType } = useLocalSearchParams();
  const [salons, setSalons] = useState([]);
  const [isSalonsLoading, setIsSalonsLoading] = useState(true);

  const getFilteredSalons = async () => {
    try {
      const salonQ = query(
        collection(firestore, "/users"),
        where("type", "==", "vendor"),
        where("category", "==", salonType),
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

  useEffect(() => {
    getFilteredSalons();
  }, []);

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

        {isSalonsLoading ? (
          <View>
            {Array.from({ length: 2 }).map((_, i) => (
              <SalonSkeleton key={i} styles="w-full mt-5" />
            ))}
          </View>
        ) : (
          <>
            {salons.length > 0 ? (
              <View>
                {salons.map((salon) => (
                  <SalonCard
                    key={salon.id}
                    salon={salon}
                    styles="w-full mt-5"
                  />
                ))}
              </View>
            ) : (
              <View className="flex items-center justify-center h-[65vh]">
                <LottieView
                  source={require("../../../assets/images/no-result.json")}
                  autoPlay
                  loop
                  style={{ height: 250, width: 250 }}
                />
                <Text className="text-gray-400 font-psemibold text-xl">
                  No results found!
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </Container>
  );
};

export default SalonType;
