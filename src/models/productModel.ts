import { IDiscount } from "./discountModel";
import { IFamily } from "./familyModel";
import { IImage } from "./imageModel";
import { IReview } from "./reviewModel";
import { ISupplier } from "./supplierModel";

export interface IProduct {
    productId: number;
    name: string;
    year: string;
    producerName: string;
    description: string;
    isBio: boolean;
    unitPrice?: number;
    boxPrice?: number;
    quantity: number;
    autoRestock: boolean;
    autoRestockTreshold: number;
    deletionTime?: string;
    updateTime: string;
    creationTime: string;
    family: IFamily;
    supplier: ISupplier;
    images: Array<IImage>;
    reviews: Array<IReview>;
    discount: IDiscount;
}