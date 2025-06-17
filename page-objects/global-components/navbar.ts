import type { Locator, Page } from '@playwright/test';

export default class NavBar {
    readonly homeButton: Locator;
    readonly searchBar: Locator;
    readonly wishlistBadge: Locator;
    readonly wishlistBadgeCounter: Locator;
    readonly cartBadge: Locator;
    readonly cartBadgeCounter: Locator;
    readonly loginButton: Locator;
    readonly accountDropdownButton: Locator;
    readonly swaggerButton: Locator;
    readonly githubButton: Locator;
    readonly accountDropdown: {
        myOrdersButton: Locator;
        logoutButton: Locator;
    };

    constructor(page: Page) {
        this.homeButton = page.locator('span', { hasText: ' Book Cart ' });
        this.searchBar = page.locator('[type="search"]');
        this.wishlistBadge = page.locator('mat-icon', { hasText: 'favorite' });
        this.wishlistBadgeCounter = this.wishlistBadge.locator('#mat-badge-content-1');
        this.cartBadge = page.locator('mat-icon', { hasText: 'shopping_cart' });
        this.cartBadgeCounter = this.cartBadge.locator('#mat-badge-content-0');
        this.loginButton = page.locator('app-nav-bar [mattooltip="Login"]');
        this.accountDropdownButton = page.locator('mat-icon', { hasText: 'arrow_drop_down' }).locator('..');
        this.swaggerButton = page.locator('a', { hasText: 'Swagger' });
        this.githubButton = page.locator('a', { hasText: 'GitHub' });

        this.accountDropdown = {
            myOrdersButton: page.locator('[role="menu"] >> text=My Orders'),
            logoutButton: page.locator('[role="menu"] >> text=Logout')
        };
    }

    async clickLogo() {
        await this.homeButton.click();
    }

    async searchProducts(query: string) {
        await this.searchBar.fill(query);
    }

    async openWishlist() {
        await this.wishlistBadge.click();
    }

    async openCart() {
        await this.cartBadge.click();
    }

    async openLoginPage() {
        await this.loginButton.click();
    }

    async openAccountDropdown() {
        await this.accountDropdownButton.click();
    }

    async openSwaggerUI() {
        await this.swaggerButton.click();
    }

    async openGithubRepo() {
        await this.githubButton.click();
    }

    async openMyOrders() {
        await this.accountDropdown.myOrdersButton.click();
    }

    async logout() {
        await this.accountDropdown.logoutButton.click();
    }
}
