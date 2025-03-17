import { toast } from "react-toastify";
import { ICart } from "../models/cartModel";
import { getCustomerInfoFromToken, getTokenFromCookie } from "./authentification";
import { API_KEY, BASE_URL } from "../utils/env";

export const getCustomerCart = async (): Promise<ICart | null> => {
  try {
    const decodedToken = getCustomerInfoFromToken();
    const token = getTokenFromCookie();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    };

    const response = await fetch(`${BASE_URL}/customers/${decodedToken.id}/get-cart`, {
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

export const changeQuantity = async (productId: number, quantity: number) => {
  try {
    const token = getTokenFromCookie();
    const decodedToken = getCustomerInfoFromToken();
    const cartId = parseInt(decodedToken.cartId);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    };


    const body = {
      productId,
      cartId,
      quantity
    }


    const response = await fetch(`${BASE_URL}/cart-lines`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Erreur lors de la modification de la quantité");

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    } else {
      toast.error("Une erreur inconnue est survenue");
    }
    return null;
  }
};


export const deleteCartLine = async (productId: number) => {
  try {
    const token = getTokenFromCookie();
    const decodedToken = getCustomerInfoFromToken();
    const cartId = parseInt(decodedToken.cartId);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    };


    const body = {
      productId,
      cartId
    }


    const response = await fetch(`${BASE_URL}/cart-lines`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Erreur lors de la suppression de la quantité");
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    } else {
      toast.error("Une erreur inconnue est survenue");
    }
    return null;
  }
};


export const toggleSetAsideItem = async (productId: number) => {
  try {
    const token = getTokenFromCookie();
    const decodedToken = getCustomerInfoFromToken();
    const cartId = parseInt(decodedToken.cartId);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": API_KEY,
    };


    const body = {
      productId,
      cartId
    }


    const response = await fetch(`${BASE_URL}/cart-lines/toggle-set-aside`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Erreur lors de la mise de côté de l'article.");
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
    } else {
      toast.error("Une erreur inconnue est survenue");
    }
    return null;
  }
};