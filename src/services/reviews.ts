import { IReview } from "../models/reviewModel";
import { API_KEY, BASE_URL } from "../utils/env";
import { getTokenFromCookie } from "./authentification";

const getCustomerProductReview = async (
  customerId: number,
  productId: number
): Promise<IReview | null> => {
  try {
    const token = getTokenFromCookie();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    };

    const url = new URL(
      `${BASE_URL}/customers/${customerId}/products/${productId}/review`
    );

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération de l'avis");

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

interface IUpdateCustomerProductReview {
  customerId: number;
  productId: number;
  rating: number;
  comment: string;
}

const updateCustomerProductReview = async ({
  customerId,
  productId,
  rating,
  comment,
}: IUpdateCustomerProductReview): Promise<IReview | null> => {
  try {
    const token = getTokenFromCookie();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    };

    const url = new URL(`${BASE_URL}/reviews`);

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ userId: customerId, productId, rating, comment }),
    });

    if (!response.ok)
      throw new Error("Erreur lors de la mise à jour de l'avis");

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("Une erreur inconnue est survenue");
    }
  }
  return null;
};

interface ICreateCustomerProductReview {
  customerId: number;
  productId: number;
  rating: number;
  comment: string;
}

const createCustomerProductReview = async ({
  customerId,
  productId,
  rating,
  comment,
}: ICreateCustomerProductReview): Promise<IReview | null> => {
  try {
    const token = getTokenFromCookie();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    };

    const url = new URL(`${BASE_URL}/reviews`);

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ userId: customerId, productId, rating, comment }),
    });

    if (!response.ok) throw new Error("Erreur lors de la création de l'avis");

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    } else {
      console.error("Une erreur inconnue est survenue");
    }
  }
  return null;
};

export { getCustomerProductReview, updateCustomerProductReview, createCustomerProductReview };
