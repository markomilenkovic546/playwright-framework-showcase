import type { Locator, Page } from '@playwright/test';
export default class ProductCard {
    readonly page: Page;
    // DOM ELEMENTS
    productDetailsLink: (productName: string) => Locator;
    productTitle:(productName: string) => Locator;
    productImage: (productName: string) => Locator;
    addToCartButton: (productName: string) => Locator;
    addToWishlistButton: (productName: string) => Locator;
    productPrice: (productName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.productDetailsLink = (productName)=> {
            return this.page.locator('.card-title.my-2', { hasText: productName }).locator('..').locator('..');
        };

        this.productTitle = (productName) => this.page.locator('.card-title.my-2', {hasText: productName});

        this.productImage = (productName) => {
            return this.page
                .locator('.card-title.my-2', { hasText: productName })
                .locator('..')
                .locator('..')
                .locator('[mat-card-image]');
        };

        this.addToCartButton = (productName) => {
            return this.page
                .locator('.card-title.my-2', { hasText: productName })
                .locator('..')
                .locator('app-addtocart');
        };

        this.addToWishlistButton = (productName) => {
            return this.page
                .locator('.card-title.my-2', { hasText: productName })
                .locator('..')
                .locator('span', { hasText: 'favorite' });
        };

        this.productPrice = (productName)=> {
            return this.page.locator('.card-title.my-2', { hasText: productName }).locator('..').locator('p');
        };
    }

    // ACTIONS
    async addProductToCart(productName: string): Promise<void> {
        await this.addToCartButton(productName).click();
    }

    async addProductToWishlist(productName: string): Promise<void> {
        await this.addToWishlistButton(productName).click();
    }

    async openProductDetailsPage(productName: string): Promise<void> {
        await this.productDetailsLink(productName).click();
    }
}
