import type { Locator, Page } from '@playwright/test';
import NavBar from '../../global-components/navbar';
import LoginForm from './components/login-form';
import { BasePage } from '../base.page';

export default class LoginPage extends BasePage {
    readonly path: string = '/login';
    readonly navbar: NavBar;
    readonly loginForm: LoginForm;

    constructor(page: Page) {
        super(page);
        this.navbar = new NavBar(page);
        this.loginForm = new LoginForm(page);
    }

    async open(): Promise<void> {
        await super.open(`${process.env.BASE_URL}${this.path}`);
    }

    async login(username: string, password: string): Promise<void> {
        await this.loginForm.enterUsername(username);
        await this.loginForm.enterPassword(password);
        await this.loginForm.submitForm();
    }
}
