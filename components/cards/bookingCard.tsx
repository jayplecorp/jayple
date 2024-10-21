import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Booking, UserData } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

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
  return (
    <View className="p-3 bg-secondary w-full rounded-md mb-4">
      <View className="flex flex-row">
        <Image
          source={{ uri: booking.vendorImageURL }}
          className="w-[100px] h-[100px] rounded-md mr-2"
        />

        <View className="flex-1">
          <Text className="text-white text-2xl font-bold">
            {booking.vendorName}
          </Text>

          <View className="mt-1">
            <Text className="text-gray-400 font-bold">BID: {booking.id}</Text>
            <Text className="text-gray-400 font-bold italic">
              {moment(booking.createdAt.seconds * 1000).fromNow()}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-white text-xl font-semibold mt-2">Basic Info</Text>
      <View className="mt-2 bg-secondary-100/40 p-3 rounded-md">
        {user?.type === "vendor" && (
          <>
            <Text className="text-gray-400 text-lg font-bold">
              Name: <Text className="text-accent">{booking.name}</Text>
            </Text>
            <Text className="text-gray-400 text-lg font-bold">
              Phone No:{" "}
              <Text className="text-accent">{booking.phoneNumber}</Text>
            </Text>
          </>
        )}
        <Text className="text-gray-400 text-lg font-bold">
          Booked Date: <Text className="text-accent">{booking.bookedDate}</Text>
        </Text>
        <Text className="text-gray-400 text-lg font-bold">
          Slot Time: <Text className="text-accent">{booking.slotTime}</Text>
        </Text>
      </View>

      <View className="mt-2">
        <Text className="text-white text-xl font-semibold">Services</Text>
        {booking.services.map((service) => (
          <View
            key={service.id}
            className="flex flex-row items-center justify-between mt-1"
          >
            <Text className="text-gray-400 text-lg font-bold">
              {service.serviceName}
            </Text>
            <Text className="text-gray-400 text-lg font-bold">
              1 x {service.price} = ₹{1 * service.price}
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
          booking.status === "ongoing" ? "bg-accent" : "bg-secondary-100"
        } ${
          user?.type !== "vendor" && "opacity-40"
        } flex flex-row items-center justify-center p-2 rounded-3xl mt-3`}
      >
        {user?.type !== "vendor" ? (
          <>
            <Ionicons
              name={
                booking.status === "ongoing" ? "arrow-redo" : "checkmark-circle"
              }
              size={25}
              color="#fff"
            />
            <Text className="text-white text-lg font-bold ml-1 capitalize">
              {booking.status}
            </Text>
          </>
        ) : (
          <>
            <Text className="text-white text-lg font-bold ml-1">
              Make as complete
            </Text>
          </>
        )}
      </TouchableOpacity>
      {booking.status === "ongoing" && user?.type !== "vendor" && (
        <Text className="text-gray-400 text-[12px] ml-1 mt-0.5 font-bold">
          Tips: Get to the salon ahead of your booked slot time.
        </Text>
      )}
    </View>
  );
};

export default BookingCard;
