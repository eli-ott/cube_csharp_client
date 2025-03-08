import { IPagedResponse } from "../models/pagedModel";
import { IProduct } from "../models/productModel";
import { API_KEY, BASE_URL } from "../utils/env";

interface IProductQuery {
  name?: string;
  page?: number;
}

const getProducts = async (query?: IProductQuery): Promise<IPagedResponse<IProduct> | null> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    };

    const url = new URL(`${BASE_URL}/products`);
    if (query?.name) url.searchParams.append("name", query.name);
    if (query?.page) url.searchParams.append("page", query.page.toString());

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

export { getProducts };
