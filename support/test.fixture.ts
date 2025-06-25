import { test as base } from '@playwright/test';
import RegistrationPage from '../page-objects/pages/registration/registration.page';
import ProductListingPage from '../page-objects/pages/plp/product-listing.page';
import LoginPage from '../page-objects/pages/login/login.page';
import ShoppingCartPage from '../page-objects/pages/cart/shopping-cart.page';
import DataFactory from 'helpers/data-factory';
import APIHelper from 'helpers/api-helper';

export type TestFixtures = {
    registrationPage: RegistrationPage;
    productListingPage: ProductListingPage;
    dataFactory: DataFactory;
    loginPage: LoginPage;
    shoppingCartPage: ShoppingCartPage;
    apiHelper: APIHelper;
};

export const test = base.extend<TestFixtures>({
    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    dataFactory: async ({}, use) => {
        const dataFactory = new DataFactory();
        await use(dataFactory);
    },
    apiHelper: async ({ request }, use) => {
        const apiHelper = new APIHelper(request);
        await use(apiHelper);
    },
    productListingPage: async ({ page }, use) => {
        const productListingPage = new ProductListingPage(page);
        await use(productListingPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    shoppingCartPage: async ({ page }, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    }
});

export { expect, Page, Locator, Response, Request } from '@playwright/test';
