import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TimeSlotProps {
  timeSlot: string;
  selectedSlot: string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
  bookedSlots: string[];
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  selectedSlot,
  setSelectedSlot,
  bookedSlots,
}) => {
  return (
    <TouchableOpacity
      className={`${
        selectedSlot === timeSlot
          ? "bg-accent"
          : !bookedSlots.includes(timeSlot)
          ? "bg-secondary-100"
          : "bg-secondary-100 opacity-30"
      } mr-2 mb-3 p-3 rounded-md w-[30%] flex flex-row items-center justify-center`}
      activeOpacity={1}
      disabled={bookedSlots.includes(timeSlot)}
      onPress={() => setSelectedSlot(timeSlot)}
    >
      <Text className="text-white text-lg">{timeSlot}</Text>
    </TouchableOpacity>
  );
};

export default TimeSlot;
