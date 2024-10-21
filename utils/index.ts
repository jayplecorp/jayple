import moment from "moment";

export const generateDates = () => {
  const dates = [];
  const startDate = moment();

  // Generate 30 future dates
  for (let i = 0; i < 30; i++) {
    dates.push(moment(startDate).add(i, "days").format("YYYY-MM-DD"));
  }

  return dates;
};

export const generateTimeSlots = (startTime, endTime) => {
  const timeSlots = [];

  // Replace '.' with ':' to convert to HH:MM format
  const formattedStartTime = startTime.replace(".", ":");
  const formattedEndTime = endTime.replace(".", ":");

  const start = new Date(`1970-01-01T${formattedStartTime}:00`);
  const end = new Date(`1970-01-01T${formattedEndTime}:00`);

  while (start <= end) {
    // Format the time in 12-hour format with AM/PM
    let hours = start.getHours();
    let minutes = start.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    const formattedTime = `${hours.toString().padStart(2, "0")}.${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    timeSlots.push(formattedTime);

    // Move to the next hour
    start.setHours(start.getHours() + 1);
  }

  return timeSlots;
};
