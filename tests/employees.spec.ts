import { expect, test } from "@playwright/test";

test("Get all the employees registered", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

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
