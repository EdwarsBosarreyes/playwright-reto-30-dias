import { Locator, Page } from "@playwright/test";

export class QualificationsMenu {
  readonly page: Page;
  readonly qualifications: Locator;

  constructor(page: Page) {
    this.page = page;
    this.qualifications = page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Qualifications");
  }

  private getMenuOptionLocator(option: QualificationsMenuOption) {
    return this.page.getByRole("menuitem", { name: option });
  }

  private async clickOnQualification() {
    await this.qualifications.click();
  }

  async clickOnQualificationOption(option: QualificationsMenuOption) {
    await this.clickOnQualification();
    await this.getMenuOptionLocator(option).click();
  }
}

export enum QualificationsMenuOption {
  SKILLS = "Skills",
  EDUCATION = "Education",
  LICENSES = "Licenses",
  LANGUAGES = "Languages",
  MEMBERSHIPS = "Memberships",
}
