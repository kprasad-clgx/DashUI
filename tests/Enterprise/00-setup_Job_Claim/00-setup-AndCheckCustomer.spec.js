import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import createJobData from '../../../testData/enterprise/enterpriseJobData.json' with { type: 'json' };
import AddIndividualCustomerPage from '../../../pageObjects/enterprise/contactManager/addIndividualCustomer.po.js';
import addIndividualCustomerData from '../../../testData/enterprise/enterpriseContactManager/addIndividualCustomer.json' with { type: 'json' };

const { newJobData } = createJobData;

test('Check Customer Present in Contact Manager, if not create a Customer for Job and Claim', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const addIndividualCustomerPage = new AddIndividualCustomerPage(page);

  // Hover on Contact Manager and click Individuals
  await addIndividualCustomerPage.hoverContactManager();
  await addIndividualCustomerPage.clickIndividualsMenu();

  // This targets the input with title="Name" inside the filter cell of #individualGrid
  const nameFilterInput = page.locator('#individualGrid .k-filtercell input[title="Name"]');
  await expect(nameFilterInput).toBeVisible();
  await page.waitForLoadState('networkidle');
  await nameFilterInput.fill(newJobData.customerName);
  await page.keyboard.press('Enter');
  await page.waitForLoadState('networkidle');
  // Wait for the grid to update
  const gridRows = page.locator('#individualGrid tbody[role="rowgroup"] tr[role="row"]');
  await page.waitForTimeout(5000); // Give time for filter to apply (adjust if needed)
  const rowCount = await gridRows.count();
  // Collect all names in the grid for debugging and matching
  let allNames = [];
  for (let i = 0; i < rowCount; i++) {
    const name = (await gridRows.nth(i).locator('td[data-field="PersonName"] a').textContent())?.trim() || '';
    allNames.push(name);
  }

  // Check if any row matches the expected customer name
  const found = allNames.some(name => name && name.includes(newJobData.customerName));
  if (found) {
    expect(true).toBe(true); // Customer found, test passes
    await page.close(); // Close the page/browser
    return;
  }

  // Click on Add New Individual button
  await addIndividualCustomerPage.clickAddNewIndividual();

  // Enter first name and verify
  await addIndividualCustomerPage.enterFirstName(newJobData.customerFirstName);
  await addIndividualCustomerPage.assertFirstName(newJobData.customerFirstName);

  // Enter last name and verify
  await addIndividualCustomerPage.enterLastName(newJobData.customerLastName);
  await addIndividualCustomerPage.assertLastName(newJobData.customerLastName);

  // Select contact type and verify
  await addIndividualCustomerPage.selectContactTypeCustomer(addIndividualCustomerData.contactType);
  await addIndividualCustomerPage.assertContactType(addIndividualCustomerData.contactType);

  // Enter phone number and verify
  await addIndividualCustomerPage.enterPhone(addIndividualCustomerData.mainPhone);
  await addIndividualCustomerPage.assertPhone(addIndividualCustomerData.mainPhone);

  // Enter address and zip, then verify city (city is auto-filled based on zip code)
  await addIndividualCustomerPage.enterAddress(newJobData.address);
  await addIndividualCustomerPage.enterZipCode(newJobData.zipCode);
  await addIndividualCustomerPage.assertCity(newJobData.city);

  // Save and verify URL
  await addIndividualCustomerPage.clickSaveIndividual();
  await addIndividualCustomerPage.assertSavedUrl();
});
