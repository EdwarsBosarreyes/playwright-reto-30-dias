import { expect, test } from "@playwright/test";
import { getRandomElement } from "../src/utils/random";
import { SideMenuOption, SidePanel } from "../components/SidePanel";

import { Navigate } from "../pageobjects/Navigate";
import { AddNewUserPage } from "../pageobjects/AddNewUserPage";
import { UserFactory } from "../factory/UserFactory";
import { UsersTable } from "../components/UsersTable";

test("Get all the usernames registered @users", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clicOnOption(SideMenuOption.ADMIN);

  const usersTable = new UsersTable(page);
  await usersTable.getAllUsernames();
});

/* test("Select specific user for edition @users", async ({ page }) => {
  const userForEdition = "TestSpacesHrm";

  const navigate = new Navigate(page);
  await navigate.toUsers();

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
}); */

test("Select random user for edition @users", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toUsers();

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

  // const usernameInput = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input");

  const currentUsername = await page
    .locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
    .inputValue();

  // await usernameInput.waitFor({ state: "visible" });

  // const currentUsername = await usernameInput.inputValue();

  expect(currentUsername).toEqual(randomUsername);

  await expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(
    currentUsername,
  );
});

test("check user role options @users", async ({ page }) => {
  const expectedRoleOptions = ["-- Select --", "Admin", "ESS"];

  const navigate = new Navigate(page);
  await navigate.toUsers();

  await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
  const currentUserRoleOptions = await page.getByRole("listbox").getByRole("option").allInnerTexts();

  console.log(currentUserRoleOptions);
  expect(
    currentUserRoleOptions,
    "The options displayed in the User Role Dropdown do not match the expected options",
  ).toEqual(expectedRoleOptions);
});

test("check status options @users", async ({ page }) => {
  const expectedStatusOptions = ["-- Select --", "Enabled", "Disabled"];

  const navigate = new Navigate(page);
  await navigate.toUsers();

  await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click();
  const currentStatusOptions = await page.getByRole("listbox").getByRole("option").allInnerTexts();

  console.log(currentStatusOptions);
  expect(currentStatusOptions, "The options displayed in the User Role Dropdown do not match the expected options").toEqual(
    expectedStatusOptions,
  );
});

test("Filter by user admin @users", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toUsers();

  const allBodyRows = page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");

  //Filas que contienen el role admin
  const currentAdminRows = allBodyRows.filter({
    has: page.getByRole("cell").nth(2).getByText("Admin"),
  });

  const expectedAdminCount = await currentAdminRows.count();
  console.log("Admin users before filtering", expectedAdminCount);

  //Apliying filter
  await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
  await page.getByRole("listbox").getByRole("option", { name: "Admin" }).click();
  await page.getByRole("button", { name: "Search" }).click();

  //The table should have exactly the same number of items as expected
  await expect(allBodyRows).toHaveCount(expectedAdminCount);

  for (let i = 0; i < expectedAdminCount; i++) {
    await expect(allBodyRows.nth(i).getByRole("cell").nth(2)).toContainText("Admin");
  }

  // Convertimos el Locator en un array de Locators individuales usando .all()
  //const rows = await allBodyRows.all();

  // for (const row of rows) {
  //   await expect(row.getByRole("cell").nth(2)).toContainText("Admin");
  // }
});

test("Filter by user admin v2 @users", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toUsers();

  const allBodyRows = page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");

  //Filas que contienen el role admin
  const currentAdminRows = allBodyRows.filter({
    has: page.getByRole("cell").nth(2).getByText("Admin"),
  });

  const expectedAdminCount = await currentAdminRows.count();
  console.log("Admin users before filtering", expectedAdminCount);

  //Apliying filter
  await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
  await page.getByRole("listbox").getByRole("option", { name: "Admin" }).click();
  await page.getByRole("button", { name: "Search" }).click();

  //The table should have exactly the same number of items as expected
  await expect(allBodyRows).toHaveCount(expectedAdminCount);

  // Convertimos el Locator en un array de Locators individuales usando .all()
  const rows = await allBodyRows.all();

  for (const row of rows) {
    await expect(row.getByRole("cell").nth(2)).toContainText("Admin");
  }
});

test("Filter by user admin v3 @users", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toUsers();

  // 1. Identificamos el contenedor del cuerpo de la tabla
  const tableBody = page.getByRole("table").getByRole("rowgroup").nth(1);

  // Filtramos las filas que tienen "Admin" en la tercera columna (:nth-child(3))
  const currentAdminRows = tableBody.getByRole("row").filter({
    has: page.locator("td:nth-child(3), [role='cell']:nth-child(3)").getByText("Admin", { exact: true }),
  });

  // Esperamos a que la tabla cargue
  await currentAdminRows.first().waitFor({ state: "visible" });

  // 2. EXTRAEMOS TODOS LOS USERNAMES PRE-FILTRO
  // Usamos :nth-child(2) para extraer la segunda celda de CADA una de las filas filtradas
  const expectedUsernames = await currentAdminRows.locator("td:nth-child(2), [role='cell']:nth-child(2)").allTextContents();
  const cleanedExpectedUsernames = expectedUsernames.map((name) => name.trim()).filter(Boolean);

  console.log("Usernames esperados (Antes del filtro):", cleanedExpectedUsernames);

  // 3. APLICAMOS EL FILTRO EN LA UI
  await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click();
  await page.getByRole("listbox").getByRole("option", { name: "Admin" }).click();
  await page.getByRole("button", { name: "Search" }).click();

  // 4. ESPERAMOS A QUE LA TABLA SE ACTUALICE
  // 'networkidle' puede ser inestable si hay peticiones en bucle.
  // Una mejor alternativa es esperar a que la red se calme o usar un pequeño delay de renderizado:
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500); // Pequeño respiro para que el DOM se redibuje con los nuevos datos

  // 5. EXTRAEMOS LOS USERNAMES POST-FILTRO
  // Ahora todas las celdas visibles en la columna 2 deberían ser Admin
  const filteredCells = tableBody.locator("tr td:nth-child(2), [role='row'] [role='cell']:nth-child(2)");
  const actualUsernames = await filteredCells.allTextContents();
  const cleanedActualUsernames = actualUsernames.map((name) => name.trim()).filter(Boolean);

  console.log("Usernames obtenidos (Después del filtro):", cleanedActualUsernames);

  // 6. LA ASERCIÓN
  expect(cleanedActualUsernames).toEqual(cleanedExpectedUsernames);
});

test("capture all amounts @slow", async ({ page }) => {
  await page.goto("/web/index.php/claim/viewAssignClaim");

  const allBodyRows = page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");

  const amounts: number[] = [];

  const rowCount = await allBodyRows.count();
  console.log("Number of rows", rowCount);

  for (let i = 0; i < rowCount; i++) {
    const amountCell = allBodyRows.nth(i).getByRole("cell").nth(7);
    const amountText = await amountCell.textContent();
    console.log("This is the amount in text: ", amountText);

    if (amountText === null) {
      continue;
    }

    const convertedNumber = parseFloat(amountText?.replace(/,/g, "").trim());

    amounts.push(convertedNumber);
  }

  console.log(amounts);

  let total = 0;

  for (let amount of amounts) {
    total += amount;
  }

  console.log("Total is: ", total.toFixed(2));

  const average = total / rowCount;
  const max = Math.max(...amounts);
  const min = Math.min(...amounts);

  console.log("The average is: ", average.toFixed(2));
  console.log("The maximum is: ", max);
  console.log("The minimum is: ", min);
});

test("Add new user admin @users", async ({ page }) => {
  //const employeeToSearch = "Qwerty";
  const employeeToSearch = "manda";

  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clicOnOption(SideMenuOption.ADMIN);

  /* const userToAdd: UserModel = {
    username: randomUsername,
    employee: employeeToSearch,
    password: password,
    confirmePassword: password,
    role: "ESS",
    status: "Enabled",
  }; */

  const adminUser = UserFactory.createAdmin({
    role: "Admin",
    employee: employeeToSearch,
  });

  const addNewUserPage = new AddNewUserPage(page);
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();
});

test("Add new user invalid confirm password @users", async ({ page }) => {
  const password = "Random45..*";
  const employeeToSearch = "Qwerty";

  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clicOnOption(SideMenuOption.ADMIN);

  const adminUser = UserFactory.createAdmin({
    employee: employeeToSearch,
    confirmePassword: password,
  });

  const addNewUserPage = new AddNewUserPage(page);
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUnmatchPasswordsMessage();
});

test("Add disabled new admin user @users", async ({ page }) => {
  const employeeToSearch = "manda";

  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clicOnOption(SideMenuOption.ADMIN);

  const adminUser = UserFactory.createAdmin({
    role: "Admin",
    employee: employeeToSearch,
    status: "Disabled",
  });

  const addNewUserPage = new AddNewUserPage(page);
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();
});

test("Add new user admin2 V2 @users @slow", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toUsers();

  const usersTable = new UsersTable(page);
  await usersTable.editFirstAdminOnTable();

  const addNewUserPage = new AddNewUserPage(page);
  const fullUserToSearch = await addNewUserPage.getEmployeeName();

  const adminUser = UserFactory.createAdmin({
    role: "Admin",
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();
});

test("Add new user employee @users", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clicOnOption(SideMenuOption.ADMIN);

  const allBodyRows = page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");

  //Filas que contienen el role ESS
  const currentAdminRows = allBodyRows.filter({
    has: page.getByRole("cell").nth(2).getByText("ESS"),
  });

  const firstEmployeeToSearch = currentAdminRows.nth(0);

  await expect(firstEmployeeToSearch, "No admin users found in the table").toHaveCount(1);

  await firstEmployeeToSearch
    .locator("button")
    .filter({ has: page.locator("i.bi-pencil-fill") })
    .click();

  const fullUserToSearch = await page.getByRole("textbox", { name: "Type for hints..." }).inputValue();
  console.log(`User to search ${fullUserToSearch}`);

  const employeeUser = UserFactory.createAdmin({
    role: "ESS",
    employee: fullUserToSearch,
  });

  await page.goBack();
  const addNewUserPage = new AddNewUserPage(page);
  await addNewUserPage.addNewUser(employeeUser);
  await addNewUserPage.checkUserWasAddedMessage();
});

test("Delete user admin @users @slow", async ({ page }) => {
  //Arrange
  const navigate = new Navigate(page);
  await navigate.toUsers();

  const usersTable = new UsersTable(page);
  await usersTable.editFirstAdminOnTable();

  const addNewUserPage = new AddNewUserPage(page);
  const fullUserToSearch = await addNewUserPage.getEmployeeName();

  const adminUser = UserFactory.createAdmin({
    role: "Admin",
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();

  //Act
  await usersTable.clickOnDeleteActionByUsername(adminUser.username);
  await usersTable.acceptDeleteUser();

  //Assert
  await addNewUserPage.checkUserWasSuccessfullyDeletedMessage();
  await usersTable.confirmUserWasRemovedFromTable(adminUser.username);
});

test("Cancel delete of user admin @users", async ({ page }) => {
  //Arrange
  const navigate = new Navigate(page);
  await navigate.toUsers();

  const usersTable = new UsersTable(page);
  await usersTable.editFirstAdminOnTable();

  const addNewUserPage = new AddNewUserPage(page);
  const fullUserToSearch = await addNewUserPage.getEmployeeName();

  const adminUser = UserFactory.createAdmin({
    role: "Admin",
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();

  //Act
  await usersTable.clickOnDeleteActionByUsername(adminUser.username);
  await usersTable.cancelDeleteUser();

  //Assert
  await usersTable.confirmUserIsOnTable(adminUser.username);
});
