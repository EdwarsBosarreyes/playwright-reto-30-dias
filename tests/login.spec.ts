import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

test.describe("HRM Login and Navigation Tests", () => {
  let loginPage: LoginPage;
  let sidePanel: SidePanel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sidePanel = new SidePanel(page);
  });

  test("Login to hrm", async () => {
    await loginPage.doLogin("Admin", "admin123");

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
    await loginPage.doLogin("Admin", "admin123");

    const randomOption = sidePanel.getRandomMenuOption();
    await sidePanel.searchText(randomOption);

    const searchedLink = sidePanel.getMenuOptionLocator(randomOption);
    await expect(searchedLink).toHaveText(randomOption);
    await searchedLink.click();
  });
});
