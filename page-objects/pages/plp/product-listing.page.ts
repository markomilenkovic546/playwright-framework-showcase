import type { Locator, Page } from '@playwright/test';
import NavBar from '../../global-components/navbar';
import ProductCard from './components/product-card';
import FilterPanel from './components/filter-panel';
import { BasePage } from '../base.page';

export default class ProductListingPage extends BasePage {
    readonly path: string = '/';
    readonly navbar: NavBar;
    readonly productCard: ProductCard;
    readonly filterPanel: FilterPanel;

    constructor(page: Page) {
        super(page);
        this.navbar = new NavBar(page);
        this.productCard = new ProductCard(page);
        this.filterPanel = new FilterPanel(page);
    }

    async open(): Promise<void> {
        await super.open(`${process.env.BASE_URL}${this.path}`);
    }
}
