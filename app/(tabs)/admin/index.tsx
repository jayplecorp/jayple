import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../../components/container";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../../firebase/firebaseConfig";
import { placeHolderImg } from "../../../constants";

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const vendorQ = query(
      collection(firestore, "users"),
      where("type", "==", "vendor")
    );
    const unsubcribe = onSnapshot(vendorQ, (snapshot) => {
      const vendors = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVendors(vendors);
    });

    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <Container>
      <View className="p-5 pt-1 mb-8">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-white font-psemibold text-[30px] capitalize">
            Dashboard
          </Text>
          <TouchableOpacity
            className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
            onPress={() => router.push("/admin/create")}
          >
            <Ionicons name="add" size={33} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="mt-4 flex items-center justify-center">
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
                  onPress={() => router.push(`/admin/service`)}
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
        </View>

        <View className="mt-4">
          <Text className="text-2xl text-white font-semibold mb-3">
            Our Vendors
          </Text>

          {vendors.map((vendor) => (
            <View
              key={vendor.id}
              className="flex flex-row bg-secondary rounded-md p-2 mb-3"
            >
              <Image
                source={{
                  uri: vendor.imageURL ?? placeHolderImg,
                }}
                className="w-[150px] h-full rounded-md bg-secondary-100"
              />
              <View className="flex flex-1 p-2">
                <Text className="text-white font-semibold text-xl">
                  {vendor.name}
                </Text>
                <Text className="text-gray-400 font-semibold text-[15px]">
                  {vendor.street}
                </Text>

                <View className="flex flex-row items-center justify-between mt-4">
                  <Text></Text>

                  <TouchableOpacity
                    className="bg-accent w-[40px] h-[40px] rounded-full flex items-center justify-center"
                    onPress={() => router.push(`/admin/vendor/${vendor.id}`)}
                  >
                    <Ionicons name="arrow-forward" size={25} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default AdminDashboard;
