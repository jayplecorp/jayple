import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Booking, UserData } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import Toast from "react-native-root-toast";

interface BookingCardProps {
  user: UserData;
  booking: Booking;
  discount: number;
  totPrice: number;
}

const BookingCard: React.FC<BookingCardProps> = ({
  user,
  booking,
  discount,
  totPrice,
}) => {
  const ogDate = booking?.bookedDate;
  const [y, m, d] = ogDate.split("-");

  const [isLoading, setIsLoading] = useState(false);

  const markAsComplete = async () => {
    try {
      if (user?.type !== "vendor") return;

      setIsLoading(true);

      const bookingRef = doc(firestore, `/bookings/${booking?.id}`);
      await updateDoc(bookingRef, {
        status: "completed",
      });

      Toast.show("Order has been successfully completed!", {
        duration: 3000,
        hideOnPress: true,
        backgroundColor: "#2a2a2a",
        containerStyle: {
          borderRadius: 30,
          paddingHorizontal: 15,
        },
      });
    } catch (error) {
      console.log("markAsComplete Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="p-3 bg-secondary w-full rounded-md mb-4">
      <View className="flex flex-row">
        <Image
          source={{ uri: booking?.vendorImageURL }}
          className="w-[100px] h-[100px] rounded-md mr-2"
        />

        <View className="flex-1">
          <Text className="text-white text-2xl font-bold">
            {booking?.vendorName}
          </Text>

          <View className="mt-1">
            <Text className="text-gray-400 font-bold">BID: {booking?.id}</Text>
            <Text className="text-gray-400 font-bold italic">
              {moment(booking?.createdAt?.seconds * 1000).fromNow()}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-white text-xl font-semibold mt-2">Basic Info</Text>
      <View className="mt-2 bg-secondary-100/40 p-3 rounded-md">
        {user?.type === "vendor" && (
          <>
            <Text className="text-gray-400 text-lg font-bold">
              Name: <Text className="text-accent">{booking?.name}</Text>
            </Text>
            <Text className="text-gray-400 text-lg font-bold">
              Phone No:{" "}
              <Text className="text-accent">{booking?.phoneNumber}</Text>
            </Text>
          </>
        )}
        <Text className="text-gray-400 text-lg font-bold">
          Booked Date: <Text className="text-accent">{`${d}-${m}-${y}`}</Text>
        </Text>
        <Text className="text-gray-400 text-lg font-bold">
          Slot Time: <Text className="text-accent">{booking?.slotTime}</Text>
        </Text>
      </View>

      <View className="mt-2">
        <Text className="text-white text-xl font-semibold">Services</Text>
        {booking?.services.map((service) => (
          <View
            key={service?.id}
            className="flex flex-row items-center justify-between mt-1"
          >
            <Text className="text-gray-400 text-lg font-bold">
              {service?.serviceName}
            </Text>
            <Text className="text-gray-400 text-lg font-bold">
              1 x {service?.price} = ₹{1 * service?.price}
            </Text>
          </View>
        ))}
        <View className="flex flex-row items-center justify-between mt-1">
          <Text className="text-gray-400 text-lg font-bold">Discount</Text>
          <Text className="text-gray-400 text-lg font-bold">
            20% = ₹{discount}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-1">
          <Text className="text-white text-xl font-bold">Total</Text>
          <Text className="text-accent text-xl font-bold">
            ₹{totPrice - discount}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className={`${
          booking?.status === "ongoing" ? "bg-accent" : "bg-secondary-100"
        } ${
          user?.type !== "vendor" && "opacity-40"
        } flex flex-row items-center justify-center p-2 rounded-3xl mt-3`}
        disabled={user?.type !== "vendor" || booking?.status === "completed"}
        onPress={() =>
          Alert.alert(
            "Complete order",
            `Are you sure, you're completed ${booking?.name}'s order?`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Complete",
                onPress: () => markAsComplete(),
              },
            ]
          )
        }
      >
        {user?.type !== "vendor" ? (
          <>
            <Ionicons
              name={
                booking?.status === "ongoing"
                  ? "arrow-redo"
                  : "checkmark-circle"
              }
              size={25}
              color="#fff"
            />
            <Text className="text-white text-lg font-bold ml-1 capitalize">
              {booking?.status}
            </Text>
          </>
        ) : (
          <>
            {isLoading && (
              <ActivityIndicator
                animating={isLoading}
                color="#fff"
                size="small"
                style={{ marginRight: 2 }}
              />
            )}
            {booking?.status === "ongoing" ? (
              <Text className="text-white text-lg font-bold ml-1">
                Make as complete
              </Text>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={25} color="#fff" />
                <Text className="text-white text-lg font-bold ml-1 capitalize">
                  {booking?.status}
                </Text>
              </>
            )}
          </>
        )}
      </TouchableOpacity>
      {booking?.status === "ongoing" && user?.type !== "vendor" && (
        <Text className="text-gray-400 text-[12px] ml-1 mt-0.5 font-bold">
          Tips: Get to the salon ahead of your booked slot time.
        </Text>
      )}
    </View>
  );
};

export default BookingCard;
