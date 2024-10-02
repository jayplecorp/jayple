import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Container from "../../components/container";
import BookingModal from "../../components/modals/bookingModal";
import { cartData } from "../../constants/data";
import CartCard from "../../components/cards/cartCard";
import { CartData } from "../../types";

const Cart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  const openModal = (cart: CartData) => {
    setSelectedCart(cart);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCart(null);
    setModalVisible(false);
  };

  return (
    <Container>
      <View className="p-5">
        <Text className="text-white font-psemibold text-2xl">My Cart</Text>

        {cartData?.length > 0 ? (
          <View className="flex-1 mt-4">
            {cartData.map((cart) => {
              const totPrice = cart.services.reduce(
                (sum, item) => sum + item.price,
                0
              );
              const discount = (totPrice / 100) * 20;

              return (
                <View key={cart.id}>
                  <CartCard
                    openModal={openModal}
                    cart={cart}
                    totPrice={totPrice}
                    discount={discount}
                  />

                  {selectedCart && (
                    <BookingModal
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      closeModal={closeModal}
                      cart={selectedCart}
                    />
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <View className="flex items-center justify-center h-[65vh]">
            <LottieView
              source={require("../../assets/images/no-result.json")}
              autoPlay
              loop
              style={{ height: 250, width: 250 }}
            />
            <Text className="text-gray-400 font-psemibold text-xl">
              No items in the cart!
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default Cart;
