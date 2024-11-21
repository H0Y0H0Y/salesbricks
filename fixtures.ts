import { test as base } from '@playwright/test';

export const test = base.extend<{ restartOrder: void }>({
    restartOrder: [async ({ page }, use) => {
        const unfinishedOrderLocator = page.locator("//*[@data-test='modal-title' and normalize-space()='Unfinished order']");
        const startOverButtonLocator = page.locator(
            "//*[@data-test='modal-title' and normalize-space()='Unfinished order']/ancestor::div[@data-test='modal-header']/following-sibling::div[@data-test='modal-body']//button[@title='Start over']"
        );
        await page.addLocatorHandler(unfinishedOrderLocator, async () => {
            await startOverButtonLocator.click();
        });

        await use();
    }, { auto: true }]
});