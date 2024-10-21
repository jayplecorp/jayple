import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Container from "../../components/container";
import LottieView from "lottie-react-native";
import {
  Query,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { useAuthContext } from "../../contexts/authContextProvider";
import LoaderScreen from "../../components/loaderScreen";
import BookingCard from "../../components/cards/bookingCard";
import CartSkeleton from "../../components/skeletons/cartSkeleton";

const Bookings = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBookings = async () => {
    try {
      let bookingQ: Query;

      if (user?.type === "vendor") {
        bookingQ = query(
          collection(firestore, `/bookings`),
          where("vendorId", "==", user?.id),
          orderBy("createdAt", "desc")
        );
      } else {
        bookingQ = query(
          collection(firestore, `/bookings`),
          where("userId", "==", user?.id),
          orderBy("createdAt", "desc")
        );
      }

      const bookingDocs = await getDocs(bookingQ);
      const bookings = bookingDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookings);
    } catch (error) {
      console.log("getBookings Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  if (isLoading) {
    return <LoaderScreen isLoading={isLoading} />;
  }

  return (
    <Container>
      <View className="p-5">
        <Text className="text-white font-psemibold text-2xl">My Bookings</Text>

        {isLoading ? (
          <View className="flex-1 mt-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <CartSkeleton key={i} />
            ))}
          </View>
        ) : (
          <>
            {bookings.length > 0 ? (
              <View className="flex-1 mt-4">
                {bookings.map((booking) => {
                  const totPrice = booking.services.reduce(
                    (sum, item) => sum + item.price,
                    0
                  );
                  const discount = (totPrice / 100) * 20;

                  return (
                    <BookingCard
                      key={booking.id}
                      user={user}
                      booking={booking}
                      discount={discount}
                      totPrice={totPrice}
                    />
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
                  No booking found!
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </Container>
  );
};

export default Bookings;
