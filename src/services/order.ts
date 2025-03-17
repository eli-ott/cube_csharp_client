import { IOrder } from "../models/orderModel";
import { IPagedResponse } from "../models/pagedModel";
import { API_KEY, BASE_URL } from "../utils/env";
import { getCustomerInfoFromToken, getTokenFromCookie } from "./authentification";

interface IOrderQuery {
  name?: string;
  page?: number;
  is_bio?: boolean;
  family_id?: number;
  price_min?: number;
  price_max?: number;
}

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
  "Authorization": `Bearer ${getTokenFromCookie()}`,
};

export const getOrder = async (
  query?: IOrderQuery
): Promise<IPagedResponse<IOrder> | null> => {
  try {
    const decodedToken = getCustomerInfoFromToken();
    const url = new URL(`${BASE_URL}/orders/?customer_id=${decodedToken.id}`);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des commandes");

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("Une erreur inconnue est survenue");
    }
    return null;
  }
};

export const getOrderById = async( orderId:string ): Promise<IOrder | null> => {
  try {
    const url = new URL(`${BASE_URL}/orders/${orderId}`);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération du détails de la commande");

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("Une erreur inconnue est survenue");
    }
    return null;
  }
};