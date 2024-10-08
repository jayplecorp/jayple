import { Redirect, router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import Container from "../../components/container";
import CustomButton from "../../components/customButton";
import FormField from "../../components/formField";
import LayoutGradient from "../../components/layoutGradient";
import { useAuthContext } from "../../contexts/authContextProvider";
import { firestore } from "../../firebase/firebaseConfig";
import { UserData } from "../../types";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPhone = () => {
  const { user, setUser } = useAuthContext();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formFilled, setFormFilled] = useState(false);

  const handleAddPhoneNo = async () => {
    try {
      if (!phone) return;

      setIsLoading(true);

      if (!user) return;

      await updateDoc(doc(firestore, `/users/${user.id}`), {
        phoneNumber: phone,
      });

      const updatedUserDoc = await getDoc(doc(firestore, `/users/${user.id}`));
      setUser({ id: updatedUserDoc.id, ...updatedUserDoc.data() } as UserData);

      setFormFilled(true);
      router.push("/home");
    } catch (error) {
      console.log("handleAddPhoneNo Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!formFilled) {
          Alert.alert("Waring!", "Please complete fields before going back.");
          return true;
        } else {
          return false;
        }
      }
    );

    return () => backHandler.remove();
  }, [formFilled]);

  const { isLoading: loadingUser, isAuthenticated } = useAuthContext();
  if (!loadingUser && isAuthenticated && user?.phoneNumber)
    return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
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
      </ScrollView>

      <StatusBar backgroundColor="transparent" style="light" />
    </SafeAreaView>
  );
};

export default AddPhone;
