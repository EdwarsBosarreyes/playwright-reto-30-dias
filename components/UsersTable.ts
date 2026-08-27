import { expect, Locator, Page } from "@playwright/test";

export class UsersTable {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private getAllBodyRows(): Locator {
    return this.page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");
  }

  async getAllUsernames(): Promise<string[]> {
    const rows = this.getAllBodyRows();

    const usernames: string[] = [];

    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const cell = rows.nth(i).getByRole("cell").nth(1);
      const username = await cell.textContent();

      if (username) {
        usernames.push(username);
      }
    }

    console.log(usernames);

    return usernames;
  }

  private getAdminRows(): Locator {
    const allBodyRows = this.getAllBodyRows();
    //Filas que contienen el role admin
    const currentAdminRows = allBodyRows.filter({
      has: this.page.getByRole("cell").nth(2).getByText("Admin"),
    });

    return currentAdminRows;
  }

  private async getFirstAdminFromTable(): Promise<Locator> {
    const currentAdminRows = this.getAdminRows();
    const firstAdminToSearch = currentAdminRows.nth(0);
    await expect(firstAdminToSearch, "No admin users found in the table").toHaveCount(1);
    return firstAdminToSearch;
  }

  async editFirstAdminOnTable() {
    const firsAdminToEdit = await this.getFirstAdminFromTable();

    await firsAdminToEdit
      .locator("button")
      .filter({ has: this.page.locator("i.bi-pencil-fill") })
      .click();
  }

  async clickOnDeleteActionByUsername(username: string) {
    const allBodyRows = this.getAllBodyRows();

    const filteredRowsByUsername = allBodyRows.filter({
      has: this.page.getByRole("cell").nth(1).getByText(username),
    });

    expect(filteredRowsByUsername, `No rows contain username: ${username} were found`).toHaveCount(1);

    await filteredRowsByUsername
      .locator("button")
      .filter({
        has: this.page.locator("i.bi-trash"),
      })
      .click();
  }

  async acceptDeleteUser() {
    await this.page.getByRole("button", { name: /Yes, Delete/ }).click();
  }

  async cancelDeleteUser() {
    await this.page.getByRole("button", { name: /No, Cancel/ }).click;
  }

  async confirmUserWasRemovedFromTable(username: string): Promise<void> {
    // await expect
    //   .poll(
    //     async () => {
    //       const usernames = await this.getAllUsernames();
    //       return usernames;
    //     },
    //     {
    //       message: `The user: ${username} has not been deleted`,
    //     },
    //   )
    //   .not.toContain(username);
    const userLocator = this.page.getByRole("cell").getByText(username);
    await expect(userLocator, `The user: ${username} is present on table`).not.toBeVisible();
  }

  async confirmUserIsOnTable(username: string): Promise<void> {
    const userLocator = this.page.getByRole("cell").getByText(username);
    await expect(userLocator, `The user: ${username} is not present on table`).toBeVisible();
  }
}
