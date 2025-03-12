export interface IPassword {
    passwordId:number;
    passwordHash:string;
    passwordSalt:string;
    attemptCount:number;
    resetDate:Date;
    deletionDate:Date;
    creationDate:Date;
    updateTime:Date;
}