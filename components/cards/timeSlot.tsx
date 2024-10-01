import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface TimeSlotProps {
  timeSlot: { time: string; available: boolean };
  selectedSlot: string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  timeSlot,
  selectedSlot,
  setSelectedSlot,
}) => {
  const handleSelectSlot = () => {
    if (!timeSlot.available) return;

    setSelectedSlot(timeSlot.time);
  };

  return (
    <TouchableOpacity
      className={`${
        selectedSlot === timeSlot.time
          ? "bg-accent"
          : timeSlot.available
          ? "bg-secondary-100"
          : "bg-secondary-100 opacity-30"
      } mr-2 p-4 rounded-md`}
      activeOpacity={1}
      disabled={!timeSlot.available}
      onPress={() => handleSelectSlot()}
    >
      <Text className="text-white text-lg">{timeSlot.time}</Text>
    </TouchableOpacity>
  );
};

export default TimeSlot;
