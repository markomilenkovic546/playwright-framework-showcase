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
    }): Promise<any> {
        let body: any;
        await expect(async () => {
            const response = await this.request.post(`${process.env.API_BASE_URL}/user`, {
                data: payload
            });

            if (response.status() !== 201) {
                throw new Error(`Failed to register user: ${response.status()} - ${await response.text()}`);
            }
            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });
        return body;
    }

    async login(payload: { username: string; password: string }): Promise<LoginResBody> {
        let body!: LoginResBody;
        await expect(async () => {
            const response = await this.request.post(`${process.env.API_BASE_URL}/login`, {
                data: payload
            });

            if (response.status() !== 200) {
                throw new Error(`Failed to log in: ${response.status()} - ${await response.text()}`);
            }
            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getProducts(): Promise<Product[]> {
        let body!: Product[];
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/book`);
            console.log(`${process.env.API_BASE_URL}/book`);

            if (response.status() !== 200) {
                throw new Error(`Failed to get products: ${response.status()} - ${await response.text()}`);
            }

            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getSingleProduct(productId: string): Promise<GetSingleProductRes> {
        let body!: GetSingleProductRes;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/book/${productId}`);

            if (response.status() !== 200) {
                throw new Error(`Failed to get single product: ${response.status()} - ${await response.text()}`);
            }
            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getProductCategoriesList(): Promise<any> {
        let body: any;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/getCategoriesList`);

            if (response.status() !== 200) {
                throw new Error(
                    `Failed to get product categories list: ${response.status()} - ${await response.text()}`
                );
            }
            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getOrders(userId: string, authToken: string): Promise<any> {
        let body: any;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/order/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status() !== 200) {
                throw new Error(`Failed to get orders: ${response.status()} - ${await response.text()}`);
            }
            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async getShoppingCart(userId: string): Promise<any> {
        let body: any;
        await expect(async () => {
            const response = await this.request.get(`${process.env.API_BASE_URL}/shoppingCart/${userId}`);

            if (response.status() !== 200) {
                throw new Error(`Failed to get shopping cart: ${response.status()} - ${await response.text()}`);
            }
            body = await response.json();
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });

        return body;
    }

    async clearShoppingCart(userId: string): Promise<void> {
        await expect(async () => {
            const response = await this.request.delete(`${process.env.API_BASE_URL}/shoppingCart/${userId}`, {
                headers: { Accept: 'application/json' }
            });

            if (response.status() !== 200) {
                throw new Error(`Failed to clear shopping cart: ${response.status()} - ${await response.text()}`);
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
                throw new Error(`Failed to add product to cart: ${response.status()} - ${await response.text()}`);
            }
        }).toPass({ intervals: [5000, 3000, 3000], timeout: 15000 });
    }
}
