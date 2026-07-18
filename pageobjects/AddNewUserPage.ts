import { expect, Locator, Page } from "@playwright/test";
import { UserModel } from "../models/UserModel";

export class AddNewUserPage {
  private readonly page: Page;
  private readonly addButton: Locator;
  private readonly roleDropdown: Locator;
  private readonly employeeNameInput: Locator;
  private readonly statusDropdown: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPassword: Locator;
  private readonly saveButton: Locator;
  private readonly successSaveMessage: Locator;
  private readonly unmatchPasswordsErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByText("Add");
    this.roleDropdown = page
      .locator("div.oxd-grid-item--gutters")
      .filter({
        has: this.page.getByText("User Role"),
      })
      .locator("div.oxd-select-text-input");
    this.employeeNameInput = page.getByRole("textbox", { name: "Type for hints..." });
    this.statusDropdown = page
      .locator("div.oxd-grid-item--gutters")
      .filter({
        has: page.getByText("Status"),
      })
      .locator("div.oxd-select-text-input");
    this.usernameInput = page
      .locator("div.oxd-grid-item--gutters")
      .filter({
        has: this.page.getByText("Username"),
      })
      .getByRole("textbox");
    this.passwordInput = page
      .locator("div.oxd-grid-item--gutters")
      .filter({
        has: this.page.getByText("Password", { exact: true }),
      })
      .getByRole("textbox");
    this.confirmPassword = page
      .locator("div.oxd-grid-item--gutters")
      .filter({
        has: this.page.getByText("Confirm Password", { exact: true }),
      })
      .getByRole("textbox");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.successSaveMessage = page.locator("p.oxd-text--toast-message");
    this.unmatchPasswordsErrorMessage = page.locator("span.oxd-input-field-error-message");
  }

  async clickOnAdd() {
    await this.addButton.click();
  }

  async selectUserRole(roleName: string) {
    await this.roleDropdown.click();
    //await this.page.getByText(roleName, { exact: true }).click();
    await this.page.getByRole("option", { name: roleName }).click();
  }

  async selectEmployeeName(employeeName: string) {
    await this.employeeNameInput.fill(employeeName);
    // await this.page.getByRole("option", { name: "Qwerty Qwerty LName" }).click();
    await this.page.getByRole("option", { name: new RegExp(employeeName) }).click();
  }

  async selectStatus(status: string) {
    await this.statusDropdown.click();

    await this.page.getByText(status).click();
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async enterConfirmPassword(password: string) {
    await this.confirmPassword.fill(password);
  }

  async clickOnSave() {
    await this.saveButton.click();
  }

  async checkUserWasAddedMessage() {
    await expect(this.successSaveMessage).toHaveText("Successfully Saved");
  }

  async checkUnmatchPasswordsMessage() {
    await expect(this.unmatchPasswordsErrorMessage).toHaveText("Passwords do not match");
  }

  async addNewUser(user: UserModel) {
    await this.clickOnAdd();
    await this.selectUserRole(user.role);
    await this.selectEmployeeName(user.employee);
    await this.selectStatus(user.status);
    await this.enterUsername(user.username);
    await this.enterPassword(user.password);
    await this.enterConfirmPassword(user.confirmePassword);
    await this.clickOnSave();
  }
}
