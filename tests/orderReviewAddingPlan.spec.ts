import { expect } from '@playwright/test';
import { test } from 'fixtures';
import OrderReview from 'pages/OrderReview';

test.describe('Order Review Page', () => {

    test("User adding a Free Plan should see the plan in the cost section", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan('Free Plan');

        await expect(orderReviewPage.getCostLineItemLocator('Free Plan')).toBeVisible();

    });

    test("User adding a SMB Plan should see the plan in the cost section", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan('SMB Plan');

        await expect(orderReviewPage.getCostLineItemLocator('SMB Plan')).toBeVisible();

    });

    test("User adding a Enterprise Plan should see the plan in the cost section", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan('Enterprise Plan');

        await expect(orderReviewPage.getCostLineItemLocator('Enterprise Plan')).toBeVisible();

    });
});