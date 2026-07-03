import { Locator, Page } from "@playwright/test";

export class JobMenu {
  readonly page: Page;
  readonly job: Locator;
  readonly jobTitleOption;
  readonly payGradesOption;

  constructor(page: Page) {
    this.page = page;
    this.job = page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Job");
    this.jobTitleOption = page.getByRole("menuitem", { name: "Job Titles" });
    this.payGradesOption = page.getByRole("menuitem", { name: "Pay Grades" });
  }

  private async clickOnJob() {
    await this.job.click();
  }

  async clickOnJobTitles() {
    await this.clickOnJob();
    await this.jobTitleOption.click();
  }

  async clickOnPayGrades() {
    await this.clickOnJob();
    await this.payGradesOption.click();
  }
}
