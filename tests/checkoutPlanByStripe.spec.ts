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
        await checkoutPage.checkoutByStripe();
        await checkoutPage.fillStripeCardNumber("4242424242424242");
        await checkoutPage.fillStripeExpiry("1234");
        await checkoutPage.fillStripeCvc("123");
        await checkoutPage.stripeFillEmail(faker.internet.email());
        await checkoutPage.agreeToTerms();
        await checkoutPage.clickPlaceOrder();

        await expect(checkoutPage.getOrderCompleteMessageLocator()).toBeVisible();
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
        await checkoutPage.checkoutByStripe();
        await checkoutPage.fillStripeCardNumber("4242424242424242");
        await checkoutPage.fillStripeExpiry("1234");
        await checkoutPage.fillStripeCvc("123");
        await checkoutPage.stripeFillEmail(faker.internet.email());
        await checkoutPage.agreeToTerms();
        await checkoutPage.clickPlaceOrder();

        await expect(checkoutPage.getOrderCompleteMessageLocator()).toBeVisible();
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
        await checkoutPage.checkoutByStripe();
        await checkoutPage.fillStripeCardNumber("4242424242424242");
        await checkoutPage.fillStripeExpiry("1234");
        await checkoutPage.fillStripeCvc("123");
        await checkoutPage.stripeFillEmail(faker.internet.email());
        await checkoutPage.agreeToTerms();
        await checkoutPage.clickPlaceOrder();

        await expect(checkoutPage.getOrderCompleteMessageLocator()).toBeVisible();
    });
});