import { test, expect } from '../../../support/test.fixture';
import { User } from 'types';
import testUser from '../../../static-test-data/user.json';

test.describe('User authentication', () => {
    test.beforeEach(async ({ loginPage, productListingPage, page }) => {
        // Open Product Listing Page
        await productListingPage.open();
        await expect(page).toHaveURL(new RegExp(productListingPage.path), {
            timeout: 10000
        });

        // Clear local storage
        await page.evaluate(() => {
            localStorage.clear();
        });
        await page.reload();

        // Navigate to Login page
        await productListingPage.navbar.openLoginPage();
        await expect(page).toHaveURL(new RegExp(loginPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can log in with valid input',
        { tag: ['@smoke', '@login', '@desktop', '@mobile', '@tablet'] },
        async ({ productListingPage, loginPage, page }) => {
            // Prepare test data
            const user: User = testUser;

            /** STEPS **/
            await loginPage.loginForm.enterUsername(user.username!);
            await expect(loginPage.loginForm.usernameField).toHaveValue(user.username!);

            await loginPage.loginForm.enterPassword(user.password!);
            await expect(loginPage.loginForm.passwordField).toHaveValue(user.password!);

            await loginPage.loginForm.submitForm();
            await expect(page).toHaveURL(new RegExp(productListingPage.path), {
                timeout: 10000
            });
            await expect(loginPage.navbar.accountDropdownButton).toContainText(user.username!);
        }
    );

    test(
        'User cannot log in with invalid password',
        { tag: ['@regression', '@login', '@desktop'] },
        async ({ loginPage, page }) => {
            // Prepare test data
            const user: User = testUser;

            /** STEPS **/
            await loginPage.loginForm.enterUsername(user.username!);
            await expect(loginPage.loginForm.usernameField).toHaveValue(user.username!);

            await loginPage.loginForm.enterPassword(user.password! + 'a');
            await expect(loginPage.loginForm.passwordField).toHaveValue(user.password! + 'a');

            await loginPage.loginForm.submitForm();
            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });
        }
    );

    test(
        'User cannot log in if password field is empty',
        { tag: ['@regression', '@login', '@desktop'] },
        async ({ loginPage, page }) => {
            // Prepare test data
            const user: User = testUser;

            /** STEPS **/
            await loginPage.loginForm.enterUsername(user.username!);
            await expect(loginPage.loginForm.usernameField).toHaveValue(user.username!);

            await loginPage.loginForm.submitForm();
            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });
        }
    );
});
