import auth from "@react-native-firebase/auth";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../../components/customButton";
import { useAuthContext } from "../../contexts/authContextProvider";
import LoaderScreen from "../../components/loaderScreen";
import { Ionicons } from "@expo/vector-icons";
import Container from "../../components/container";
import { placeHolderImg } from "../../constants";

const MyProfile = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

  return (
    <Container>
      <View className="flex h-full w-full bg-primary p-5">
        {user?.type === "vendor" && (
          <Image
            source={{
              uri: user?.cover ?? placeHolderImg,
            }}
            className="w-full h-[100px] rounded-xl"
          />
        )}
        <View className="flex flex-row items-center py-3">
          {user?.imageURL ? (
            <Image
              source={{
                uri: user.imageURL,
              }}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <Ionicons name="person-circle" size={80} color="#ffffff" />
          )}
          <View className="flex ml-3 mt-2">
            <Text className="text-white font-psemibold text-2xl">
              {user?.name}
            </Text>
            <Text className="text-gray-500 font-psemibold text-lg mb-4">
              {user?.email}
            </Text>
          </View>
        </View>

        <View className="bg-secondary p-3 flex flex-row items-center mb-8 rounded">
          <View className="bg-secondary-100 mr-3 flex-1 flex items-center justify-center py-3 rounded-md">
            <Text className="font-psemibold text-[16px] text-white">
              Services Taken
            </Text>
            <Text className="font-psemibold text-[18px] text-gray-500">20</Text>
          </View>
          <View className="bg-secondary-100 flex-1  flex items-center justify-center py-3 rounded-md">
            <Text className="font-psemibold text-[16px] text-white">
              Services Booked
            </Text>
            <Text className="font-psemibold text-[18px] text-gray-500">10</Text>
          </View>
        </View>

        <CustomButton
          title="Logout"
          containerStyle="w-[200px]"
          handlePress={() => auth().signOut()}
        />
      </View>
    </Container>
  );
};

export default MyProfile;
