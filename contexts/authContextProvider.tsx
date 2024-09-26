import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseConfig";
import { UserData } from "../types";

import LoaderScreen from "../components/loaderScreen";

export type AuthContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (u) => {
      if (u) {
        setIsAuthenticated(true);

        const userDoc = await getDoc(doc(firestore, `/users/${u.uid}`));
        setUser({ id: userDoc.id, ...userDoc.data() } as UserData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setIsLoading(false);
    });
    setIsLoading(false);

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading ? <LoaderScreen isLoading={isLoading} /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
