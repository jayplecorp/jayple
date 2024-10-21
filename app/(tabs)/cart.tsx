import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Container from "../../components/container";
import BookingModal from "../../components/modals/bookingModal";
import { cartData } from "../../constants/data";
import CartCard from "../../components/cards/cartCard";
import { CartData } from "../../types";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../contexts/authContextProvider";
import CartSkeleton from "../../components/skeletons/cartSkeleton";

const Cart = () => {
  const { user } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (cart: CartData) => {
    setSelectedCart(cart);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCart(null);
    setModalVisible(false);
  };

  useEffect(() => {
    const cartRef = collection(firestore, `/users/${user?.id}/cart`);
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const carts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCarts(carts);

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <View className="p-5">
        <Text className="text-white font-psemibold text-2xl">My Cart</Text>

        {isLoading ? (
          <View className="flex-1 mt-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <CartSkeleton key={i} />
            ))}
          </View>
        ) : (
          <>
            {carts?.length > 0 ? (
              <View className="flex-1 mt-4">
                {carts.map((cart) => {
                  const totPrice = cart.services.reduce(
                    (sum, item) => sum + item.price,
                    0
                  );
                  const discount = (totPrice / 100) * 20;

                  return (
                    <View key={cart.id}>
                      <CartCard
                        openModal={openModal}
                        user={user}
                        cart={cart}
                        totPrice={totPrice}
                        discount={discount}
                      />

                      {selectedCart && (
                        <BookingModal
                          user={user}
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
          </>
        )}
      </View>
    </Container>
  );
};

export default Cart;
