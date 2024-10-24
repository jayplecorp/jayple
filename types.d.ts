import { Timestamp } from "firebase/firestore";

export type UserData = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageURL: string;
  type: "admin" | "vendor" | "user";
  cover?: string;
  street?: string;
  location?: string;
  bio?: string;
  category?: "economical" | "prime" | "luxury";
  startTime?: string;
  endTime?: string;
  status?: "open" | "closed";
  isPublished?: boolean;
  services?: {
    id: string;
    price: number;
    duration: number;
  }[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export type Salon = {
  id: number;
  shopName: string;
  shopLogo: string;
  shopImageURL: string;
  bio: string;
  street: string;
  location: string;
  type: string;
  shopStatus: string;
  startTime: string;
  endTime: string;
  services: number[];
};

export type Category = {
  id: string;
  serviceName: string;
  serviceImageURL: string;
  price?: number;
};

export type CartData = {
  id: string;
  vendorName: string;
  vendorImageURL: string;
  startTime?: string;
  endTime?: string;
  location: string;
  services: Category[];
};

export type Booking = {
  id: string;
  vendorId: string;
  userId: string;
  name: string;
  phoneNumber: string;
  bookedDate: string;
  slotTime: string;
  location: string;
  services: Category[];
  vendorName: string;
  vendorImageURL: string;
  status: "ongoing" | "completed";
  createdAt: Timestamp;
};
