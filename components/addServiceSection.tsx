import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import FormField from "./formField";
import { Category, UserData } from "../types";
import CustomButton from "./customButton";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import CategoryCard from "./cards/categoryCard";

interface AddServiceSectionProps {
  services: Category[];
  vendor: UserData;
}

const AddServiceSection: React.FC<AddServiceSectionProps> = ({
  services,
  vendor,
}) => {
  const [serviceId, setServiceId] = useState("");
  const [showAddService, setShowAddService] = useState(false);
  const [servicePrice, setServicePrice] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addedServices, setAddedServices] = useState([]);

  const addService = async () => {
    try {
      setIsLoading(true);
      const vendorRef = doc(firestore, `/users/${vendor?.id}`);
      await updateDoc(vendorRef, {
        services: arrayUnion({
          id: serviceId,
          price: parseInt(servicePrice),
          duration: parseInt(duration),
        }),
      });
      setShowAddService(false);
    } catch (error) {
      console.log("addService Error", error);
    } finally {
      setIsLoading(false);
      setServiceId("");
      setServicePrice("");
      setDuration("");
    }
  };

  useEffect(() => {
    const addedServiceIds = vendor?.services?.map((service) => service.id);
    const addedServices = services.filter((item) =>
      addedServiceIds?.includes(item.id as string)
    );
    setAddedServices(addedServices);
  }, [showAddService, vendor, services]);

  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-white font-semibold text-[26px]">
          Add services
        </Text>
        <TouchableOpacity
          className="w-[35px] h-[35px] bg-accent flex items-center justify-center rounded-full"
          onPress={() => setShowAddService(!showAddService)}
        >
          <Ionicons name="add" color="#fff" size={28} />
        </TouchableOpacity>
      </View>

      {showAddService && (
        <View className="mt-5">
          <Picker
            selectedValue={serviceId}
            onValueChange={(itemValue, itemIndex) => setServiceId(itemValue)}
            style={{
              backgroundColor: "#121212",
              color: "#CDCDE0",
              borderRadius: 8,
            }}
            dropdownIconColor="#CDCDE0"
            itemStyle={{ backgroundColor: "#121212", color: "#CDCDE0" }}
          >
            <Picker.Item label="Select a service" value="" />
            {services.map((service) => (
              <Picker.Item
                key={service.id}
                label={service.serviceName}
                value={service.id}
              />
            ))}
          </Picker>

          {serviceId && (
            <>
              <FormField
                title="Service Price"
                value={servicePrice}
                handleChangeText={(e) => setServicePrice(e)}
                containerStyles="mt-3"
                placeholder="Your Service Price"
              />
              <FormField
                title="Duration (min)"
                value={duration}
                handleChangeText={(e) => setDuration(e)}
                containerStyles="mt-3"
                placeholder="Your Service Duration"
              />
              <CustomButton
                title="Add Service"
                containerStyle="mt-4"
                isLoading={isLoading}
                handlePress={addService}
              />
            </>
          )}
        </View>
      )}

      {addedServices.length > 0 ? (
        <View className="flex flex-row flex-wrap justify-between mt-5">
          {addedServices.map((service) => (
            <CategoryCard key={service.id} category={service} />
          ))}
        </View>
      ) : (
        <View className="flex items-center justify-center h-[200px]">
          <Ionicons name="sad" color="#fff" size={40} />
          <Text className="text-gray-400 text-2xl font-bold">
            No services found!
          </Text>
        </View>
      )}
    </View>
  );
};

export default AddServiceSection;
