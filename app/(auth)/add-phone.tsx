import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import Container from "../../components/container";
import CustomButton from "../../components/customButton";
import FormField from "../../components/formField";
import LayoutGradient from "../../components/layoutGradient";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../contexts/authContextProvider";

const AddPhone = () => {
  const { user } = useAuthContext();

  const { isLoading: loadingUser, isAuthenticated } = useAuthContext();
  if (!loadingUser && isAuthenticated && user?.phoneNumber)
    return <Redirect href="/home" />;

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPhoneNo = async () => {
    try {
      if (!phone) return;

      setIsLoading(true);

      if (!user) return;

      await updateDoc(doc(firestore, `/users/${user.id}`), {
        phoneNumber: phone,
      });

      setIsLoading(false);
      router.push("/home");
    } catch (error) {
      console.log("handleAddPhoneNo Error", error);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="relative justify-center h-full w-full p-5"
      >
        <LayoutGradient />

        <Text className="text-3xl text-white font-extrabold mb-4">
          Add your phone
        </Text>

        <FormField
          title="Phone"
          value={phone}
          handleChangeText={(e) => setPhone(e)}
          containerStyles="mt-4"
          placeholder="Your Phone Number"
        />

        <CustomButton
          title="Add Phone"
          containerStyle="mt-7"
          isLoading={isLoading}
          handlePress={() => handleAddPhoneNo()}
        />

        <LayoutGradient isFooter />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddPhone;
