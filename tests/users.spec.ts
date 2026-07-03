import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import { getRandomElement } from "../src/utils/random";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

test.describe("HRM Login", () => {
  let loginPage: LoginPage;
  let sidePanel: SidePanel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sidePanel = new SidePanel(page);
  });

  test("Get all the usernames registered", async ({ page }) => {
    await loginPage.loginAsAdmin();

    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("User Management").click();
    await page.getByRole("menuitem", { name: "Users" }).click();

    const rows = page.getByRole("table").getByRole("row");
    const usernames: string[] = [];

    const rowCount = await rows.count();

    for (let i = 1; i < rowCount; i++) {
      const cell = rows.nth(i).getByRole("cell").nth(1);
      const username = await cell.textContent();

      if (username) {
        usernames.push(username);
      }
    }

    console.log(usernames);
  });

  test("Select specific user for edition", async ({ page }) => {
    const userForEdition = "FMLName1";

    await loginPage.loginAsAdmin();

    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("User Management").click();
    await page.getByRole("menuitem", { name: "Users" }).click();

    const pencilToEdit = page
      .getByRole("table")
      .getByRole("row")
      .filter({ hasText: userForEdition })
      .locator("button")
      .filter({ has: page.locator("i.bi-pencil-fill") });

    await pencilToEdit.click();

    const currentUsername = await page
      .locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
      .inputValue();

    expect(currentUsername).toEqual(userForEdition);

    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(
      currentUsername,
    );
  });

  test("Select random user for edition", async ({ page }) => {
    await loginPage.loginAsAdmin();

    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("User Management").click();
    await page.getByRole("menuitem", { name: "Users" }).click();

    const rows = page.getByRole("table").getByRole("row");
    const usernames: string[] = [];

    const rowCount = await rows.count();

    for (let i = 1; i < rowCount; i++) {
      const cell = rows.nth(i).getByRole("cell").nth(1);
      const username = await cell.textContent();

      if (username && username != "Admin") {
        usernames.push(username);
      }
    }

    const randomUsername = getRandomElement(usernames);

    const pencilToEdit = page
      .getByRole("table")
      .getByRole("row")
      .filter({ hasText: randomUsername })
      .locator("button")
      .filter({ has: page.locator("i.bi-pencil-fill") });

    await pencilToEdit.click();

    const currentUsername = await page
      .locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
      .inputValue();

    expect(currentUsername).toEqual(randomUsername);

    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(
      currentUsername,
    );
  });

  test("check user role options", async ({ page }) => {
    const expectedRoleOptions = ["-- Select --", "Admin", "ESS"];
    await loginPage.loginAsAdmin();
    await sidePanel.clicOnOption(SideMenuOption.ADMIN);

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
    const currentUserRoleOptions = await page.getByRole("listbox").getByRole("option").allInnerTexts();

    console.log(currentUserRoleOptions);
    expect(
      currentUserRoleOptions,
      "The options displayed in the User Role Dropdown do not match the expected options",
    ).toEqual(expectedRoleOptions);
  });

  test("check status options", async ({ page }) => {
    const expectedStatusOptions = ["-- Select --", "Enabled", "Disabled"];
    await loginPage.loginAsAdmin();
    await sidePanel.clicOnOption(SideMenuOption.ADMIN);

    await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click();
    const currentStatusOptions = await page.getByRole("listbox").getByRole("option").allInnerTexts();

    console.log(currentStatusOptions);
    expect(
      currentStatusOptions,
      "The options displayed in the User Role Dropdown do not match the expected options",
    ).toEqual(expectedStatusOptions);
  });
});
