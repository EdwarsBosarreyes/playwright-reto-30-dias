import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";

test("Get all the employees registered", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();
  await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("User Management").click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const rows = page.getByRole("table").getByRole("row");

  const employees: string[] = [];

  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) {
    const cell = rows.nth(i).getByRole("cell").nth(3);
    const employee = await cell.textContent();

    if (employee) {
      employees.push(employee);
    }
  }

  console.log(employees);
});
