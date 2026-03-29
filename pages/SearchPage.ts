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
        console.log('Starting search for product:', nameOfProduct);
        await this.enterText(this.searchInput, nameOfProduct);
        console.log('Product name entered');
        
        // Wait for the response and click search button
        const responsePromise = this.page.waitForResponse(resp =>
            resp.url().includes('/sch') && resp.status() === 200
        );

        await this.clickElement(this.searchButton);
        console.log('Search button clicked');

        try {
            await responsePromise;
            console.log('Search response received');
        } catch (e) {
            console.log('Response wait timed out, continuing anyway...');
        }
        
        // Wait for page to fully load
        await this.page.waitForLoadState('domcontentloaded');
        console.log('DOM content loaded');
        
        await this.page.waitForLoadState('networkidle');
        console.log('Network idle');
        
        // Add delay for dynamic content rendering
        await this.page.waitForTimeout(2000);
        
        // Check if the page has search results by looking for alternative selectors
        const h1Exists = await this.searchResultTitle.count();
        console.log('Search result title h1 found:', h1Exists);
        
        if (h1Exists === 0) {
            console.log('Trying alternative selector for search results...');
            // Try alternative selector
            const altTitle = this.page.locator("h1.s-color-base");
            const altCount = await altTitle.count();
            console.log('Alternative title selector count:', altCount);
            
            if (altCount > 0) {
                await altTitle.first().waitFor({ state: 'visible', timeout: 5000 });
                return;
            }
        }
        
        // Wait for search results to be visible with increased timeout
        await this.searchResultTitle.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Search result title visible');
        
        // Additional wait for result items to load
        await this.searchResultItems.first().waitFor({ state: 'visible', timeout: 10000 });
        console.log('Search result items visible');
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
        const expectedNumber = Number(text?.match(/\d+/)?.[0] || 0);
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