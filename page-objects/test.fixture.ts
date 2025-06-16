import { test as base } from '@playwright/test';
import RegistrationPage from './pages/registration/registration.page';
import ProductListingPage from './pages/plp/product-listing.page';
import DataFactory from 'helpers/data-factory';


export type TestFixtures = {
    registrationPage: RegistrationPage;
    productListingPage: ProductListingPage;
    dataFactory: DataFactory;
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
    }
});

export { expect, Page, Locator, Response } from '@playwright/test';
