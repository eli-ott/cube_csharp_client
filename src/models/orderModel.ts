import { IProduct } from "./productModel";


export interface IStatus {
    statusId: number;
    name: string;
    deletionTime: string;
}

export interface IOrderLine {
    quantity: number;
    unitPrice: number;
    updateTime: string;
    creationTime: string;
    deletionTime: string;
    product: IProduct;
}

export interface IOrder {
    orderId: number;
    deliveryDate: string;
    deletionTime: string;
    updateTime: string;
    creationTime: string;
    customer: string;
    status: IStatus;
    lines: IOrderLine[];
}