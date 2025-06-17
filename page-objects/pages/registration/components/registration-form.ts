import type { Locator, Page } from '@playwright/test';
import { expect } from '../../../test.fixture';
import { User } from 'types';

export default class RegistrationForm {
    readonly page: Page;
    // DOM ELEMENTS
    readonly goToLoginButton: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly genderRadio: (gender: string) => Locator;
    readonly submitButton: Locator;
    readonly passwordStrengthError: Locator;
    readonly passwordMatchError: Locator;
    readonly firstNameRequiredError: Locator;
    readonly lastNameRequiredError: Locator;
    readonly usernameRequiredError: Locator;
    readonly passwordRequiredError: Locator;
    readonly confirmPasswordRequiredError: Locator;
    readonly hidePasswordToggle: Locator;
    readonly showPasswordToggle: Locator;
    readonly hideConfirmationPasswordToggle: Locator;
    readonly showConfirmationPasswordToggle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.goToLoginButton = this.page.locator('button', { hasText: 'Login' });
        this.firstNameField = this.page.locator('[placeholder="First name"]');
        this.lastNameField = this.page.locator('[placeholder="Last Name"]');
        this.usernameField = this.page.locator('[placeholder="User name"]');
        this.passwordField = this.page.locator('[placeholder="Password"]');
        this.confirmPasswordField = this.page.locator(
            '[placeholder="Confirm Password"]'
        );
        this.genderRadio = (gender) => this.page.getByLabel(gender).nth(0);
        this.submitButton = this.page.locator('button', { hasText: 'Register' });
        this.passwordStrengthError = this.page.locator('mat-error', {
            hasText:
                ' Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number '
        });
        this.passwordMatchError = this.page.locator('mat-error', {
            hasText: '  Password do not match '
        });

        this.firstNameRequiredError = this.page.locator('mat-error', {
            hasText: 'First Name is required'
        });

        this.lastNameRequiredError = this.page.locator('mat-error', {
            hasText: 'Last Name is required'
        });

        this.usernameRequiredError = this.page.locator('mat-error', {
            hasText: 'User Name is required'
        });

        this.passwordRequiredError = this.page.locator('mat-error', {
            hasText: 'Password is required'
        });

        this.confirmPasswordRequiredError = this.page.locator('mat-error', {
            hasText: 'Password is required'
        });

        this.showPasswordToggle = this.passwordField
            .locator('..')
            .locator('..')
            .locator('mat-icon', { hasText: 'visibility_off' });

        this.hidePasswordToggle = this.passwordField
            .locator('..')
            .locator('..')
            .locator('mat-icon', { hasText: 'visibility' });

        this.showConfirmationPasswordToggle = this.confirmPasswordField
            .locator('..')
            .locator('..')
            .locator('mat-icon', { hasText: 'visibility_off' });

        this.hideConfirmationPasswordToggle = this.confirmPasswordField
            .locator('..')
            .locator('..')
            .locator('mat-icon', { hasText: 'visibility' });
    }

    // ACTIONS

    async goToLoginPage(): Promise<void> {
        await this.goToLoginButton.click();
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameField.fill(lastName);
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async confirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordField.fill(confirmPassword);
    }

    async selectGender(gender: string): Promise<void> {
        await this.genderRadio(gender).check();
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async showPassword(): Promise<void> {
        await this.showPasswordToggle.click();
    }

    async hidePassword(): Promise<void> {
        await this.hidePasswordToggle.click();
    }
    async showConfirmationPassword(): Promise<void> {
        await this.showConfirmationPasswordToggle.click();
    }

    async hideConfirmationPassword(): Promise<void> {
        await this.hideConfirmationPasswordToggle.click();
    }

    async fillForm(user: User): Promise<void> {
        if (user.firstName) {
            await this.enterFirstName(user.firstName);
            await expect(this.firstNameField).toHaveValue(user.firstName);
        }

        if (user.lastName) {
            await this.enterLastName(user.lastName);
            await expect(this.lastNameField).toHaveValue(user.lastName);
        }

        if (user.username) {
            await this.enterUsername(user.username);
            await expect(this.usernameField).toHaveValue(user.username);
        }

        if (user.password) {
            await this.enterPassword(user.password);
            await expect(this.passwordField).toHaveValue(user.password);
        }

        if (user.password) {
            await this.confirmPassword(user.password);
            await expect(this.confirmPasswordField).toHaveValue(user.password);
        }

        if (user.gender) {
            await this.selectGender(user.gender);
            await expect(this.genderRadio(user.gender)).toBeChecked();
        }
    }
}
