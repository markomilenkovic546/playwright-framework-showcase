import { test as base } from '@playwright/test';
import RegistrationPage from './pages/registration/registration.page';
import ProductListingPage from './pages/plp/product-listing.page';
import LoginPage from './pages/login/login.page';
import DataFactory from 'helpers/data-factory';


export type TestFixtures = {
    registrationPage: RegistrationPage;
    productListingPage: ProductListingPage;
    dataFactory: DataFactory;
    loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    dataFactory: async ({},use) => {
        const dataFactory = new DataFactory();
        await use(dataFactory);
    },
    productListingPage: async ({ page },use) => {
        const productListingPage = new ProductListingPage(page);
        await use(productListingPage);
    },
    loginPage: async ({ page },use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export { expect, Page, Locator, Response } from '@playwright/test';
