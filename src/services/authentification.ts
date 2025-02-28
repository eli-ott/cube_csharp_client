import { IConfirmAccount, IRegister } from "../models/authentificationModel";

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

export const confirmAccount = async ({ email, guid }: IConfirmAccount) => {
  try {
    const confirmingData = {
      email: email,
      guid: guid,
    };
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY as string,
    };
    const response = await fetch(
      `${BASE_URL}/customers/confirm-registration/${confirmingData.email}/${confirmingData.guid}`,
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
