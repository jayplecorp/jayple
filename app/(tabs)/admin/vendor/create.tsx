import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Container from "../../../../components/container";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../../../components/formField";
import { FIREBASE_ERRORS } from "../../../../firebase/errors";
import Alert from "../../../../components/alert";
import CustomButton from "../../../../components/customButton";
import axios from "axios";

const CreateVendor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    street: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateVendor = async () => {
    try {
      if (
        !form.email ||
        !form.name ||
        !form.password ||
        !form.phoneNumber ||
        !form.street ||
        !form.location
      )
        return;
      if (error) setError("");

      setIsLoading(true);

      await axios.post("http://192.168.183.235:5000/create-account", {
        name: form.name,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        street: form.street,
        location: form.location,
        type: "vendor",
      });

      router.push("/admin");
    } catch (error) {
      console.log("handleCreateVendor Error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <View className="p-5">
        <View className="flex flex-row items-center mb-4">
          <TouchableOpacity
            className="bg-secondary w-[40px] h-[40px] rounded-full flex items-center justify-center"
            onPress={() => router.push("/admin")}
          >
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white font-psemibold text-2xl capitalize ml-2">
            Create vendor
          </Text>
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
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            containerStyles="mt-4"
            placeholder="Shop Password"
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

          {error && (
            <Alert severity="error">
              {FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS] ??
                "Error, Try again later!"}
            </Alert>
          )}

          <CustomButton
            title="Create vendor"
            containerStyle="mt-7 mb-10"
            isLoading={isLoading}
            handlePress={() => handleCreateVendor()}
          />
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
};

export default CreateVendor;
