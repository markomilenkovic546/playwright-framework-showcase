import { test, expect } from '../../../support/test.fixture';
import { Product, User } from 'types';
import testUser from '../../../static-test-data/user.json';

test.describe('Cart actions', () => {
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

    test.describe('Change item quantity', () => {
        test(
            'User can increase item quantity successfully',
            { tag: ['@regression', '@cart', '@desktop', '@mobile', '@tablet'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Increase quantity of the particular item
                await shoppingCartPage.cart.increaseItemQuantity(products[0].title);

                // Verify that that quantity is correct for each item
                await expect.soft(shoppingCartPage.cart.itemQuantity(products[0].title)).toHaveText('2');
                await expect.soft(shoppingCartPage.cart.itemQuantity(products[1].title)).toHaveText('1');
                await expect.soft(shoppingCartPage.cart.itemQuantity(products[2].title)).toHaveText('1');
            }
        );

        test(
            'Subtotal and total are correctly updated when user increases an item quantity',
            { tag: ['@regression', '@cart', '@desktop'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Increase quantity of the particular item
                await shoppingCartPage.cart.increaseItemQuantity(products[0].title);

                // Verify that subtotal of the item is correctly updated
                await expect
                    .soft(shoppingCartPage.cart.itemTotalPrice(products[0].title))
                    .toHaveText(`₹${products[0].price * 2}.00`);

                // Verify that Cart total is correctly updated
                const expectedTotal = `₹${(
                    products[0].price * 2 +
                    products[1].price +
                    products[2].price
                ).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;

                await expect.soft(shoppingCartPage.cart.cartTotal).toHaveText(expectedTotal);
            }
        );

        test(
            'User can decrease item quantity successfully',
            { tag: ['@regression', '@cart', '@desktop', '@mobile', '@tablet'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Increase quantity of the particular item
                await shoppingCartPage.cart.increaseItemQuantity(products[0].title);

                // Decrease quantity of the particular item
                await shoppingCartPage.cart.decreaseItemQuantity(products[0].title);

                // Verify that that quantity is correct for each item
                await expect.soft(shoppingCartPage.cart.itemQuantity(products[0].title)).toHaveText('1');
                await expect.soft(shoppingCartPage.cart.itemQuantity(products[1].title)).toHaveText('1');
                await expect.soft(shoppingCartPage.cart.itemQuantity(products[2].title)).toHaveText('1');
            }
        );

        test(
            'Subtotal and total are correctly updated when user decreases an item quantity',
            { tag: ['@regression', '@cart', '@desktop'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Increase quantity of the particular item
                await shoppingCartPage.cart.increaseItemQuantity(products[0].title);

                // Decrease quantity of the particular item
                await shoppingCartPage.cart.decreaseItemQuantity(products[0].title);

                // Verify that subtotal of the item is correctly updated
                await expect
                    .soft(shoppingCartPage.cart.itemTotalPrice(products[0].title))
                    .toHaveText(`₹${products[0].price}.00`);

                // Verify that Cart total is correctly updated
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

    test.describe('Remove item from the cart', () => {
        test(
            'User can remove item from the cart successfully',
            { tag: ['@regression', '@cart', '@desktop', '@mobile', '@tablet'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Remove particular item from the cart
                await shoppingCartPage.cart.removeItemFromCart(products[0].title);

                // Verify that that item is removed from the cart
                await expect.soft(shoppingCartPage.cart.cartItem(products[0].title)).not.toBeVisible();

                // Verify that rest of the items are still present in the cart
                await expect.soft(shoppingCartPage.cart.cartItem(products[1].title)).toBeVisible();
                await expect.soft(shoppingCartPage.cart.cartItem(products[2].title)).toBeVisible();
            }
        );

        test(
            'Subtotal and total are correctly updated when user removes item from the cart',
            { tag: ['@regression', '@cart', '@desktop'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Remove particular item from the cart
                await shoppingCartPage.cart.removeItemFromCart(products[0].title);

                // Verify that subtotal of the item is correctly updated
                await expect
                    .soft(shoppingCartPage.cart.itemTotalPrice(products[0].title))
                    .toHaveText(`₹${products[0].price}.00`);

                // Verify that Cart total is correctly updated
                const expectedTotal = `₹${(products[1].price + products[2].price).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;

                await expect.soft(shoppingCartPage.cart.cartTotal).toHaveText(expectedTotal);
            }
        );

        test(
            'User can clear the cart by clicking the "Clear cart" button',
            { tag: ['@regression', '@cart', '@desktop', '@mobile', '@tablet'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add 3 products in the cart
                for (const product of products) {
                    await apiHelper.addToCart(user.id, `${product.bookId}`);
                    await page.waitForTimeout(500);
                }

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Click the "Clear cart" button
                await shoppingCartPage.cart.clearCart();

                // Verify that that all items are removed from the cart
                for (const product of products) {
                    await expect.soft(shoppingCartPage.cart.cartItem(product.title)).not.toBeVisible();
                }

                // Verify that 'Continue shopping' button is present
                await expect.soft(shoppingCartPage.cart.continueShoppingButton).toBeVisible();
            }
        );
    });

    test.describe('Proceeding to checkout', () => {
        test(
            'Logged in user can proceed to checkout if cart is not empty',
            { tag: ['@regression', '@cart', '@desktop', '@mobile', '@tablet'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                // Add product in the cart
                await apiHelper.addToCart(user.id, `${product.bookId}`);

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Click the 'Proceed to checkout' button
                await shoppingCartPage.cart.proceedToCheckout();

                // Verify that 'Checkout' page is open
                await expect(page).toHaveURL(new RegExp('/checkout'), {
                    timeout: 10000
                });
            }
        );

        test(
            'User cannot proceed to checkout  unless they are logged in',
            { tag: ['@regression', '@cart', '@desktop'] },
            async ({ productListingPage, shoppingCartPage, page }) => {
                // Logout user
                await productListingPage.navbar.openAccountDropdown();
                await productListingPage.navbar.logout();

                // Open PLP
                await productListingPage.open();
                // Add product in the cart
                await productListingPage.productCard.addProductToCart(product.title);

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Click the 'Checkout' button
                await shoppingCartPage.cart.proceedToCheckout();

                // Verify that 'Cart' page is still open
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });
            }
        );

        test(
            'Checkout button is not present when the cart is empty',
            { tag: ['@regression', '@cart', '@desktop'] },
            async ({ productListingPage, shoppingCartPage, page }) => {
                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Verify that 'Checkout' button is not present
                await expect(shoppingCartPage.cart.checkoutButton).not.toBeVisible();
            }
        );
    });

    test.describe('Continue shopping', () => {
        test(
            'When the cart is empty a user can navigate from the Cart to to PLP',
            { tag: ['@regression', '@cart', '@desktop', '@mobile', '@tablet'] },
            async ({ productListingPage, shoppingCartPage, page }) => {
                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Click 'Continue shopping' button
                await shoppingCartPage.cart.continueShopping();

                // Verify that PLP is open
                await expect(page).toHaveURL(new RegExp(productListingPage.path), {
                    timeout: 10000
                });
            }
        );

        test(
            'The Continue shopping button is not present when cart is not empty',
            { tag: ['@regression', '@cart', '@desktop'] },
            async ({ productListingPage, shoppingCartPage, page, apiHelper }) => {
                await apiHelper.addToCart(user.id, `${product.bookId}`);

                // Navigate to Cart page
                await productListingPage.navbar.openCart();
                await expect(page).toHaveURL(new RegExp(shoppingCartPage.path), {
                    timeout: 10000
                });

                // Verify that 'Continue shopping' button is not present
                await expect(shoppingCartPage.cart.continueShoppingButton).not.toBeVisible();
            }
        );
    });
});
