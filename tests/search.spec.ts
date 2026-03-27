import { test } from '../Fixtures/pages.fixture';
import { searchPageTestData } from '../testData/SearchPageTestData';



/**
 * This test case verifies the search functionality on the eBay website.
 */
test("check search functionality @regression", async ({ searchPage }) => {
    await searchPage.openWebsite();
    await searchPage.VerifyUserLandedOnSearchResultPage();
    await searchPage.searchOnSpecificProduct(searchPageTestData.product.productName);
    await searchPage.verifySearchResultContainsProductName(searchPageTestData.product.productName);
    await searchPage.verifySearchResultHasitemsNumber(searchPageTestData.searchResult.itemNumberBeforeFilter);
    await searchPage.printProductNumber();
    await searchPage.selectTransmissionType(searchPageTestData.transmissionType.manual);
    await searchPage.verifySearchResultHasitemsNumber(searchPageTestData.searchResult.itemNumberAfterFilter);

});
