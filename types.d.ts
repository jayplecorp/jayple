import { Timestamp } from "firebase/firestore";

export type UserData = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageURL: string;
  createdAt: Timestamp;
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
  id: number;
  name: string;
  imageURL: string;
  price: number;
};
