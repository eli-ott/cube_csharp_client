import { IAddress } from "./addressModel";
import { IProduct } from "./productModel";

export interface ISupplier {
    id: number;
    lastName: string;
    firstName: string;
    contact: string;
    email: string;
    phone: string;
    siret: string;
    deletionTime?: string;
    creationTime: string;
    updateTime: string;
    address: IAddress;
    products?: Array<IProduct>;
}