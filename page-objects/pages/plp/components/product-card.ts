import type { Locator, Page } from '@playwright/test';
export default class ProductCard {
    readonly page: Page;
    // DOM ELEMENTS
    productDetailsLink: (productName: string) => Locator;
    productTitles: Locator;
    productImage: (productName: string) => Locator;
    addToCartButton: (productName: string) => Locator;
    addToWishlistButton: (productName: string) => Locator;
    productPrice: (productName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.productDetailsLink = (productName: string): Locator => {
            return this.page.locator('.card-title.my-2', { hasText: productName }).locator('..').locator('..');
        };

        this.productTitles = this.page.locator('.card-title.my-2');

        this.productImage = (productName: string): Locator => {
            return this.page
                .locator('.card-title.my-2', { hasText: productName })
                .locator('..')
                .locator('..')
                .locator('[mat-card-image]');
        };

        this.addToCartButton = (productName: string): Locator => {
            return this.page
                .locator('.card-title.my-2', { hasText: productName })
                .locator('..')
                .locator('app-addtocart');
        };

        this.addToWishlistButton = (productName: string): Locator => {
            return this.page
                .locator('.card-title.my-2', { hasText: productName })
                .locator('..')
                .locator('span', { hasText: 'favorite' });
        };

        this.productPrice = (productName: string): Locator => {
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
