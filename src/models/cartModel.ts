import { IProduct } from "./productModel";

export interface ICartLine {
    product : IProduct;
    quantity:number;
    isSetAside:boolean;
    updateTime:string;
    creationTime:string;
}

export interface ICart {
    cartId : number;
    updateTime: string;
    creationTime : string;
    cartLines: Array<ICartLine>;
}