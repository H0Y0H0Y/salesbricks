import { Page } from "@playwright/test";

class CheckoutLocators {
    static get checkoutByStripeSelector(): string {
        return "//label[@data-test='card-option-STRIPE']";
    }

    static get checkoutByOrderFormSelector(): string {
        return "//label[@data-test='card-option-ORDER_FORM']";
    }

    static get stripeCardNumberSelector(): string {
        return "//input[@id='Field-numberInput']";
    }

    static get stripeExpirySelector(): string {
        return "//input[@id='Field-expiryInput']";
    }

    static get stripeIFrameLocator(): string {
        return "//iframe[@title='Secure payment input frame' and contains(@src, 'elements-inner-payment')]";
    }

    static get stripeCardOptionSelector(): string {
        return "//label[@id='card-tab']";
    }

    static get stripeCvcSelector(): string {
        return "//input[@id='Field-cvcInput']";
    }

    static get stripeAccountsPayableEmailSelector(): string {
        return "//input[@data-test='components-buildOrder-accountsPayable']";
    }

    static get agreeToTermsSelector(): string {
        return "//input[@data-test='components-buildOrder-termsAndConditions-accept']";
        // return "//div[@class='text-body-small' and normalize-space()='I agree to the']"
    }

    static get placeOrderButtonSelector(): string {
        return "//button[@title='Place order']";
    }

    static get orderFormEmailSelector(): string {
        return "//input[@data-test='accountsPayableContacts']";
    }

    static get signOrderFormButtonSelector(): string {
        return "//button[@title='Sign order form']";
    }

    static get orderCompleteMessageSelector(): string {
        return "//div/h1[@data-test='components-orderThankYou-header']"
    }

    static get signOrderFormMessageSelector(): string {
        return "//div/h1[@data-test='components-orderSigning-title']"
    }
}

export default class Checkout {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async checkoutByStripe() {
        await this.page.locator(CheckoutLocators.checkoutByStripeSelector).click();
    }

    async checkoutByOrderForm() {
        await this.page.locator(CheckoutLocators.checkoutByOrderFormSelector).click();
    }

    async fillStripeCardNumber(cardNumber: string) {
        const stripeIFrame = this.page.frameLocator(CheckoutLocators.stripeIFrameLocator);
        await stripeIFrame.locator(CheckoutLocators.stripeCardNumberSelector).fill(cardNumber);
    }

    async fillStripeExpiry(expiry: string) {
        const stripeIFrame = this.page.frameLocator(CheckoutLocators.stripeIFrameLocator);
        await stripeIFrame.locator(CheckoutLocators.stripeExpirySelector).fill(expiry);
    }

    async fillStripeCvc(cvc: string) {
        const stripeIFrame = this.page.frameLocator(CheckoutLocators.stripeIFrameLocator);
        await stripeIFrame.locator(CheckoutLocators.stripeCvcSelector).fill(cvc);
    }

    async stripeFillEmail(email: string) {
        await this.page.locator(CheckoutLocators.stripeAccountsPayableEmailSelector).fill(email);
    }

    async agreeToTerms() {
        await this.page.locator(CheckoutLocators.agreeToTermsSelector).check({ trial: true });
        await this.page.locator(CheckoutLocators.agreeToTermsSelector).check();
    }

    async clickPlaceOrder() {
        await this.page.locator(CheckoutLocators.placeOrderButtonSelector).click();
        await this.page.waitForURL(/&journeyPane=Thank\+You/, { waitUntil: 'load', timeout: 30 * 1000 });
    }

    getOrderCompleteMessageLocator() {
        return this.page.locator(CheckoutLocators.orderCompleteMessageSelector);
    }

    async fillOrderFormEmail(email: string) {
        await this.page.locator(CheckoutLocators.orderFormEmailSelector).fill(email);
    }

    async clickSignOrderForm() {
        await this.page.locator(CheckoutLocators.signOrderFormButtonSelector).click();
        await this.page.waitForURL(/\/signing/, { waitUntil: 'load', timeout: 30 * 1000 });
    }

    getSignOrderFormMessageLocator() {
        return this.page.locator(CheckoutLocators.signOrderFormMessageSelector);
    }
}