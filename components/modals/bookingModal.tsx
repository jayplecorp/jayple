import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TimeSlot from "../cards/timeSlot";
import { CartData, UserData } from "../../types";
import moment from "moment";
import { generateDates, generateTimeSlots } from "../../utils";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import CustomButton from "../customButton";
import SlotSkeleton from "../skeletons/slotSkeleton";
import { router } from "expo-router";

interface BookingModalProps {
  user: UserData;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  cart: CartData;
}

const BookingModal: React.FC<BookingModalProps> = ({
  user,
  modalVisible,
  setModalVisible,
  closeModal,
  cart,
}) => {
  const [availableDates, setAvailableDates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState<string[] | []>([]);
  const [isSlotting, setIsSlotting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totPrice = cart.services.reduce((sum, item) => sum + item.price, 0);
  const discount = (totPrice / 100) * 20;

  const handleBookSlot = async () => {
    try {
      if (!selectedDate || !selectedSlot) return;

      setIsLoading(true);

      const bookingRef = collection(firestore, "bookings");
      await addDoc(bookingRef, {
        userId: user?.id,
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        vendorId: cart?.id,
        vendorName: cart?.vendorName,
        vendorImageURL: cart?.vendorImageURL,
        bookedDate: selectedDate,
        slotTime: selectedSlot,
        services: cart?.services,
        location: cart?.location,
        status: "ongoing",
        createdAt: serverTimestamp(),
      });

      const bookedSlotRef = doc(
        firestore,
        `/users/${cart?.id}/bookedSlots/${selectedDate}`
      );
      await setDoc(bookedSlotRef, {
        slots: arrayUnion(selectedSlot),
      });

      const userCartRef = doc(firestore, `/users/${user?.id}/cart/${cart?.id}`);
      await deleteDoc(userCartRef);

      closeModal();
      router.push("/bookings");
    } catch (error) {
      console.log("handleBookSlot Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBookedSlots = async (date: string) => {
    try {
      setIsSlotting(true);

      setTimeSlots(generateTimeSlots(cart.startTime, cart.endTime));

      const bookedSlotRef = doc(
        firestore,
        `/users/${cart?.id}/bookedSlots/${date}`
      );
      const bookedSlots = await getDoc(bookedSlotRef);

      if (bookedSlots.exists()) {
        setBookedSlots(bookedSlots.data()?.slots);
      } else {
        setBookedSlots([]);
      }
    } catch (error) {
      console.log("getBookedSlots Error", error);
    } finally {
      setIsSlotting(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      getBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  return (
    <View className="flex-1 items-center justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 bg-secondary p-5">
          <ScrollView>
            <View>
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-2xl font-semibold text-white">
                  Select Date
                </Text>
                <TouchableOpacity
                  className="bg-secondary-100 w-[30px] h-[30px] flex items-center justify-center rounded-full"
                  onPress={() => closeModal()}
                >
                  <Ionicons name="close" color="#ffffff" size={25} />
                </TouchableOpacity>
              </View>

              <FlatList
                ItemSeparatorComponent={
                  Platform.OS !== "android" &&
                  (({ highlighted }) => (
                    <View style={[highlighted && { marginLeft: 0 }]} />
                  ))
                }
                horizontal={true}
                data={availableDates}
                renderItem={({ item, index, separators }) => (
                  <TouchableOpacity
                    key={index}
                    className={`${
                      item === selectedDate ? "bg-accent" : "bg-secondary-100"
                    } h-[35px] w-[35px] flex items-center justify-center rounded-full mr-2`}
                    onPress={() => setSelectedDate(item)}
                  >
                    <Text
                      className={`${
                        item === selectedDate ? "font-bold" : "font-normal"
                      } text-white`}
                    >
                      {item?.slice(8, 10)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View className="mt-6">
              <Text className="text-2xl text-white font-semibold mb-4">
                Available Time Slots
              </Text>

              {isSlotting ? (
                <View className="flex flex-row flex-wrap justify-between">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <SlotSkeleton key={i} />
                  ))}
                </View>
              ) : (
                <View className="flex flex-row flex-wrap justify-between">
                  {timeSlots.map((slot, index) => (
                    <TimeSlot
                      key={index}
                      timeSlot={slot}
                      selectedSlot={selectedSlot}
                      setSelectedSlot={setSelectedSlot}
                      bookedSlots={bookedSlots}
                    />
                  ))}
                </View>
              )}
            </View>

            <View className="mt-3">
              <Text className="text-2xl text-white font-semibold mb-4">
                Order details
              </Text>

              <View className="flex flex-row">
                <Image
                  source={{ uri: cart.vendorImageURL }}
                  className="w-[100px] h-[100px] rounded-md mr-2"
                />

                <View className="flex-1">
                  <Text className="text-white text-2xl font-bold">
                    {cart.vendorName}
                  </Text>

                  <Text className="text-gray-400 ml-1 font-semibold text-[13px]">
                    {cart.location}
                  </Text>
                </View>
              </View>

              <View className="mt-3 mb-3">
                <Text className="text-white text-xl font-semibold">
                  Services
                </Text>
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
                  <Text className="text-gray-400 text-lg font-bold">
                    Discount
                  </Text>
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

              <CustomButton
                title="Book your slot and Pay"
                isLoading={isLoading}
                handlePress={handleBookSlot}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default BookingModal;
