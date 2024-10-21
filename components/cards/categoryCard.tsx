import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Category, UserData } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { placeHolderImg } from "../../constants";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../contexts/authContextProvider";
import Toast from "react-native-root-toast";

interface CategoryCardProps {
  category: Category;
  isSalonPage?: boolean;
  servicePrice?: number;
  vendor?: UserData;
  styles?: string;
  isHorizontal?: boolean;
  separators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: "leading" | "trailing", newProps: any) => void;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSalonPage,
  servicePrice,
  vendor,
  styles,
  isHorizontal,
  separators,
}) => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const moveServiceToCart = async (
    serviceId: string,
    serviceName: string,
    servicePrice: number
  ) => {
    try {
      setIsLoading(true);

      const cartRef = doc(firestore, `/users/${user?.id}/cart/${vendor?.id}`);
      const cartDoc = await getDoc(cartRef);

      if (!cartDoc.exists()) {
        await setDoc(cartRef, {
          vendorName: vendor?.name,
          vendorImageURL: vendor?.imageURL,
          location: vendor?.location,
          startTime: vendor?.startTime,
          endTime: vendor?.endTime,
          services: arrayUnion({
            id: serviceId,
            serviceName,
            price: servicePrice,
          }),
          createdAt: serverTimestamp(),
        });

        Toast.show("Service added to the cart", {
          duration: 3000,
          hideOnPress: true,
          backgroundColor: "#2a2a2a",
          containerStyle: {
            borderRadius: 30,
            paddingHorizontal: 15,
          },
        });
      } else {
        if (isInCart) {
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
        } else {
          await updateDoc(cartRef, {
            services: arrayUnion({
              id: serviceId,
              serviceName,
              price: servicePrice,
            }),
          });

          Toast.show("Service added to the cart", {
            duration: 3000,
            hideOnPress: true,
            backgroundColor: "#2a2a2a",
            containerStyle: {
              borderRadius: 30,
              paddingHorizontal: 15,
            },
          });
        }
      }

      setIsInCart(!isInCart);
    } catch (error) {
      console.log("moveServiceToCart Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfServiceInCart = async () => {
    const cartRef = doc(firestore, `/users/${user?.id}/cart/${vendor?.id}`);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const services = cartDoc.data()?.services || [];
      setIsInCart(services.some((service) => service.id === category?.id));
    }
  };

  useEffect(() => {
    if (user?.id && vendor?.id) {
      checkIfServiceInCart();
    }
  }, [user?.id, vendor?.id, category?.id]);

  return (
    <TouchableHighlight
      key={category.id}
      onShowUnderlay={separators?.highlight ?? null}
      onHideUnderlay={separators?.unhighlight ?? null}
      className={!isHorizontal && "w-[48%]"}
    >
      <View className={`bg-secondary rounded-md w-full mb-4 ${styles}`}>
        <Image
          source={{
            uri: category.serviceImageURL ?? placeHolderImg,
          }}
          className="h-[140px] w-full rounded-md"
        />
        <View className="p-3">
          <Text className="text-white font-semibold text-xl">
            {category.serviceName}
          </Text>

          {isSalonPage && (
            <View className="flex flex-row items-center justify-between mt-2">
              <Text className="text-accent text-xl font-psemibold">
                ₹{servicePrice}
              </Text>
              <TouchableOpacity
                className="bg-accent w-[33px] h-[33px] flex items-center justify-center rounded-full border border-white/20"
                onPress={(e) => {
                  e.stopPropagation();
                  moveServiceToCart(
                    category.id as string,
                    category.serviceName,
                    servicePrice
                  );
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                  />
                ) : (
                  <>
                    {isInCart ? (
                      <Ionicons name="checkmark" color="#ffffff" size={25} />
                    ) : (
                      <Ionicons name="add" color="#ffffff" size={30} />
                    )}
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default CategoryCard;
