import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../../components/container";
import { cartData } from "../../constants/data";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import TimeSlot from "../../components/cards/timeSlot";

const Cart = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
                <View
                  key={cart.id}
                  className="p-3 bg-secondary w-full rounded-md mb-2"
                >
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
                                  onPress: () =>
                                    cartData.filter(
                                      (data) => data.id !== cart.id
                                    ),
                                },
                              ]
                            )
                          }
                        >
                          <Ionicons name="close" color="#ffffff" size={25} />
                        </TouchableOpacity>
                      </View>

                      {cart.services.map((service) => (
                        <Text
                          key={service.id}
                          className="text-gray-400 text-lg font-bold"
                        >
                          {service.name}
                        </Text>
                      ))}
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
                      <Text className="text-white text-xl font-bold">
                        Total
                      </Text>
                      <Text className="text-accent text-xl font-bold">
                        ₹{totPrice - discount}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    className="bg-accent flex items-center justify-center p-3 rounded-md mt-3"
                    onPress={() => setModalVisible(true)}
                  >
                    <Text className="text-white text-lg font-bold">
                      Book Now
                    </Text>
                  </TouchableOpacity>
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

      <View className="flex-1 items-center justify-center mt-[22px]">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="relative flex-1 bg-secondary p-5">
            <View className="flex flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-semibold text-white">
                Select Date & Slot
              </Text>
              <TouchableOpacity
                className="bg-secondary-100 w-[30px] h-[30px] flex items-center justify-center rounded-full"
                onPress={() => setModalVisible(false)}
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
          </View>
        </Modal>
      </View>
    </Container>
  );
};

export default Cart;
