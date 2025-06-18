export interface User {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    gender: string;
}

export interface Product {
    bookId: number;
    title: string;
    author: string;
    category: string;
    price: number;
    coverFileName: string;
}

export type FilterOptions = string[];

export interface ShippingAddress {
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    pincode?: string;
    state?: string;
}
