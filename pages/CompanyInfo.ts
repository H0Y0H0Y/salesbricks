import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

class CompanyInfoLocators {
    static get companyLegalNameSelector(): string {
        return "//input[@data-test='primaryUserCompany']";
    }

    static get streetAddressSelector(): string {
        return "//input[@data-test='components-addressInput-line1']";
    }

    static get suiteBldgSelector(): string {
        return "//input[@data-test='components-addressInput-line2']";
    }

    static get citySelector(): string {
        return "//input[@data-test='components-addressInput-city']";
    }

    static get zipCodeSelector(): string {
        return "//input[@data-test='components-addressInput-zip']";
    }

    static get firstNameSelector(): string {
        return "//input[@data-test='components-personInput-firstName']";
    }

    static get lastNameSelector(): string {
        return "//input[@data-test='components-personInput-lastName']";
    }

    static get jobTitleSelector(): string {
        return "//input[@data-test='components-personInput-role']";
    }

    static get workEmailSelector(): string {
        return "//input[@data-test='components-personInput-email']";
    }

    static get continueButtonSelector(): string {
        return "//button[@data-test='components-buildOrder-continue']";
    }
}

export default class CompanyInfo {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async specifyCompanyInfo() {
        await this.page.locator(CompanyInfoLocators.companyLegalNameSelector).fill(faker.company.name());
        await this.page.locator(CompanyInfoLocators.streetAddressSelector).fill(faker.location.streetAddress());
        await this.page.locator(CompanyInfoLocators.suiteBldgSelector).fill(faker.location.secondaryAddress());
        await this.page.locator(CompanyInfoLocators.citySelector).fill(faker.location.city());
        await this.page.locator(CompanyInfoLocators.zipCodeSelector).fill(faker.location.zipCode());
    }

    async specifyPointOfContact() {
        await this.page.locator(CompanyInfoLocators.firstNameSelector).fill(faker.person.firstName());
        await this.page.locator(CompanyInfoLocators.lastNameSelector).fill(faker.person.lastName());
        await this.page.locator(CompanyInfoLocators.jobTitleSelector).fill(faker.person.jobTitle());
        await this.page.locator(CompanyInfoLocators.workEmailSelector).fill(faker.internet.email());
    }

    async clickContinue() {
        await this.page.locator(CompanyInfoLocators.continueButtonSelector).click();
        await this.page.waitForURL(/&journeyPane=Checkout/, { waitUntil: 'domcontentloaded', timeout: 30 * 1000 });
    }
}