import { Locator, Page } from "@playwright/test";

export class OrganizationMenu {
  readonly page: Page;
  readonly organization: Locator;

  constructor(page: Page) {
    this.page = page;
    this.organization = page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Organization");
  }

  private getMenuOptionLocator(option: OrganizationMenuOption) {
    return this.page.getByRole("menuitem", { name: option });
  }

  private async clickOnOrganization() {
    await this.organization.click();
  }

  async clickOnOrganizationOption(option: OrganizationMenuOption) {
    await this.clickOnOrganization();
    await this.getMenuOptionLocator(option).click();
  }
}

export enum OrganizationMenuOption {
  GENERAL_INFORMATION = "General Information",
  LOCATIONS = "Locations",
  STRUCTURE = "Structure",
}
