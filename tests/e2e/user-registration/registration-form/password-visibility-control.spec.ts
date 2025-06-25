import { test, expect } from '../../../../support/test.fixture';
import { User } from 'types';

test.describe.skip('@desktop Password Visibility Toggle', () => {
    let user: User;

    test.beforeEach(async ({ registrationPage, page, dataFactory }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });

        // Prepare test data
        user = dataFactory.createValidUserData();
    });

    test(
        'Password value is hidden by default',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/

            registrationPage.registrationForm.enterPassword(user.password!);

            await expect(registrationPage.registrationForm.passwordField).toHaveAttribute('type', 'password');
        }
    );

    test(
        'Confirm Password value is hidden by default',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/

            registrationPage.registrationForm.confirmPassword(user.password!);

            await expect(registrationPage.registrationForm.confirmPasswordField).toHaveAttribute('type', 'password');
        }
    );

    test(
        'User can reveal password by clicking the visibility toggle',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/

            registrationPage.registrationForm.enterPassword(user.password!);

            registrationPage.registrationForm.showPassword();

            await expect(registrationPage.registrationForm.passwordField).toHaveAttribute('type', 'text');
        }
    );

    test(
        'User can reveal confirmation password by clicking the visibility toggle',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/

            registrationPage.registrationForm.confirmPassword(user.password!);

            registrationPage.registrationForm.showConfirmationPassword();

            await expect(registrationPage.registrationForm.confirmPasswordField).toHaveAttribute('type', 'text');
        }
    );

    test(
        'User can hide password by clicking the visibility toggle',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/

            registrationPage.registrationForm.enterPassword(user.password!);

            registrationPage.registrationForm.showPassword();

            registrationPage.registrationForm.hidePassword();

            await expect(registrationPage.registrationForm.passwordField).toHaveAttribute('type', 'password');
        }
    );

    test(
        'User can hide confirmation password by clicking the visibility toggle',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage }) => {
            /** STEPS **/

            registrationPage.registrationForm.confirmPassword(user.password!);

            registrationPage.registrationForm.showConfirmationPassword();

            registrationPage.registrationForm.hideConfirmationPassword();

            await expect(registrationPage.registrationForm.confirmPasswordField).toHaveAttribute('type', 'password');
        }
    );
});
