export interface IReview {
    userId : number;
    productId:number;
    rating:number;
    comment?:string;
    customerFirstName?:string;
    customerLastName?:string;
    updateTime:string;
    creationTime:string;
}