import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { CartData } from "../../types";
import { Ionicons } from "@expo/vector-icons";

interface CartCardProps {
  openModal: (cart: CartData) => void;
  cart: CartData;
  totPrice: number;
  discount: number;
}

const CartCard: React.FC<CartCardProps> = ({
  openModal,
  cart,
  discount,
  totPrice,
}) => {
  return (
    <View className="p-3 bg-secondary w-full rounded-md mb-2">
      <View className="flex flex-row">
        <Image
          source={{ uri: cart.shopLogo }}
          className="w-[100px] h-[100px] rounded-md mr-2"
        />

        <View className="flex-1">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-white text-2xl font-bold">
              {cart.shopName}
            </Text>

            <TouchableOpacity
              className="bg-secondary-100 w-[30px] h-[30px] flex items-center justify-center rounded-full"
              onPress={() =>
                Alert.alert(
                  "Delete Item",
                  "Are you sure, you want delete this item?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => {},
                    },
                  ]
                )
              }
            >
              <Ionicons name="close" color="#ffffff" size={25} />
            </TouchableOpacity>
          </View>

          {cart.services.map((service) => (
            <Text key={service.id} className="text-gray-400 text-lg font-bold">
              {service.serviceName}
            </Text>
          ))}
        </View>
      </View>

      <View className="mt-2">
        <Text className="text-white text-xl font-semibold">Services</Text>
        {cart.services.map((service) => (
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
        className="bg-accent flex items-center justify-center p-3 rounded-md mt-3"
        onPress={() => openModal(cart)}
      >
        <Text className="text-white text-lg font-bold">Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;
