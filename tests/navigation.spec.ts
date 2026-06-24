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

test("Check all the qualification links", async ({ page }) => {
  const expectedPages = [
    {
      menu: "Skills",
      url: "/web/index.php/admin/viewSkills",
    },
    {
      menu: "Education",
      url: "/web/index.php/admin/viewEducation",
    },
    {
      menu: "Licenses",
      url: "/web/index.php/admin/viewLicenses",
    },
    {
      menu: "Languages",
      url: "/web/index.php/admin/viewLanguages",
    },
    {
      menu: "Memberships",
      url: "/web/index.php/admin/membership",
    },
  ];
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();

  await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Qualifications").click();

  const qualificationOptions = page.getByRole("menu").locator("li");

  for (let expectedPage of expectedPages) {
    const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu });
    await menuOption.click();
    await expect(page).toHaveURL(new RegExp(expectedPage.url));

    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Qualifications").click();
  }
});

test("Check all the job links", async ({ page }) => {
  const expectedPages = [
    {
      menu: "Job Titles",
      url: "/web/index.php/admin/viewJobTitleList",
    },
    {
      menu: "Pay Grades",
      url: "/web/index.php/admin/viewPayGrades",
    },
    {
      menu: "Employment Status",
      url: "/web/index.php/admin/employmentStatus",
    },
    {
      menu: "Job Categories",
      url: "/web/index.php/admin/jobCategory",
    },
    {
      menu: "Work Shifts",
      url: "/web/index.php/admin/workShift",
    },
  ];
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();

  await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Job").click();

  const qualificationOptions = page.getByRole("menu").locator("li");

  for (let expectedPage of expectedPages) {
    const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu });
    await menuOption.click();
    await expect(page).toHaveURL(new RegExp(expectedPage.url));

    await page.getByRole("navigation", { name: "Topbar Menu" }).getByText("Job").click();
  }
});
