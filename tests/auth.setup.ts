import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";

setup("aunthtentication as admin", async ({ page }) => {
  console.log("Authetication started using setup");

  //Login
  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();

  //Assert for successfull login
  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  //Save status
  await page.context().storageState({ path: ".auth/admin.json" });

  console.log("Authentication completed using setup");
});

/* setup("aunthtentication as employee", async ({ page }) => {
  console.log("Authetication started using setup");

  //Login
  const loginPage = new LoginPage(page);
  await loginPage.loginAsEmployee();

  //Assert for successfull login
  await expect(page.getByRole("link", { name: "Leave" })).toBeVisible();

  //Save status
  await page.context().storageState({ path: ".auth/employee.json" });

  console.log("Authentication completed using setup");
}); */
