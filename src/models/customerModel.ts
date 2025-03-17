import { IAddress } from "./addressModel";
import { IOrder } from "./orderModel";
import { IPassword } from "./passwordModel";
import { IReview } from "./reviewModel";

export interface ICustomer {
    customerId:number;
    lastName:string;
    firstName:string;
    email :string;
    phone:string;
    address : IAddress;
    active:boolean;
    deletionTime:Date;
    creationTime:Date;
    updateTime:Date;
    validationId:string;
    password?:IPassword;
    reviews:IReview[];
    orders:IOrder[];
}
