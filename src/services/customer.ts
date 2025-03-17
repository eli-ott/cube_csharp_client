import { getCustomerInfoFromToken, getTokenFromCookie } from "./authentification";
import { API_KEY, BASE_URL } from "../utils/env";
import { ICustomer } from "../models/customerModel";

export const getCustomerInfos = async (): Promise<ICustomer> => {
    try {
        const decodedToken = getCustomerInfoFromToken();
        const token = getTokenFromCookie();
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": API_KEY,
        };

        const response = await fetch(`${BASE_URL}/customers/${decodedToken.id}`, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) throw new Error("Customer not found");

        return (await response.json()) as ICustomer;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateCustomerInfos = async (customer: ICustomer) => {
    try {
        const decodedToken = getCustomerInfoFromToken();
        const token = getTokenFromCookie();
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": API_KEY,
        };

        const response = await fetch(`${BASE_URL}/customers/${decodedToken.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(customer),
        });

        if (!response.ok) throw new Error("Customer not updated");

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const updateCustomerPassword = async (oldPassword: string, password: string) => {
    try {
        const decodedToken = getCustomerInfoFromToken();
        const body = {
            previousPassword: oldPassword,
            password: password
        }
        const token = getTokenFromCookie();
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": API_KEY,
        };
        

        const response = await fetch(`${BASE_URL}/passwords/update/${decodedToken.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error("Password not updated");

    } catch (error) {
        console.error(error);
        throw error;
    }
}