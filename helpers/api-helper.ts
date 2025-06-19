import { APIRequestContext } from '@playwright/test';
import { GetProductsRes, GetSingleProductRes, LoginResBody } from 'types';

export default class APIHelper {
    constructor(private request: APIRequestContext) {}

    async registerUser(payload: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        confirmPassword: string;
        gender: string;
    }): Promise<unknown> {
        const response = await this.request.post(`${process.env.API_BASE_URL}/User`, {
            data: payload
        });

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async login(payload: { username: string; password: string }): Promise<LoginResBody> {
        const response = await this.request.post(`${process.env.API_BASE_URL}/Login`, {
            data: payload
        });

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async getProducts(): Promise<GetProductsRes> {
        const response = await this.request.get(`${process.env.API_BASE_URL}/Book`);

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async getSingleProduct(productId: string): Promise<GetSingleProductRes> {
        const response = await this.request.get(`${process.env.API_BASE_URL}/Book/${productId}`);

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async getProductCategoriesList() {
        const response = await this.request.get(`${process.env.API_BASE_URL}/GetCategoriesList`);

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async getOrders(userId: string, authToken: string) {
        const response = await this.request.get(`${process.env.API_BASE_URL}/Order/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async getShoppingCart(userId: string): Promise<unknown> {
        const response = await this.request.get(`${process.env.API_BASE_URL}/ShoppingCart/${userId}`);

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }

    async clearShoppingCart(userId: string): Promise<unknown>  {
        const response = await this.request.delete(`${process.env.API_BASE_URL}/ShoppingCart/${userId}`);

        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Request failed: ${body.error || 'Unknown error'}`);
        }

        return body;
    }
}
