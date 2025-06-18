import type { Locator, Page } from '@playwright/test';
import NavBar from '../../global-components/navbar';
import Cart from './cart';
import { BasePage } from '../base.page';

export default class ShoppingCartPage extends BasePage {
    readonly path: string = '/shopping-cart';
    readonly navbar: NavBar;
    readonly cart: Cart;
    constructor(page: Page) {
        super(page);
        this.navbar = new NavBar(page);
        this.cart = new Cart(page);
    }

    async open(): Promise<void> {
        await super.open(`${process.env.BASE_URL}${this.path}`);
    }
}
