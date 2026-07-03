import { Locator, Page } from "@playwright/test";
import { SideMenuOption } from "../SidePanel";

export class JobMenu {
  readonly page: Page;
  readonly job: Locator;

  constructor(page: Page) {
    this.page = page;
    this.job = page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Job");
  }

  getMenuOptionLocator(option: JobMenuOption) {
    return this.page.getByRole("menuitem", { name: option });
  }

  private async clickOnJob() {
    await this.job.click();
  }

  async clickOnJobOption(option: JobMenuOption) {
    await this.clickOnJob();
    await this.getMenuOptionLocator(option).click();
  }
}

export enum JobMenuOption {
  JOB_TITLES = "Job Titles",
  PAY_GRADES = "Pay Grades",
  EMPLOYMENT_STATUS = "Employment Status",
  JOB_CATEGORIES = "Job Categories",
  WORK_SHIFTS = "Work Shifts",
}
