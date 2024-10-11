import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Container from "../../../../components/container";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import FormField from "../../../../components/formField";
import CustomButton from "../../../../components/customButton";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../../../../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const CreateService = () => {
  const [serviceImg, setServiceImg] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!res.canceled) {
      setServiceImg(res.assets[0].uri);
    }
  };

  const createService = async () => {
    try {
      if (!serviceImg || !serviceName) return;

      setIsLoading(true);

      const res = await fetch(serviceImg);
      const blob = await res.blob();

      const serviceDoc = await addDoc(collection(firestore, `/services`), {
        serviceName,
        createdAt: serverTimestamp(),
      });

      const storageRef = ref(storage, `/services/${serviceDoc.id}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(doc(firestore, `/services/${serviceDoc.id}`), {
        serviceImageURL: downloadURL,
      });

      router.push("/admin/service");
    } catch (error) {
      console.log("createService Error", error);
    } finally {
      setIsLoading(false);
      setServiceImg(null);
      setServiceName("");
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
            Create service
          </Text>
        </View>

        <View>
          <View className="w-full h-[230px] bg-secondary rounded p-4">
            <TouchableOpacity
              className={`w-full h-full ${
                !serviceImg ? "border border-dashed border-gray-400" : ""
              } flex items-center justify-center`}
              onPress={pickImage}
            >
              {serviceImg ? (
                <Image source={{ uri: serviceImg }} className="w-full h-full" />
              ) : (
                <>
                  <Ionicons name="cloud-upload" size={50} color="#fff" />
                  <Text className="text-white text-lg font-semibold">
                    Upload Image
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <FormField
            title="Service Name"
            value={serviceName}
            handleChangeText={(text) => setServiceName(text)}
            containerStyles="mt-4"
            placeholder="Your Service Name"
          />
          <CustomButton
            title="Create Service"
            containerStyle="mt-5 h-[50px]"
            handlePress={createService}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Container>
  );
};

export default CreateService;
