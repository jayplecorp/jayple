import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AddServiceSection from "../../../../components/addServiceSection";
import Container from "../../../../components/container";
import LoaderScreen from "../../../../components/loaderScreen";
import { placeHolderImg } from "../../../../constants";
import { firestore, storage } from "../../../../firebase/firebaseConfig";
import { UserData } from "../../../../types";
import EditVendorModal from "../../../../components/modals/editVendorModal";
import { Picker } from "@react-native-picker/picker";
import FormField from "../../../../components/formField";
import VendorBasicInfo from "../../../../components/vendorBasicInfo";
import CustomButton from "../../../../components/customButton";

const VendorDetails = () => {
  const { vendorId } = useLocalSearchParams();
  const [vendor, setVendor] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    bio: "",
    category: "",
    startTime: "",
    endTime: "",
  });
  const [services, setServices] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const getServices = async () => {
    try {
      const serviceRef = collection(firestore, "/services");
      const serviceDocs = await getDocs(serviceRef);
      const services = serviceDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(services);
    } catch (error) {
      console.log("getService Error", error);
    }
  };

  const pickImageAndUpload = async (type: "image" | "cover") => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!res.canceled) {
      const vendorImg = res.assets[0].uri;
      const imgRes = await fetch(vendorImg);
      const blob = await imgRes.blob();

      const storageRef = ref(storage, `/users/${vendor?.id}/${type}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      if (type === "image") {
        await updateDoc(doc(firestore, `/users/${vendor?.id}`), {
          imageURL: downloadURL,
        });
      } else {
        await updateDoc(doc(firestore, `/users/${vendor?.id}`), {
          cover: downloadURL,
        });
      }
    }
  };

  const publishVendor = async () => {
    try {
      setIsPublishing(true);

      const vendorRef = doc(firestore, `/users/${vendor?.id}`);
      await updateDoc(vendorRef, {
        isPublished: !vendor?.isPublished,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log("publishVendor Error", error);
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    const vendorRef = doc(firestore, `/users/${vendorId}`);

    const unsubcribe = onSnapshot(vendorRef, (snapshot) => {
      setVendor({ id: snapshot.id, ...snapshot.data() } as UserData);
      setIsLoading(false);
    });

    return () => {
      unsubcribe();
    };
  }, [vendorId]);

  useEffect(() => {
    getServices();
  }, []);

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

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
            Manage vendor
          </Text>
        </View>

        <View className="relative flex flex-row p-2 mb-3">
          <View className="relative">
            <Image
              source={{
                uri: vendor?.imageURL ?? placeHolderImg,
              }}
              className="w-[140px] h-[100px] rounded-md bg-secondary-100"
            />
            <TouchableOpacity
              className="absolute bottom-1 right-1 w-[30px] h-[30px] bg-secondary flex items-center justify-center rounded-full"
              onPress={() => pickImageAndUpload("image")}
            >
              <Ionicons name="add" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-1 ml-2">
            <Text className="text-white font-semibold text-xl">
              {vendor?.name}
            </Text>
            <Text className="text-gray-400 font-semibold text-[15px]">
              {vendor?.email}
            </Text>
            <Text className="text-gray-400 font-semibold text-[15px]">
              {vendor?.phoneNumber}
            </Text>
            <Text className="text-gray-400 font-semibold text-[15px]">
              {vendor?.street}
            </Text>
          </View>

          <TouchableOpacity
            className="absolute top-1 right-1 w-[30px] h-[30px] bg-secondary flex items-center justify-center rounded-full"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="pencil" color="#fff" size={18} />
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-white font-semibold text-[26px] mb-4">
            Upload Cover
          </Text>
          <View className="w-full h-[230px] bg-secondary rounded p-4">
            <TouchableOpacity
              className={`w-full h-full ${
                !vendor.cover ? "border border-dashed border-gray-400" : ""
              }  flex items-center justify-center`}
              onPress={() => pickImageAndUpload("cover")}
            >
              {vendor?.cover ? (
                <>
                  <Image
                    source={{ uri: vendor.cover }}
                    className="relative w-full h-full"
                  />
                  <TouchableOpacity
                    className="absolute bottom-1 right-1 w-[30px] h-[30px] bg-secondary flex items-center justify-center rounded-full"
                    onPress={() => pickImageAndUpload("cover")}
                  >
                    <Ionicons name="camera" color="#fff" size={18} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Ionicons name="cloud-upload" size={50} color="#fff" />
                  <Text className="text-white text-lg font-semibold">
                    Upload Cover Image
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <VendorBasicInfo
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          vendor={vendor}
        />

        <AddServiceSection services={services} vendor={vendor} />

        <View className="mt-2 mb-6">
          <CustomButton
            title={vendor?.isPublished ? "Published" : "Publish"}
            containerStyle="w-[50%] rounded-full"
            icon={
              vendor?.isPublished ? "checkmark-circle" : "arrow-redo-circle"
            }
            disabled={
              !vendor?.imageURL ||
              !vendor?.cover ||
              !vendor.bio ||
              !vendor.category ||
              !vendor.startTime ||
              !vendor.endTime ||
              services.length === 0
            }
            handlePress={publishVendor}
            isLoading={isPublishing}
          />
        </View>

        {modalVisible && (
          <EditVendorModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            vendor={vendor}
          />
        )}
      </View>
    </Container>
  );
};

export default VendorDetails;
