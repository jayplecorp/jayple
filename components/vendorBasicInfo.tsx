import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "./formField";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "./customButton";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { UserData } from "../types";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const showTimePicker = (
    setPickerVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setPickerVisible(true);
  };

  const handleEndTime = (
    event: any,
    selectedDate: Date,
    setPickerVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (selectedDate) {
      setBasicInfo({
        ...basicInfo,
        endTime: moment(selectedDate).format("HH:mm"),
      });
    }
    setPickerVisible(false);
  };
  const handleStartTime = (
    event: any,
    selectedDate: Date,
    setPickerVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (selectedDate) {
      setBasicInfo({
        ...basicInfo,
        startTime: moment(selectedDate).format("HH:mm"),
      });
    }
    setPickerVisible(false);
  };

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
          <View className="space-y-2 flex-1 mr-2">
            <Text className="text-base text-gray-100 font-medium">
              Start Time
            </Text>
            <TouchableOpacity
              className={`w-full h-14 px-4 bg-secondary rounded-md flex flex-row items-center`}
              onPress={() => showTimePicker(setStartPickerVisible)}
            >
              <Text className="text-gray-400 font-psemibold">
                {basicInfo.startTime || "HH:MM"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2 flex-1">
            <Text className="text-base text-gray-100 font-medium">
              End Time
            </Text>
            <TouchableOpacity
              className={`w-full h-14 px-4 bg-secondary rounded-md focus:border-accent flex flex-row items-center`}
              onPress={() => showTimePicker(setEndPickerVisible)}
            >
              <Text className="text-gray-400 font-psemibold">
                {basicInfo.endTime || "HH:MM"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isStartPickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) =>
              handleStartTime(event, selectedDate, setStartPickerVisible)
            }
            accentColor="#DB4437"
            themeVariant="dark"
          />
        )}

        {isEndPickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) =>
              handleEndTime(event, selectedDate, setEndPickerVisible)
            }
            accentColor="#DB4437"
            themeVariant="dark"
          />
        )}

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
