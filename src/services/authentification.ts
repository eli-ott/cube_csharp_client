import { jwtDecode } from "jwt-decode";
import {
  IConfirmAccount,
  IRegister,
  ILogin,
} from "../models/authentificationModel";
import { API_KEY, BASE_URL } from "../utils/env";

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};


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

    const response = await fetch(`${BASE_URL}/customers/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Erreur lors de la connexion");

    const data = await response.json();
    const token = data.token;

    if (token) {

      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 12}; secure`;

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const confirmAccount = async ({
  email,
  guid,
}: IConfirmAccount): Promise<boolean> => {
  try {
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

export const sendResetPasswordMail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/customers/request-password-reset`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({email:email})
      });

    if (!response.ok) throw new Error("Erreur lors de la demande.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const validatePasswordReset = async (guid : string, newPassword : string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/customers/reset-password/${guid}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({password:newPassword})
      });

    if (!response.ok) throw new Error("Erreur lors de la validation du nouveau mot de passe.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
} 


export const getTokenFromCookie = (): any => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}


export const getCustomerInfoFromToken = (): any => {
  const token = getTokenFromCookie();
  if (token) {
    const decodedToken = jwtDecode<any>(token);
    return {
      id: parseInt(decodedToken.CustomerID),
      firstName: decodedToken.FirstName,
      email: decodedToken.Email,
      cartId: decodedToken.CartId,
    };
  }
  return null;
};


export const logOut = (): void => {
  document.cookie = "token=; path=/; max-age=0;";
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = "/";
};
