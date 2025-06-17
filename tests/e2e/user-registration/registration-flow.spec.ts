import { test, expect } from '../../../page-objects/test.fixture';
import { User } from 'types';

test.describe('@desktop Registration flow', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can register successfully',
        { tag: ['@smoke', '@registration'] },
        async ({ registrationPage, loginPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });

            await loginPage.login(user.username!, user.password!);

            await expect(loginPage.navbar.accountDropdownButton).toContainText(user.username!);
        }
    );
});

test.describe('@mobile Registration flow', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can register successfully',
        { tag: ['@smoke', '@registration'] },
        async ({ registrationPage, loginPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });

            await loginPage.login(user.username!, user.password!);

            await expect(loginPage.navbar.accountDropdownButton).toContainText(user.username!);
        }
    );
});

test.describe('@tablet Registration flow', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can register successfully',
        { tag: ['@smoke', '@registration'] },
        async ({ registrationPage, loginPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });

            await loginPage.login(user.username!, user.password!);

            await expect(loginPage.navbar.accountDropdownButton).toContainText(user.username!);
        }
    );
});
