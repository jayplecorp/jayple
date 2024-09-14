import { Timestamp } from "firebase/firestore";

export type UserData = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageURL: string;
  createdAt: Timestamp;
};
