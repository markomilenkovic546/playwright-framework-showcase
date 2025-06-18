import type { Locator, Page } from '@playwright/test';

export default class Cart {
    readonly page: Page;

    // LOCATORS
    readonly title: Locator;
    readonly clearCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartTotal: Locator;
    readonly checkoutButton: Locator;

    readonly cartRow: (productName: string) => Locator;
    readonly itemImage: (productName: string) => Locator;
    readonly itemPrice: (productName: string) => Locator;
    readonly itemQuantity: (productName: string) => Locator;
    readonly increaseQuantityButton: (productName: string) => Locator;
    readonly decreaseQuantityButton: (productName: string) => Locator;
    readonly itemTotalPrice: (productName: string) => Locator;
    readonly removeItemButton: (productName: string) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = this.page.locator('mat-card-title', { hasText: 'Shopping cart' });
        this.clearCartButton = this.page.locator('button', { hasText: 'Clear cart' });
        this.continueShoppingButton = this.page.locator('button', { hasText: 'Continue shopping' });
        this.cartTotal = this.page.locator('mat-card-content td strong').nth(1);
        this.checkoutButton = this.page.locator('button', { hasText: 'CheckOut' });

        this.cartRow = (productName: string): Locator => {
            return this.page.locator('mat-card-content tbody tr').filter({
                has: this.page.locator('a', { hasText: productName })
            });
        };

        this.itemImage = (productName: string): Locator => {
            return this.cartRow(productName).locator('img');
        };

        this.itemPrice = (productName: string): Locator => {
            return this.cartRow(productName).locator('.cdk-column-price.mat-column-price');
        };

        this.itemQuantity = (productName: string): Locator => {
            return this.cartRow(productName).locator('.cdk-column-quantity.mat-column-quantity div');
        };

        this.increaseQuantityButton = (productName: string): Locator => {
            return this.cartRow(productName)
                .locator('.cdk-column-quantity.mat-column-quantity mat-icon')
                .filter({ hasText: 'add_circle' });
        };

        this.decreaseQuantityButton = (productName: string): Locator => {
            return this.cartRow(productName)
                .locator('.cdk-column-quantity.mat-column-quantity mat-icon')
                .filter({ hasText: 'remove_circle' });
        };

        this.itemTotalPrice = (productName: string): Locator => {
            return this.cartRow(productName).locator('.cdk-column-total.mat-column-total');
        };

        this.removeItemButton = (productName: string): Locator => {
            return this.cartRow(productName).locator('mat-icon').filter({ hasText: 'delete' });
        };
    }

    // ACTIONS

    async increaseItemQuantity(productName: string): Promise<void> {
        await this.increaseQuantityButton(productName).click();
    }

    async decreaseItemQuantity(productName: string): Promise<void> {
        await this.decreaseQuantityButton(productName).click();
    }

    async removeItemFromCart(productName: string): Promise<void> {
        await this.removeItemButton(productName).click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async clearCart(): Promise<void> {
        await this.clearCartButton.click();
    }
}
