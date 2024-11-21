import { expect } from "@playwright/test";
import { test } from "fixtures";
import OrderReview from "pages/OrderReview";
import CompanyInfo from "pages/CompanyInfo";
import Checkout from "pages/Checkout";
import { faker } from "@faker-js/faker";

test.describe("Checkout Plan By Stripe", () => {

    test("User can checkout a Free Plan by Stripe", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan("Free Plan");
        await orderReviewPage.clickContinue();

        const companyInfoPage = new CompanyInfo(page);
        await companyInfoPage.specifyCompanyInfo();
        await companyInfoPage.specifyPointOfContact();
        await companyInfoPage.clickContinue();

        const checkoutPage = new Checkout(page);
        await checkoutPage.checkoutByOrderForm();
        await checkoutPage.fillOrderFormEmail(faker.internet.email());
        await checkoutPage.clickSignOrderForm();

        await expect(checkoutPage.getSignOrderFormMessageLocator()).toBeVisible();
    });

    test("User can checkout a SMB Plan by Stripe", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan("SMB Plan");
        await orderReviewPage.clickContinue();

        const companyInfoPage = new CompanyInfo(page);
        await companyInfoPage.specifyCompanyInfo();
        await companyInfoPage.specifyPointOfContact();
        await companyInfoPage.clickContinue();

        const checkoutPage = new Checkout(page);
        await checkoutPage.checkoutByOrderForm();
        await checkoutPage.fillOrderFormEmail(faker.internet.email());
        await checkoutPage.clickSignOrderForm();

        await expect(checkoutPage.getSignOrderFormMessageLocator()).toBeVisible();
    });

    test("User can checkout a Enterprise Plan by Stripe", async ({ page }) => {

        const orderReviewPage = new OrderReview(page);
        await orderReviewPage.goToOrderReview();
        await orderReviewPage.selectAPlan("Enterprise Plan");
        await orderReviewPage.clickContinue();

        const companyInfoPage = new CompanyInfo(page);
        await companyInfoPage.specifyCompanyInfo();
        await companyInfoPage.specifyPointOfContact();
        await companyInfoPage.clickContinue();

        const checkoutPage = new Checkout(page);
        await checkoutPage.checkoutByOrderForm();
        await checkoutPage.fillOrderFormEmail(faker.internet.email());
        await checkoutPage.clickSignOrderForm();

        await expect(checkoutPage.getSignOrderFormMessageLocator()).toBeVisible();
    });
});