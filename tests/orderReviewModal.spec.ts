import { expect } from '@playwright/test';
import { test } from 'fixtures';
import OrderReview from 'pages/OrderReview';

test.describe('Order Review Page', () => {

    test("clicking View billing schedule will open the billing schedule modal", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan('Free Plan');
        await orderReviewPage.clickViewBillingSchedule();

        await expect(orderReviewPage.getBillingScheduleModalTitleLocator()).toBeVisible();
    });

    test("clicking View pricing breakdown will open the pricing breakdown modal", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan('Free Plan');
        await orderReviewPage.clickViewPricingBreakdown();

        await expect(orderReviewPage.getPricingBreakdownModalTitleLocator()).toBeVisible();
    });
});