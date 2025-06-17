import type { Locator, Page } from '@playwright/test';
import NavBar from '../../global-components/navbar';
import RegistrationForm from './components/registration-form';
import { BasePage } from '../base.page';

export default class RegistrationPage extends BasePage {
    readonly path: string = '/register';
    readonly navbar: NavBar;
    readonly registrationForm: RegistrationForm;

    constructor(page: Page) {
        super(page);
        this.navbar = new NavBar(page);
        this.registrationForm = new RegistrationForm(page);
    }

    async open(): Promise<void> {
        await super.open(`${process.env.BASE_URL}${this.path}`);
    }
}
