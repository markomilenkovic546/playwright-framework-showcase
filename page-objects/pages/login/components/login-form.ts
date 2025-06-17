import type { Locator, Page } from '@playwright/test';

export default class LoginForm {
    readonly page: Page;

    // LOCATORS
    readonly title: Locator;
    readonly registerButton: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly showPasswordButton: Locator;
    readonly hidePasswordButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = this.page.locator('mat-card-title', { hasText: 'Login' });
        this.registerButton = this.page.locator('button', { hasText: 'Register' });
        this.usernameField = this.page.locator('[placeholder="Username"]');
        this.passwordField = this.page.locator('[placeholder="Password"]');

        this.showPasswordButton = this.passwordField
            .locator('..')
            .locator('..')
            .locator('mat-icon', { hasText: 'visibility_off' });

        this.hidePasswordButton = this.passwordField
            .locator('..')
            .locator('..')
            .locator('mat-icon', { hasText: 'visibility' });

        this.loginButton = this.page.locator('mat-card-content button', {
            hasText: 'Login'
        });
    }

    // ACTIONS

    async openRegisterPage(): Promise<void> {
        await this.registerButton.click();
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async showPassword(): Promise<void> {
        await this.showPasswordButton.click();
    }

    async hidePassword(): Promise<void> {
        await this.hidePasswordButton.click();
    }

    async submitForm(): Promise<void> {
        await this.loginButton.click();
    }
}
