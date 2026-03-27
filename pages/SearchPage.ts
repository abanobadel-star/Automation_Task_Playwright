import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class SearchPage extends BasePage {

    // Locators for the search page elements
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResultTitle: Locator;
    readonly searchResultItems: Locator;
    readonly transmissionManualOption: Locator;
    readonly transmissionAutomaticOption: Locator;


    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator("#gh-ac");
        this.searchButton = page.locator("#gh-search-btn");
        this.searchResultTitle = page.locator(".srp-controls__control.srp-controls__count h1");
        this.searchResultItems = page.locator(".srp-results.srp-list.clearfix li[class='s-card s-card--horizontal']");
        this.transmissionManualOption = page.locator("input[aria-label='Manual']");
        this.transmissionAutomaticOption = page.locator("input[aria-label='Automatic']");

    }
    // methods for the search page

    /**
     * open website.
     */
    async openWebsite() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    /**
     * search for a specific product.
     * @param nameOfProduct 
     */
    async searchOnSpecificProduct(nameOfProduct: string) {
        await this.enterText(this.searchInput, nameOfProduct);
        await this.clickElement(this.searchButton);
    }

    /**
     * verify that the user landed to the webiste.
     */
    async VerifyUserLandedOnSearchResultPage() {
        await this.verifyWebsitePageLanded(`${process.env.BASE_URL}`);
    }
    /**
     * verify that the search result contains the product name.
     * @param productName 
     */
    async verifySearchResultContainsProductName(productName: string) {
        await this.VerifyElementContainText(this.searchResultTitle, productName);
    }
    /**
     * verify that the search result has items number.
     * @param itemNumber 
     */
    async verifySearchResultHasitemsNumber(itemNumber: string) {
        await expect(this.searchResultTitle).toBeVisible();
        const text = await this.searchResultTitle.textContent();
        const expectedNumber =  Number(text?.match(/\d+/)?.[0] || 0);
        const actualNumber = await this.searchResultItems.count();
        expect(actualNumber).toBe(expectedNumber);
    }

    /**
     * print the number of products in the search result.
     */
    async printProductNumber() {
        let productCount = await this.searchResultItems.count();
        console.log('Number of product : ' + productCount);
    }

    /**
     * select the transmission type filter in the search result.
     * @param transmissionType 
     */
    async selectTransmissionType(transmissionType: string) {
        if (transmissionType.toLowerCase() === 'manual') {
            await this.clickElement(this.transmissionManualOption);
        } else if (transmissionType.toLowerCase() === 'automatic') {
            await this.clickElement(this.transmissionAutomaticOption);
        } else {
            throw new Error(`Invalid transmission type: ${transmissionType}`);
        }
    }

}