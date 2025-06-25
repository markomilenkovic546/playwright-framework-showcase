import { APIRequestContext } from '@playwright/test';
import { GetProductsRes, GetSingleProductRes, LoginResBody, Product } from 'types';
import { expect } from '../support/test.fixture';

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
        let body: unknown;
        await expect(async () => {
            const response = await this.request.post(`${process.env.API_BASE_URL}/user`, {
                data: payload
            });

            body = await response.json();

            if (response.status() !== 201) {
                throw new Error(`Request failed: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });
        return body;
    }

    async login(payload: { username: string; password: string }): Promise<LoginResBody> {
        let body: unknown;
        await expect(async () => {
            const response = await this.request.post(`${process.env.API_BASE_URL}/login`, {
                data: payload
            });

            body = await response.json();

            if (response.status() !== 200) {
                throw new Error(`Request failed: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body as LoginResBody;
    }

    async getProducts(): Promise<Product[]> {
        let body: unknown;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/book`);
            body = await response.json();

            if (response.status() !== 200) {
                throw new Error(`Request failed: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body as Product[];
    }

    async getSingleProduct(productId: string): Promise<GetSingleProductRes> {
        let body: unknown;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/book/${productId}`);
            body = await response.json();

            if (response.status() !== 200) {
                throw new Error(`Request failed: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body as GetSingleProductRes;
    }

    async getProductCategoriesList(): Promise<unknown> {
        let body: unknown;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/getCategoriesList`);
            body = await response.json();

            if (response.status() !== 200) {
                throw new Error(`Request failed: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getOrders(userId: string, authToken: string): Promise<unknown> {
        let body: unknown;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/order/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            body = await response.json();

            if (response.status() !== 200) {
                throw new Error(`Failed to get orders: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getShoppingCart(userId: string): Promise<unknown> {
        let body: unknown;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/shoppingCart/${userId}`);
            body = await response.json();

            if (response.status() !== 200) {
                throw new Error(`Failed to get Cart: ${JSON.stringify(body)}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async clearShoppingCart(userId: string): Promise<void> {
        await expect(async () => {
            const response = await this.request.delete(`${process.env.API_BASE_URL}/shoppingCart/${userId}`, {
                headers: { Accept: 'application/json' }
            });

            if (response.status() !== 200) {
                throw new Error(`Failed to clear cart, status: ${response.status()}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });
    }

    async addToCart(userId: string, productId: string): Promise<void> {
        await expect(async () => {
            const response = await this.request.post(
                `${process.env.API_BASE_URL}/shoppingCart/addToCart/${userId}/${productId}`,
                {
                    headers: { Accept: 'application/json' }
                }
            );

            if (response.status() !== 200) {
                throw new Error(`Failed to add to cart, status: ${response.status()}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });
    }
}
