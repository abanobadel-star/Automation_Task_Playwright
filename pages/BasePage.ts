
import { Page, Locator, expect } from "@playwright/test";

export class BasePage {

    protected readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }
    /**
     * clickElement is a common method to click on any element on the page. It takes a locator as an argument and clicks on it.
     * @param locator 
     */
    async clickElement(locator: Locator) {
        await locator.click();

    }
    /**
     * enterText is a common method to enter text into any input field on the page. It takes a locator and text as arguments and fills the input field.
     * @param locator 
     * @param text 
     */
    async enterText(locator: Locator, text: string) {
        await locator.fill(text);
    }

    /**
     * verifyText is a common method to verify the text of any element on the page. It takes a locator and expected text as arguments and asserts that the element has the expected text.
     * @param locator 
     * @param expectedText 
     */
    async verifyText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
    }
    /**
     * VerifyElementContainText is a common method to verify that an element contains the expected text. It takes a locator and expected text as arguments and asserts that the element contains the expected text.
     * @param locator 
     * @param expectedText 
     */
    async VerifyElementContainText (locator : Locator, expectedText: string) {
        await expect(locator).toContainText(expectedText);
    }

    /**
     * verifyAllResultContainsText is a common method to verify that all results contain the expected text. It takes a locator and expected text as arguments and asserts that each result contains the expected text.
     * @param locator 
     * @param expectedText 
     */
    async verifyAllResultContainsText (locator: Locator, expectedText: string) {
        await locator.first().waitFor({state: 'visible'}); // Wait for at least one result to be visible
          const count = await locator.count();
        
        console.log(`Found ${count} results to verify`);

        for (let i = 0; i < count; i++) {
            await expect(locator.nth(i)).toContainText(expectedText, {ignoreCase: true});
        }
    }
    
    /**
     * verifyElementVisible is a common method to verify that an element is visible on the page. It takes a locator as an argument and asserts that the element is visible.
     * @param locator 
     */
    async verifyElementVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }
    /**
     * selectOptionFromDropdown is a common method to select an option from a dropdown. It takes a locator and option value as arguments and selects the option.
     * @param locator 
     * @param optionValue 
     */

    async selectOptionFromDropdown(locator: Locator, optionValue: string) {
        await locator.selectOption({ label: optionValue });
    }
    async verifyWebsitePageLanded(url :string) {
        await expect(this.page).toHaveURL(url);
    }
}