import { test, expect } from '../../../page-objects/test.fixture';
import { User } from 'types';

test.describe('@desktop Registration page navigation', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Login page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'Navbar is present on the Login page',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/
            await expect(registrationPage.navbar.homeButton).toBeVisible();

            await expect(registrationPage.navbar.searchBar).toBeVisible();

            await expect(registrationPage.navbar.cartBadge).toBeVisible();

            await expect(registrationPage.navbar.loginButton).toBeVisible();

            await expect(registrationPage.navbar.swaggerButton).toBeVisible();

            await expect(registrationPage.navbar.githubButton).toBeVisible();
        }
    );

    test(
        'User can navigate from Login page to Registration page',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, loginPage, page }) => {
            /** STEPS **/

            await registrationPage.registrationForm.goToLoginPage();

            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });
        }
    );

    test(
        'All expected elements are present on the Registration form',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/
            await expect(registrationPage.registrationForm.goToLoginButton).toBeVisible();

            await expect(registrationPage.registrationForm.firstNameField).toBeVisible();

            await expect(registrationPage.registrationForm.lastNameField).toBeVisible();

            await expect(registrationPage.registrationForm.usernameField).toBeVisible();

            await expect(registrationPage.registrationForm.passwordField).toBeVisible();
            
            await expect(registrationPage.registrationForm.confirmPasswordField).toBeVisible();

            await expect(registrationPage.registrationForm.genderRadio('Male')).toBeVisible();

            await expect(registrationPage.registrationForm.genderRadio('Female')).toBeVisible();

            await expect(registrationPage.registrationForm.submitButton).toBeVisible();
        }
    );
});
