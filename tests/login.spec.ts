import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

test("Login to hrm", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

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
