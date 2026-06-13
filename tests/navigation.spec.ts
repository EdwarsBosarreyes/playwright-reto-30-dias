import { test, expect } from "@playwright/test";

test("Check left menu options", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  const leftMenuItems = page.getByLabel("Sidepanel").getByRole("listitem");
  const currentMenuItemsCount = await leftMenuItems.count();
  console.log("Current Menu Items count", currentMenuItemsCount);

  const currentMenuItems: String[] = [];

  for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuText = await leftMenuItems.nth(i).innerText();
    currentMenuItems.push(menuText);
  }

  console.log(currentMenuItems);
  console.log(currentMenuItems[0]);

  const expectedMenuItems = [
    "Admin",
    "PIM",
    "Leave",
    "Time",
    "Recruitment",
    "My Info",
    "Performance",
    "Dashboard",
    "Directory",
    "Maintenance",
    "Claim",
    "Buzz",
  ];

  expect(currentMenuItems).toEqual(expectedMenuItems);
  expect(currentMenuItems[0]).toEqual(expectedMenuItems[0]);
});

test("Navigate through the left panel", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  const leftMenuItems = page.getByLabel("Sidepanel").getByRole("listitem");
  const currentMenuItemsCount = await leftMenuItems.count();

  for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuItem = leftMenuItems.nth(i);
    const menuText = await menuItem.innerText();

    console.log("Current menu item", menuText);
    await menuItem.click();
    if (menuText === "Maintenance") {
      await page.goBack();
    }
  }
});
