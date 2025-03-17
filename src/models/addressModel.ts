export interface IAddress {
    id: number;
    addressLine: string;
    city: string;
    zipCode: string;
    country: string;
    complement: string | null;
    deletiontime?: string;
    updateTime: string;
    creationTime: string;
}