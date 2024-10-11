import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "./formField";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "./customButton";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { UserData } from "../types";

interface VendorBasicInfoProps {
  basicInfo: {
    bio: string;
    category: string;
    startTime: string;
    endTime: string;
  };
  setBasicInfo: React.Dispatch<
    React.SetStateAction<{
      bio: string;
      category: string;
      startTime: string;
      endTime: string;
    }>
  >;
  vendor: UserData;
}

const VendorBasicInfo: React.FC<VendorBasicInfoProps> = ({
  basicInfo,
  setBasicInfo,
  vendor,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveBasicInfo = async () => {
    try {
      setIsLoading(true);

      const vendorRef = doc(firestore, `/users/${vendor?.id}`);
      await updateDoc(vendorRef, {
        category: basicInfo.category,
        bio: basicInfo.bio,
        startTime: basicInfo.startTime,
        endTime: basicInfo.endTime,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log("saveBasicInfo Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setBasicInfo(() => ({
      bio: vendor?.bio,
      category: vendor?.category,
      startTime: vendor?.startTime,
      endTime: vendor?.endTime,
    }));
  }, [vendor]);

  return (
    <View className="mb-4">
      <Text className="text-white font-semibold text-[26px] mb-4">
        Basic Info
      </Text>
      <View className="">
        <Picker
          selectedValue={basicInfo.category}
          onValueChange={(itemValue, itemIndex) =>
            setBasicInfo({ ...basicInfo, category: itemValue })
          }
          style={{
            backgroundColor: "#121212",
            color: "#CDCDE0",
            borderRadius: 8,
          }}
          dropdownIconColor="#CDCDE0"
          itemStyle={{ backgroundColor: "#121212", color: "#CDCDE0" }}
        >
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Economical" value="economical" />
          <Picker.Item label="Prime" value="prime" />
          <Picker.Item label="Luxury" value="luxury" />
        </Picker>
        <FormField
          title="Bio"
          value={basicInfo.bio}
          handleChangeText={(e) => setBasicInfo({ ...basicInfo, bio: e })}
          containerStyles="mt-3"
          placeholder="Vendor Description"
          textarea={true}
        />
        <View className="flex flex-row items-center mt-3">
          <FormField
            title="Start Time"
            value={basicInfo.startTime}
            handleChangeText={(e) =>
              setBasicInfo({ ...basicInfo, startTime: e })
            }
            containerStyles="flex-1 mr-3"
            placeholder="Eg: 08.00 AM"
            textarea={true}
          />
          <FormField
            title="End Time"
            value={basicInfo.endTime}
            handleChangeText={(e) => setBasicInfo({ ...basicInfo, endTime: e })}
            containerStyles="flex-1"
            placeholder="Eg: 10.00 PM"
            textarea={true}
          />
        </View>

        <CustomButton
          title="Save Info"
          containerStyle="mt-4 h-[50px]"
          disabled={
            !basicInfo.bio ||
            !basicInfo.category ||
            !basicInfo.startTime ||
            !basicInfo.endTime
          }
          isLoading={isLoading}
          handlePress={saveBasicInfo}
        />
      </View>
    </View>
  );
};

export default VendorBasicInfo;
