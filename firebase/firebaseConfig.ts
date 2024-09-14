import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2ktSWhT-SMZx99GvZxhDEl7g2ITPIfMc",
  authDomain: "jayple-34ead.firebaseapp.com",
  projectId: "jayple-34ead",
  storageBucket: "jayple-34ead.appspot.com",
  messagingSenderId: "873957741068",
  appId: "1:873957741068:web:b3107432de5f879cdf5429",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
