export interface IAddress {
    id: number;
    addressLine: string;
    city: string;
    zipCode: string;
    country: string;
    complement: string;
    deletiontime?: string;
    updateTime: string;
    creationTime: string;
}