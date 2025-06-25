import { test, expect } from '../../../support/test.fixture';
import { User } from 'types';

test.describe.skip('Registration flow', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can register successfully',
        { tag: ['@smoke', '@registration', '@desktop', '@mobile', '@tablet'] },
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
