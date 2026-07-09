import { test } from "@playwright/test";

test("capture all amounts", async ({ page }) => {
  await page.goto("/web/index.php/claim/viewAssignClaim");
  const allBodyRows = page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");

  const amounts: number[] = [];

  const rowCount = await allBodyRows.count();
  console.log("Number of rows", rowCount);

  for (let i = 0; i < rowCount; i++) {
    const amouncell = allBodyRows.nth(i).getByRole("cell").nth(7);
    const amountText = await amouncell.textContent();
    console.log("This is the amount in text:", amountText);

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

  const max = Math.max(...amounts);
  const min = Math.min(...amounts);

  const average = total / rowCount;

  console.log("Total is: ", total.toFixed(2));
  console.log("The max value is: ", max);
  console.log("The min value is: ", min);
  console.log("The average is: ", average.toFixed(2));
});
