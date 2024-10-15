import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { CartData, UserData } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import Toast from "react-native-root-toast";

interface CartCardProps {
  openModal: (cart: CartData) => void;
  user: UserData;
  cart: CartData;
  totPrice: number;
  discount: number;
}

const CartCard: React.FC<CartCardProps> = ({
  openModal,
  user,
  cart,
  discount,
  totPrice,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const removeServiceFromCart = async (
    serviceId: string,
    serviceName: string,
    servicePrice: number
  ) => {
    try {
      setIsLoading(true);

      const cartRef = doc(firestore, `/users/${user?.id}/cart/${cart?.id}`);
      await updateDoc(cartRef, {
        services: arrayRemove({
          id: serviceId,
          serviceName,
          price: servicePrice,
        }),
      });

      const updatedCartDoc = await getDoc(cartRef);
      if (!updatedCartDoc.data()?.services.length) {
        await deleteDoc(cartRef);
      }

      Toast.show("Service removed from the cart", {
        duration: 3000,
        hideOnPress: true,
        backgroundColor: "#2a2a2a",
        containerStyle: {
          borderRadius: 30,
          paddingHorizontal: 15,
        },
      });
    } catch (error) {
      console.log("removeServiceFromCart Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="p-3 bg-secondary w-full rounded-md mb-2">
      <View className="flex flex-row">
        <Image
          source={{ uri: cart.vendorImageURL }}
          className="w-[100px] h-[100px] rounded-md mr-2"
        />

        <View className="flex-1">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-white text-2xl font-bold">
              {cart.vendorName}
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

          <View className="mt-1">
            {cart.services.map((service) => (
              <View
                key={service.id}
                className="flex flex-row items-center justify-between"
              >
                <Text className="text-gray-400 text-lg font-bold">
                  {service.serviceName}
                </Text>
                <TouchableOpacity
                  className="bg-red-400 w-[25px] h-[25px] flex items-center justify-center rounded-full"
                  onPress={() =>
                    removeServiceFromCart(
                      service?.id as string,
                      service.serviceName,
                      cart.services.find((item) => item.id === service.id)
                        ?.price
                    )
                  }
                >
                  {isLoading ? (
                    <ActivityIndicator
                      animating={isLoading}
                      color="#fff"
                      size="small"
                    />
                  ) : (
                    <Ionicons name="trash" color="#fff" size={17} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
