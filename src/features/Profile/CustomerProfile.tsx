import { useEffect, useState } from "react";
import { useUser } from "../../hooks/CustomerContext";
import { updateCustomerInfos } from "../../services/customer";
import { emailValidator } from "../../utils/emailValidator";
import CustomerUpdateAddress from "./CustomerUpdateAddress";
import CustomerChangePassword from "./CustomerChangePassword";

const CustomerProfile: React.FC = () => {
  interface IUserInfos {
    firstName?: string;
    lastName?: string;
    email?: string;
  }

  interface IUserAddress {
    addressLine: string;
    city: string;
    zipCode: string;
    complement: string | null;
    country: string;
  }

  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfos, setUserInfos] = useState<IUserInfos>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });
  const [userAddress, setUserAddress] = useState<IUserAddress>({
    addressLine: "9 Baker Street",
    country: "United Kingdom",
    city: "London",
    zipCode: "12345",
    complement: null,
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const { user, setUser } = useUser();

  const handleEditUserAddress = async (newAddress: IUserAddress) => {
    if (user) {
      const updatedUser = {
        ...user,
        address: {
          ...user.address, 
          ...newAddress, 
        },
      };

      await updateCustomerInfos(updatedUser);
      setUser(updatedUser); 
    }
    setIsOpenAddress(false); 
  };

  const handleEditUserInfosClick = async () => {
    if (isEditing) {
      if (user) {
        const updatedUser = {
          ...user,
          firstName: userInfos.firstName || "",
          lastName: userInfos.lastName || "",
          email: userInfos.email || "",
        };

        await updateCustomerInfos(updatedUser);
        setUser(updatedUser);
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail: string = e.target.value;
    setUserInfos({ ...userInfos, email: newEmail });

    const validationResult = emailValidator({ email: newEmail });
    setIsEmailValid(validationResult.ok);
    setEmailErrorMessage(validationResult.message);
  };

  useEffect(() => {
    if (user) {
      setUserInfos({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });

      setUserAddress({
        addressLine: user.address.addressLine,
        city: user.address.city,
        zipCode: user.address.zipCode,
        country: user.address.country,
        complement: user.address.complement || "",
      });
    }
  }, [user]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold text-[#6A1B1A] mb-4">Profil Utilisateur</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Prénom</label>
          {isEditing ? (
            <input
              type="text"
              className="w-full border border-[#6A1B1A] bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]"
              value={userInfos.firstName}
              onChange={(e) =>
                setUserInfos({ ...userInfos, firstName: e.target.value })
              }
            />
          ) : (
            <p className="p-2 border border-gray-300 rounded-lg bg-gray-50">{userInfos.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Nom</label>
          {isEditing ? (
            <input
              type="text"
              className="w-full border border-[#6A1B1A] bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]"
              value={userInfos.lastName}
              onChange={(e) =>
                setUserInfos({ ...userInfos, lastName: e.target.value })
              }
            />
          ) : (
            <p className="p-2 border border-gray-300 rounded-lg bg-gray-50">{userInfos.lastName}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          {isEditing ? (
            <>
              <input
                type="email"
                className={`w-full border ${!isEmailValid ? "border-red-500" : "border-[#6A1B1A]"} bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]`}
                value={userInfos.email}
                onChange={handleEmailChange}
              />
              {!isEmailValid && emailErrorMessage && (
                <p className="text-red-500 text-sm mt-1">{emailErrorMessage}</p>
              )}
            </>
          ) : (
            <p className="p-2 border border-gray-300 rounded-lg bg-gray-50">{userInfos.email}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between mt-4 space-y-2 md:space-y-0 md:space-x-2">
          <button
            className={`cursor-pointer ${isEditing ? "bg-green-600" : "bg-[#6A1B1A]"} text-white px-4 py-2 rounded-lg w-full md:w-auto`}
            onClick={handleEditUserInfosClick}
          >
            {isEditing ? "Sauvegarder" : "Modifier"}
          </button>
          <button
            className={`cursor-pointer bg-[#6A1B1A] text-white px-4 py-2 rounded-lg w-full md:w-auto ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isEditing}
            onClick={() => setIsOpenAddress(true)}
          >
            Changer l'adresse
          </button>
          <button
            className={`cursor-pointer bg-[#6A1B1A] text-white px-4 py-2 rounded-lg w-full md:w-auto ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isEditing}
            onClick={() => setIsOpenPassword(true)}
          >
            Changer le mot de passe
          </button>
        </div>
      </div>

      {isOpenAddress && (
        <CustomerUpdateAddress
          userAddress={userAddress}
          updateAddress={handleEditUserAddress}
          setUserAddress={setUserAddress}
          onClose={() => setIsOpenAddress(false)}
        />
      )}
      {
        isOpenPassword && (
            <CustomerChangePassword onClose={()=> setIsOpenPassword(false)}/>
        )
      }
    </div>
  );
};

export default CustomerProfile;
