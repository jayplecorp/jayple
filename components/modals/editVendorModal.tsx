import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../customButton";
import FormField from "../formField";
import { UserData } from "../../types";
import axios from "axios";

interface EditVendorModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  vendor: UserData;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({
  modalVisible,
  setModalVisible,
  vendor,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEditVendor = async () => {
    try {
      setIsLoading(true);

      await axios.post("http://192.168.141.235:5000/edit-account", {
        userId: vendor?.id,
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        street: form.street,
        location: form.location,
      });

      setModalVisible(false);
    } catch (error) {
      console.log("handleEditVendor Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setForm(() => ({
      name: vendor.name,
      email: vendor.email,
      phoneNumber: vendor.phoneNumber,
      street: vendor?.street,
      location: vendor?.location,
    }));
  }, [vendor]);

  return (
    <View className="flex-1 items-center justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 bg-primary p-5">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-white font-psemibold text-2xl capitalize ml-2">
              Vendor Details
            </Text>
            <TouchableOpacity
              className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={25} color="#fff" />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            className="flex-1"
          >
            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              placeholder="Shop Name"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              containerStyles="mt-4"
              placeholder="Shop Email"
            />
            <FormField
              title="Phone Number"
              value={form.phoneNumber}
              handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
              containerStyles="mt-4"
              placeholder="Shop Phone No."
            />
            <FormField
              title="Street Name"
              value={form.street}
              handleChangeText={(e) => setForm({ ...form, street: e })}
              containerStyles="mt-4"
              placeholder="Shop Street"
              textarea={true}
            />
            <FormField
              title="Full Address"
              value={form.location}
              handleChangeText={(e) => setForm({ ...form, location: e })}
              containerStyles="mt-4"
              placeholder="Shop location"
              textarea={true}
            />

            <CustomButton
              title="Create vendor"
              containerStyle="mt-7 mb-10"
              isLoading={isLoading}
              handlePress={() => handleEditVendor()}
            />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default EditVendorModal;
