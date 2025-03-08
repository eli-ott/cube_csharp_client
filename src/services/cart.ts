import { toast } from "react-toastify";
import { ICart } from "../models/cartModel";
import { getTokenFromCookie } from "./authentification";
import { API_KEY, BASE_URL } from "../utils/env";

export const getCustomerCart = async (customerId: number): Promise<ICart | null> => {
  try {
    const token = getTokenFromCookie();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`,
      "x-api-key": API_KEY,
    };

    const response = await fetch(`${BASE_URL}/customers/${customerId}/get-cart`, {
      method: "GET",
      headers: headers,
      
    });
    if (!response.ok) throw new Error("Erreur lors de la récupération du panier");

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    } else {
      toast.error("Une erreur inconnue est survenue");
    }
    return null;
  }
};
