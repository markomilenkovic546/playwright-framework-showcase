import { test, expect } from '../../../../support/test.fixture';
import { User } from 'types';

test.describe.skip('@desktop Password boundary validation', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can submit form with password length 8 (minimum length)',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, loginPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });
        }
    );

    test(
        'User can submit form with password length 9 (1 above min)',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, loginPage, page, dataFactory }) => {
            const user: User = dataFactory.createValidUserData(); // Prepare test data

            user.password = user.password + 'a'; // Modify password to have 9 characters

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(loginPage.path), {
                timeout: 10000
            });
        }
    );

    test(
        'User cannot submit form with password length 7 (1 below min)',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();
            // Modify password to meet complexity requirements but is 7 characters long
            user.password = 'pa5Swor';

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect.soft(page).toHaveURL(new RegExp(registrationPage.path), {
                timeout: 10000
            });

            await expect(registrationPage.registrationForm.passwordStrengthError).toBeVisible();
        }
    );
});

test.describe.skip('@desktop Password complexity validation', { tag: ['@regression', '@registration'] }, () => {
    test.beforeEach(async ({ registrationPage, loginPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test('User cannot submit form if password does not contain at least 1 uppercase letter', async ({
        registrationPage,
        page,
        dataFactory
    }) => {
        // Prepare test data
        const user: User = dataFactory.createValidUserData();
        // Modify password to not contain uppercase letters
        user.password = 'pa5sword';

        /** STEPS **/
        await registrationPage.registrationForm.fillForm(user);

        await registrationPage.registrationForm.submitForm();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });

        await expect(registrationPage.registrationForm.passwordStrengthError).toBeVisible();
    });

    test(
        'User cannot submit form if password does not contain at least 1 lowercase letter',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();
            // Modify password to not contain lowercase letters
            user.password = 'JSUDHSG5';

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(registrationPage.path), {
                timeout: 10000
            });

            await expect(registrationPage.registrationForm.passwordStrengthError).toBeVisible();
        }
    );

    test(
        'User cannot submit form if password does not contain at least 1 digit',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();
            // Modify password to not contain numbers
            user.password = 'juehgPdqs';

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(registrationPage.path), {
                timeout: 10000
            });

            await expect(registrationPage.registrationForm.passwordStrengthError).toBeVisible();
        }
    );
});

test.describe.skip('@desktop Password confirmation validation', () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test(
        'User cannot submit form if password and confirmation do not match',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.confirmPassword(user.password + 'a'); // Change Confirm password input

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(registrationPage.path), {
                timeout: 10000
            });

            await expect(registrationPage.registrationForm.passwordMatchError).toBeVisible();
        }
    );
});

test.describe.skip('@desktop Mandatory input validation', { tag: ['@regression', '@registration'] }, () => {
    test.beforeEach(async ({ registrationPage, page }) => {
        // Open Registration page
        await registrationPage.open();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
    });

    test('User cannot submit form if First Name field is empty', async ({ registrationPage, page, dataFactory }) => {
        // Prepare test data
        const user: User = dataFactory.createValidUserData();
        delete user.firstName;

        /** STEPS **/
        await registrationPage.registrationForm.fillForm(user);
        await registrationPage.registrationForm.submitForm();
        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });
        await expect(registrationPage.registrationForm.firstNameRequiredError).toBeVisible();
    });

    test(
        'User cannot submit form if Last Name field is empty',
        { tag: ['@regression', '@registration'] },
        async ({ registrationPage, page, dataFactory }) => {
            // Prepare test data
            const user: User = dataFactory.createValidUserData();
            delete user.lastName;

            /** STEPS **/
            await registrationPage.registrationForm.fillForm(user);

            await registrationPage.registrationForm.submitForm();

            await expect(page).toHaveURL(new RegExp(registrationPage.path), {
                timeout: 10000
            });

            await expect(registrationPage.registrationForm.lastNameRequiredError).toBeVisible();
        }
    );
});

test(
    'User cannot submit form if Username field is empty',
    { tag: ['@regression', '@registration'] },
    async ({ registrationPage, page, dataFactory }) => {
        // Prepare test data
        const user: User = dataFactory.createValidUserData();
        delete user.username;

        /** STEPS **/
        await registrationPage.registrationForm.fillForm(user);

        await registrationPage.registrationForm.submitForm();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });

        await expect(registrationPage.registrationForm.usernameRequiredError).toBeVisible();
    }
);

test(
    'User cannot submit form if Password field is empty',
    { tag: ['@regression', '@registration'] },
    async ({ registrationPage, page, dataFactory }) => {
        // Prepare test data
        const user: User = dataFactory.createValidUserData();
        delete user.password;

        /** STEPS **/
        await registrationPage.registrationForm.fillForm(user);

        await registrationPage.registrationForm.submitForm();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });

        await expect(registrationPage.registrationForm.passwordRequiredError).toBeVisible();
    }
);

test(
    'User cannot submit form if Confirm Password field is empty',
    { tag: ['@regression', '@registration'] },
    async ({ registrationPage, page, dataFactory }) => {
        // Prepare test data
        const user: User = dataFactory.createValidUserData();

        /** STEPS **/
        await registrationPage.registrationForm.fillForm(user);

        await registrationPage.registrationForm.confirmPasswordField.clear();

        await registrationPage.registrationForm.submitForm();

        await expect(page).toHaveURL(new RegExp(registrationPage.path), {
            timeout: 10000
        });

        await expect(registrationPage.registrationForm.confirmPasswordRequiredError).toBeVisible();
    }
);
