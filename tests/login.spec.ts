import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

test("Login to hrm as Admin", async ({ page }) => {
  await page.goto("/web/index.php/dashboard/index");
  const sidePanel = new SidePanel(page);

  await sidePanel.clicOnOption(SideMenuOption.ADMIN);
  await sidePanel.clicOnOption(SideMenuOption.BUZZ);
  await sidePanel.clicOnOption(SideMenuOption.DASHBOARD);
});

test("Invalid login to hrm", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin1234");

  await expect(page.getByRole("alert")).toBeVisible();
});

test("Search in the sidebar and clinking", async ({ page }) => {
  await page.goto("/web/index.php/dashboard/index");
  const sidePanel = new SidePanel(page);

  const randomOption = sidePanel.getRandomMenuOption();
  await sidePanel.searchText(randomOption);

  const searchedLink = sidePanel.getMenuOptionLocator(randomOption);
  await expect(searchedLink).toHaveText(randomOption);
  await searchedLink.click();
});

test("Login to HRM as Employee", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const sidePanel = new SidePanel(page);
  //await loginPage.loginAsEmployee();
  await expect(sidePanel.getMenuOptionLocator(SideMenuOption.ADMIN)).toBeHidden();
});
