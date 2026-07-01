import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import { getRandomElement } from "../src/utils/random";

test("Get all the usernames registered", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

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

  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

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
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

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
