import { test, expect } from '../../../page-objects/test.fixture';
import { User } from 'types';
import testUser from '../../../static-test-data/user.json';

test.describe('@desktop User authentication', () => {
    test.beforeEach(async ({ loginPage, productListingPage, page }) => {
        // Open Product Listing Page
        await productListingPage.open();
        await expect(page).toHaveURL(new RegExp(productListingPage.path), {
            timeout: 10000
        });

        await productListingPage.navbar.openLoginPage();
        await expect(page).toHaveURL(new RegExp(loginPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can login with valid input',
        { tag: ['@smoke', '@login'] },
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
        'User cannot login with invalid password',
        { tag: ['@regression', '@login'] },
        async ({ productListingPage, loginPage, page }) => {
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
        'User cannot login if password field is empty',
        { tag: ['@regression', '@login'] },
        async ({ productListingPage, loginPage, page }) => {
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

test.describe('@mobile User authentication', () => {
    test.beforeEach(async ({ loginPage, productListingPage, page }) => {
        // Open Product Listing Page
        await productListingPage.open();
        await expect(page).toHaveURL(new RegExp(productListingPage.path), {
            timeout: 10000
        });

        await productListingPage.navbar.openLoginPage();
        await expect(page).toHaveURL(new RegExp(loginPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can login with valid input',
        { tag: ['@smoke', '@login'] },
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
});

test.describe('@tablet User authentication', () => {
    test.beforeEach(async ({ loginPage, productListingPage, page }) => {
        // Open Product Listing Page
        await productListingPage.open();
        await expect(page).toHaveURL(new RegExp(productListingPage.path), {
            timeout: 10000
        });

        await productListingPage.navbar.openLoginPage();
        await expect(page).toHaveURL(new RegExp(loginPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can login with valid input',
        { tag: ['@smoke', '@login'] },
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
});
