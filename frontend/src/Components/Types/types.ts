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
    totalPrice? : number | string
}
export type labours = {
    id?:number,
    name?:string,
    price?:number,
}
export interface personalInfo {
    id?:number,
    label?:string,
    client?:string,
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
}
export interface BillFormData extends personalInfo {
    parts? : partsData[]
    labours? : labours[],
    totalValue? : number | string,
    totaltaxbill? : number
}

// reports page
type reportParts = {
    id:number,
    name:string,
    status:string
}[]
export interface reportData extends personalInfo {
    notes? : string,
    reportParts? : reportParts[]
}


// spareparts

export type sparepartTableData = {
    id?: number,
    name?: string,
    code?:string,
    qnt?:number | string,
    price?:number | string,
    date?:string,
    notes?:string
}

// client

export type clients = {
    id?:number
    name?:string
    phone?:string
    car?:string,
    chassie?:string
    motor?:string
    color?:string
}