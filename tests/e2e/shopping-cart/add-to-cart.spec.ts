import { test, expect } from '../../../support/test.fixture';
import { Product, User } from 'types';
import testUser from '../../../static-test-data/user.json';

test.describe('Add to cart', () => {
    const user: Required<User> = testUser;
    let productsResBody: Product[];
    let products: Product[];
    let product: Product;

    test.beforeEach(async ({ productListingPage, apiHelper, page }) => {
        // Get available products
        productsResBody = await apiHelper.getProducts();

        // Prepare test data
        products = productsResBody.slice(0, 3);
        product = products[0];

        // Clear shopping cart via API
        await apiHelper.clearShoppingCart(user.id);

        // Navigate to PLP
        await productListingPage.open();
        await expect(page).toHaveURL(new RegExp(productListingPage.path), {
            timeout: 10000
        });
    });

    test(
        'User can add product to cart successfully',
        { tag: ['@smoke', '@cart', '@desktop', '@mobile', '@tablet'] },
        async ({ productListingPage, shoppingCartPage, page }) => {
            // Add product to cart
            const [response] = await Promise.all([
                page.waitForResponse(
                    (res) =>
                        res.url().includes(`addToCart/${user.id}/${product.bookId}`) &&
                        res.request().method() === 'POST'
                ),
                await productListingPage.productCard.addProductToCart(product.title)
            ]);
            const body = await response.json();
            expect(response.status()).toBe(200);
            expect(body[0].book.title).toEqual(product.title);
            expect(body[0].quantity).toEqual(1);

            // Navigate to Cart page
            await productListingPage.navbar.openCart();
            await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                timeout: 10000
            });

            // Verify that product is displayed in the cart
            await expect.soft(shoppingCartPage.cart.cartItem(product.title)).toBeVisible();

            // Verify that item quantity is correct
            await expect.soft(shoppingCartPage.cart.itemQuantity(product.title)).toHaveText('1');

            // Verify that cart contains only single item
            const cartItemsCount = await shoppingCartPage.cart.cartItemList.count();
            expect.soft(cartItemsCount).toBe(1);
        }
    );

    test(
        'Cart badge updates when a user adds a product to cart',
        { tag: ['@regression', '@cart', '@desktop'] },
        async ({ productListingPage }) => {
            // Add product to cart
            await productListingPage.productCard.addProductToCart(product.title);

            // Verify that cart badge counter value is correct
            await expect.soft(productListingPage.navbar.cartBadgeCounter).toHaveText('1');
        }
    );

    test(
        'User can add multiple products to cart successfully',
        { tag: ['@regression', '@cart', '@desktop'] },
        async ({ productListingPage, shoppingCartPage, page }) => {
            // Add 3 products in the cart
            for (const product of products) {
                await productListingPage.productCard.addProductToCart(product.title);
                await page.waitForTimeout(500);
            }

            // Navigate to Cart page
            await productListingPage.navbar.openCart();
            await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                timeout: 10000
            });

            // Verify that each product is added to cart
            for (const product of products) {
                await expect.soft(shoppingCartPage.cart.cartItem(product.title)).toBeVisible();
            }

            // Verify that that quantity is correct for each item
            for (const product of products) {
                await expect.soft(shoppingCartPage.cart.itemQuantity(product.title)).toHaveText('1');
            }

            // Verify that number of items in the cart is correct
            const cartItemsCount = await shoppingCartPage.cart.cartItemList.count();
            expect.soft(cartItemsCount).toBe(3);
        }
    );

    test(
        'Product quantity updates correctly when user adds a product that is already in the cart',
        { tag: ['@regression', '@cart', '@desktop'] },
        async ({ productListingPage, shoppingCartPage, page }) => {
            // Add same product in the cart twice
            await productListingPage.productCard.addProductToCart(product.title);
            await page.waitForTimeout(500);
            await productListingPage.productCard.addProductToCart(product.title);

            // Navigate to Cart page
            await productListingPage.navbar.openCart();
            await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                timeout: 10000
            });

            // Verify that product is present in the cart
            await expect.soft(shoppingCartPage.cart.cartItem(product.title)).toBeVisible();

            // Verify that number of items in teh cart is correct
            const cartItemsCount = await shoppingCartPage.cart.cartItemList.count();
            expect.soft(cartItemsCount).toBe(1);

            // Verify that item quantity is correct
            await expect.soft(shoppingCartPage.cart.itemQuantity(product.title)).toHaveText('2');
        }
    );

    test(
        'Cart displays correct subtotal and total when single product is added to the cart',
        { tag: ['@regression', '@cart', '@desktop'] },
        async ({ productListingPage, shoppingCartPage, page }) => {
            // Add Product to cart
            await productListingPage.productCard.addProductToCart(product.title);

            // Navigate to Cart page
            await productListingPage.navbar.openCart();
            await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                timeout: 10000
            });

            // Verify that subtotal of the item is correct
            await expect.soft(shoppingCartPage.cart.itemTotalPrice(product.title)).toHaveText(`₹${product.price}.00`);

            // Verify that Cart total is correct
            const expectedTotal = `₹${product.price.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;

            await expect.soft(shoppingCartPage.cart.cartTotal).toHaveText(expectedTotal);
        }
    );

    test(
        'Cart displays correct subtotal and total when multiple products are added to the cart',
        { tag: ['@regression', '@cart', '@desktop'] },
        async ({ productListingPage, shoppingCartPage, page }) => {
            // Add 3 products in the cart
            for (const product of products) {
                await productListingPage.productCard.addProductToCart(product.title);
                await page.waitForTimeout(500);
            }

            // Navigate to Cart page
            await productListingPage.navbar.openCart();
            await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                timeout: 10000
            });

            // Verify that subtotal of the items are correct
            for (const product of products) {
                await expect
                    .soft(shoppingCartPage.cart.itemTotalPrice(product.title))
                    .toHaveText(`₹${product.price}.00`);
            }

            // Verify that Cart total is correct
            const expectedTotal = `₹${(products[0].price + products[1].price + products[2].price).toLocaleString(
                'en-IN',
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )}`;

            await expect.soft(shoppingCartPage.cart.cartTotal).toHaveText(expectedTotal);
        }
    );
});
