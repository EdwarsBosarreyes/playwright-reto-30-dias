import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";

test("Login to hrm", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
});

test("Invalid login to hrm", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin1234");

  await expect(page.getByRole("alert")).toBeVisible();
});
