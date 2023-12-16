import { ReactElement } from "react"

// Redux Types
export type authType = {
    auth:boolean
}

export type apiParamsType = {
    page?:number,
    size?:number,
    searchValue?:string,
    col?:string|null,
    dir?:string|null
}

export type DispatchFunction = <T>(action: T) => T;

export interface HttpError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export type billState = {
    bills : {
        id?:number,
        name?:string
    }[]
}

// App Types

export type navbarPropsType = {
    collapse:boolean
}

export type navbarLinksType =  {
    id:number,
    name:string,
    nameAr:string,
    icon:ReactElement,
    path:string
}[]

export type billItemData = {
    id:number,
    name:string,
    date:string,
    type:string,
    car:string
}

export type latestBillItemDataType ={
    data : billItemData
}

export type latestBillItemType = billItemData[]

export type billTableData = {
    id?: number;
    name?: string;
    date?: string;
    carType?: string;
    chassie?: string;
    motor?: string;
    color?: string;
}
export type partsData = {
    id?:number,
    name?:string,
    code?:number|string,
    price?:number,
    amount?: number|string,
    totalPrice? : number
}
export type labours = {
    id?:number,
    name?:string,
    price?:number,
}
export type BillFormData = {
    name?:string,
    phoneNumber? : number | string
    brand?:string,
    model?:string | number,
    paletNumber? : string,
    chassis? : number | string,
    motor? : number | string,
    odometer?:number | string,
    color?:string,
    inDate? :string,
    outDate? : string,
    parts? : partsData[]
    labours? : labours[],
    totalValue? : number,
    totaltaxbill? : number
}
