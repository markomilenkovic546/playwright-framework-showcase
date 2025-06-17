import type { Locator, Page } from '@playwright/test';

export default class FilterPanel {
    readonly page: Page;
    // DOM ELEMENTS
    readonly categoryFilterOption: (optionName: string) => Locator;
    readonly priceFilter: {
        slider: Locator;
        minPriceInput: Locator;
        maxPriceInput: Locator;
        priceValueTooltip: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.categoryFilterOption = (optionName) => {
            return this.page.locator('app-book-filter mat-list-item', {
                hasText: optionName
            });
        };

        this.priceFilter = {
            slider: this.page.locator('input[type="range"]'),
            minPriceInput: this.page
                .locator('.d-flex.justify-content-between [_ngcontent-ng-c2141147541] [_ngcontent-ng-c2141147541]')
                .nth(0),
            maxPriceInput: this.page
                .locator('.d-flex.justify-content-between [_ngcontent-ng-c2141147541] [_ngcontent-ng-c2141147541]')
                .nth(1),
            priceValueTooltip: this.page.locator('.mdc-slider__value-indicator-text')
        };
    }
}
