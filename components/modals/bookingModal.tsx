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
import { Ionicons } from "@expo/vector-icons";
import TimeSlot from "../cards/timeSlot";
import { CartData } from "../../types";
import moment from "moment";

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
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
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

  const generateDates = () => {
    const dates = [];
    const startDate = moment();

    // Generate 30 future dates
    for (let i = 0; i < 30; i++) {
      dates.push(moment(startDate).add(i, "days").format("YYYY-MM-DD"));
    }

    return dates;
  };

  const [availableDates, setAvailableDates] = useState(generateDates());

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

              <View className="flex flex-row flex-wrap justify-between">
                {timeSlots.map((slot, index) => (
                  <TimeSlot
                    key={index}
                    timeSlot={slot}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                  />
                ))}
              </View>
            </View>

            <View className="mt-3">
              <Text className="text-2xl text-white font-semibold mb-4">
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
                className="bg-accent flex items-center justify-center p-3 rounded-md"
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
