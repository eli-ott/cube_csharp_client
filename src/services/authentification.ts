import {
  IConfirmAccount,
  IRegister,
  ILogin,
} from "../models/authentificationModel";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const register = async ({
  lastName,
  firstName,
  email,
  phoneNumber,
  password,
  address,
  optionnalInfos,
  city,
  country,
  zipCode,
}: IRegister): Promise<boolean> => {
  try {
    const registerData = {
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      email: email,
      password: password,
      address: {
        addressLine: address,
        city: city,
        zipCode: zipCode,
        country: country,
        complement: optionnalInfos,
      },
    };
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY as string,
    };

    const response = await fetch(`${BASE_URL}/customers/register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(registerData),
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout");
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const login = async ({ email, password }: ILogin): Promise<boolean> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY as string,
    };

    const response = await fetch(`${BASE_URL}/customers/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Erreur lors de la connexion");

    const data = await response.json();
    let token = data["token"];

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${
        60 * 60 * 12
      }; secure`;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const confirmAccount = async ({
  email,
  guid,
}: IConfirmAccount): Promise<boolean> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY as string,
    };
    const response = await fetch(
      `${BASE_URL}/customers/confirm-registration/${email}/${guid}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Erreur lors de la confirmation");
    return response.ok;
  } catch (error) {
    return false;
  }
};


export const getTokenFromCookie = () : any =>{
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}

export const logOut = () => {
  document.cookie = "token=; path=/; max-age=0;";
  sessionStorage.clear();
};