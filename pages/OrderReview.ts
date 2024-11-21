import { Locator, Page } from '@playwright/test';

type MonthVal = 
    "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";

type PlanVal =
    "Free Plan"
    | "SMB Plan"
    | "Enterprise Plan";

class OrderReviewLocators {

    static get buildingYourOrderTitleSelector(): string {
        return "//*[@data-test='components-buildOrder-title']";
    }

    static get billingScheduleLocator(): string {
        return "//button[@data-test='components-buildOrder-commitment-billingSchedule']";
    }

    static get billingScheduleOptionsSelector(): string {
        return "//button[@data-test='components-buildOrder-commitment-billingSchedule']//li[@data-test-id='{value}']";
    }

    static get planStartDateSelector(): string {
        return "//div[contains(@class, 'buildOrder_startDateInput')]";
    }

    static get planStartDateMonthSelector(): string {
        return "//button[@data-test='month-select']";
    }

    static get planStartDateMonthOptionsSelector(): string {
        return "//button[@data-test='month-select']//li[@data-test-id='{month}']";
    }

    static get planStartDateYearSelector(): string {
        return "//button[@data-test='year-select']";
    }

    static get planStartDateYearOptionsSelector(): string {
        return "//button[@data-test='year-select']//li[@data-test-id='{year}']";
    }

    static get planStartDateDaySelector(): string {
        return "//div[contains(@class, 'calendarPicker_day') and normalize-space()='{day}']";
    }

    static get currencySelector(): string {
        return "//button[@data-test='components-buildOrder-currencySelect']";
    }

    static get currencyOptionsSelector(): string {
        return "//button[@data-test='components-buildOrder-currencySelect']//li[contains(@data-test-id, '{currency}')]";
    }

    static get freePlanOfferingSelector(): string {
        return "//div[@data-test='components-buildOrder-offering-list']/div[@data-test-id='{plan}']";
    }

    static get costLineItemSelector(): string {
        return "//div[contains(@class, 'simpleCostTable_lineItem') and normalize-space()='{planName}']";
    }

    static get viewBillingScheduleSelector(): string {
        return "//button[@title='View billing schedule']";
    }

    static get billingScheduleModalTitleSelector(): string {
        return "//div[@data-test='modal-container']//*[@data-test='modal-title' and normalize-space()='Billing schedule']";
    }

    static get viewPricingBreakdownSelector(): string {
        return "//button[@title='View pricing breakdown']";
    }

    static get pricingBreakdownModalTitleSelector(): string {
        return "//div[@data-test='modal-container']//*[@data-test='modal-title' and normalize-space()='Pricing Breakdown']";
    }

    static get continueButtonSelector(): string {
        return "//button[@data-test='components-buildOrder-continue']";
    }
}

export default class OrderReview {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToOrderReview(): Promise<void> {
        await this.page.goto(
            "https://app.staging.salesbricks.com/products/platform/new?sku=d4fedad5-4c48-5a6d-b6e6-0381a6490757",
            {
                waitUntil: 'load',
                timeout: 50 * 1000
            }
        );

        await this.page.locator(OrderReviewLocators.buildingYourOrderTitleSelector).waitFor({ state: "visible" });
    }

    async selectBillingSchedule(schedule: "a monthly" | "an annual"): Promise<void> {
        await this.page.locator(OrderReviewLocators.billingScheduleLocator).click();
        await this.page.locator(OrderReviewLocators.billingScheduleOptionsSelector.replace("{value}", schedule)).click();
    }

    async isYearAValidOption(year: number): Promise<boolean> {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 5;
        const endYear = currentYear + 5;

        if (year < startYear || year > endYear) {
            return false;
        }

        return true;
    }

    async selectPlanStartDate(day: number, month: MonthVal, year: number): Promise<void> {
        if (await this.isYearAValidOption(year) === false) {
            throw new Error("Year is not a valid option");
        }

        if (day < 1 || day > 31) {
            throw new Error("Day is not a valid option");
        }

        await this.page.locator(OrderReviewLocators.planStartDateSelector).click();
        await this.page.locator(OrderReviewLocators.planStartDateMonthSelector).click();
        await this.page.locator(OrderReviewLocators.planStartDateMonthOptionsSelector.replace("{month}", month)).click();
        await this.page.locator(OrderReviewLocators.planStartDateYearSelector).click();
        await this.page.locator(OrderReviewLocators.planStartDateYearOptionsSelector.replace("{year}", year.toString())).click();
        await this.page.locator(OrderReviewLocators.planStartDateDaySelector.replace("{day}", day.toString())).click();
    }

    async selectCurrency(currency: "USD" | "EUR" | "GBP"): Promise<void> {
        await this.page.locator(OrderReviewLocators.currencySelector).click();
        await this.page.locator(OrderReviewLocators.currencyOptionsSelector.replace("{currency}", currency)).click();
    }

    async selectAPlan(plan: PlanVal): Promise<void> {
        await this.page.locator(OrderReviewLocators.freePlanOfferingSelector.replace("{plan}", plan)).click();
    }

    getCostLineItemLocator(planName: PlanVal): Locator {
        return this.page.locator(OrderReviewLocators.costLineItemSelector.replace("{planName}", planName));
    }

    async clickViewBillingSchedule(): Promise<void> {
        await this.page.locator(OrderReviewLocators.viewBillingScheduleSelector).click();
    }

    getBillingScheduleModalTitleLocator(): Locator {
        return this.page.locator(OrderReviewLocators.billingScheduleModalTitleSelector);
    }

    async clickViewPricingBreakdown(): Promise<void> {
        await this.page.locator(OrderReviewLocators.viewPricingBreakdownSelector).click();
    }

    getPricingBreakdownModalTitleLocator(): Locator {
        return this.page.locator(OrderReviewLocators.pricingBreakdownModalTitleSelector);
    }

    async clickContinue(): Promise<void> {
        await this.page.locator(OrderReviewLocators.continueButtonSelector).click();
        await this.page.waitForURL(/&journeyPane=Company\+info/, { waitUntil: "load", timeout: 30 * 1000 });
    }
}