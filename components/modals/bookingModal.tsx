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
import React, { useState } from "react";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import { Ionicons } from "@expo/vector-icons";
import TimeSlot from "../cards/timeSlot";
import { CartData } from "../../types";

interface BookingModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  cart: CartData;
}

const BookingModal: React.FC<BookingModalProps> = ({
  modalVisible,
  setModalVisible,
  closeModal,
  cart,
}) => {
  const [selectedDate, setSelectedDate] = useState(getToday);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: true },
    { time: "01:00 PM", available: false },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: false },
    { time: "04:00 PM", available: true },
  ]);

  const totPrice = cart.services.reduce((sum, item) => sum + item.price, 0);
  const discount = (totPrice / 100) * 20;

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
            <View className="flex flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-semibold text-white">
                Select Date & Slot
              </Text>
              <TouchableOpacity
                className="bg-secondary-100 w-[30px] h-[30px] flex items-center justify-center rounded-full"
                onPress={() => closeModal()}
              >
                <Ionicons name="close" color="#ffffff" size={25} />
              </TouchableOpacity>
            </View>

            <DatePicker
              mode="calendar"
              selected={selectedDate}
              // current={}
              onSelectedChange={(date) => setSelectedDate(date)}
              options={{
                borderColor: "#2f353d",
                backgroundColor: "#2a2a2a",
                mainColor: "#DB4437",
                textDefaultColor: "#fff",
                textHeaderColor: "#fff",
                textSecondaryColor: "#CDCDE0",
              }}
            />

            <View className="mt-5">
              <Text className="text-2xl text-white font-semibold mb-3">
                Available Time Slots
              </Text>
              <FlatList
                ItemSeparatorComponent={
                  Platform.OS !== "android" &&
                  (({ highlighted }) => (
                    <View style={[highlighted && { marginLeft: 0 }]} />
                  ))
                }
                horizontal={true}
                data={timeSlots}
                renderItem={({ item, index, separators }) => (
                  <TimeSlot
                    key={index}
                    timeSlot={item}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                  />
                )}
              />
            </View>

            <View className="mt-5">
              <Text className="text-2xl text-white font-semibold mb-3">
                Order details
              </Text>

              <View className="flex flex-row">
                <Image
                  source={{ uri: cart.shopLogo }}
                  className="w-[100px] h-[100px] rounded-md mr-2"
                />

                <View className="flex-1">
                  <Text className="text-white text-2xl font-bold">
                    {cart.shopName}
                  </Text>

                  <Text className="text-gray-400 ml-1 font-semibold text-[13px]">
                    {cart.location}
                  </Text>
                </View>
              </View>

              <View className="mt-2">
                <Text className="text-white text-xl font-semibold">
                  Services
                </Text>
                {cart.services.map((service) => (
                  <View
                    key={service.id}
                    className="flex flex-row items-center justify-between mt-1"
                  >
                    <Text className="text-gray-400 text-lg font-bold">
                      {service.name}
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

              <TouchableOpacity
                className="bg-accent flex items-center justify-center p-3 rounded-md mt-3"
                onPress={() => {}}
              >
                <Text className="text-white text-lg font-bold">
                  Book your slot and Pay
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default BookingModal;
