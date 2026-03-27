import { test as base } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';

type pages = {
    searchPage: SearchPage;

}

export const test = base.extend<pages>({

    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },

});



