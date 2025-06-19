// Test data types

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    gender: string;
}


export type FilterOptions = string[];

export interface ShippingAddress {
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    pincode?: string;
    state?: string;
}

// API response body types

export interface LoginResBody {
    token: string;
    userDetails: {
        userId: number;
        username: string;
        userTypeName: string;
    };
}

export interface GetSingleProductRes {
    bookId: number;
    title: string;
    author: string;
    category: string;
    price: number;
    coverFileName: string;
}

export type GetProductsRes = GetSingleProductRes[];

export interface GetCartResBody {
    book: {
      bookId: number;
      title: string;
      author: string;
      category: string;
      price: number;
      coverFileName: string;
    };
    quantity: number;
  }
  