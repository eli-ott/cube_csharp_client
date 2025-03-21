import { createContext, useContext, useEffect, useState } from "react";
import { getCustomerInfos } from "../services/customer";
import { toast } from "react-toastify";
import { ICustomer } from "../models/customerModel";
import { getTokenFromCookie } from "../services/authentification";
import { useAuth } from "./AuthContext";

interface UserContextType {
  user: ICustomer | null;
  setUser: React.Dispatch<React.SetStateAction<ICustomer | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<ICustomer | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getCustomerInfos();
        setUser(userInfo);
      } catch (error) {
        toast.error(
          "Erreur lors de la récupération des informations utilisateur."
        );
      }
    };
    if (getTokenFromCookie()) {
      fetchUser();
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
