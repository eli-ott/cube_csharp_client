import { IFamily } from "../models/familyModel";
import { IPagedResponse } from "../models/pagedModel";
import { IProduct } from "../models/productModel";
import { API_KEY, BASE_URL } from "../utils/env";
import { getCustomerInfoFromToken, getTokenFromCookie } from "./authentification";

interface IProductQuery {
  name?: string;
  page?: number;
  is_bio?: boolean;
  family_id?: number;
  price_min?: number;
  price_max?: number;
}

const getProducts = async (
  query?: IProductQuery
): Promise<IPagedResponse<IProduct> | null> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    const url = new URL(`${BASE_URL}/products`);
    if (query?.name) url.searchParams.append("name", query.name);
    if (query?.page) url.searchParams.append("page", query.page.toString());
    if (query?.is_bio !== undefined)
      url.searchParams.append("is_bio", query.is_bio.toString());
    if (query?.family_id)
      url.searchParams.append("family_id", query.family_id.toString());
    if (query?.price_min)
      url.searchParams.append("price_min", query.price_min.toString());
    if (query?.price_max)
      url.searchParams.append("price_max", query.price_max.toString());

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des produits");

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

interface IFamilyQuery {
  page?: number;
  search?: string;
}

const getFamilies = async (
  query?: IFamilyQuery
): Promise<IPagedResponse<IFamily> | null> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    const url = new URL(`${BASE_URL}/families`);
    if (query?.page) url.searchParams.append("page", query.page.toString());
    if (query?.search) url.searchParams.append("name", query.search);
    if (query?.search) url.searchParams.append("size", "50");

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok)
      throw new Error("Erreur lors de la récupération des familles");

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

interface IAddToCart {
  productId: number;
  quantity: number;
}

const addProductToCart = async ({ productId, quantity }: IAddToCart) => {
  try {
    const token = getTokenFromCookie();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "Authorization": `Bearer ${token}`
    };
    
    const body: IAddToCart = {
      productId,
      quantity
    };

    const userInfos = getCustomerInfoFromToken();
    const url = new URL(`${BASE_URL}/customers/${userInfos?.id}/add-to-cart`);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      const errorMessage = data?.ExceptionMessage || data?.message || `Erreur ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data || { success: true }; 

  } catch (error: any) {
    console.error("Erreur lors de l'ajout au panier :", error.message);
    return { success: false, message: error.message };
  }
};

export { getProducts, getFamilies, addProductToCart };
