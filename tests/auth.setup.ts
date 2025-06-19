import { test as setup, expect } from '../support/test.fixture'
import testUser from '../static-test-data/user.json'
import { User } from 'types';
import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');



setup('Authenticate user', async ({ productListingPage, loginPage, page }) => {
    const user: User = testUser;
    loginPage.login(user.username!, user.password!)
    await expect(page).toHaveURL(new RegExp(productListingPage.path), {
        timeout: 10000
    });
    await expect(loginPage.navbar.accountDropdownButton).toContainText(user.username!);
    await page.context().storageState({ path: authFile });
});

