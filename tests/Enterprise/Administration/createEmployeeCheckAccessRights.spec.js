import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import EmployeePage from '../../../pageObjects/enterprise/administrationFG/employee.po.js';
import employeeData from '../../../testData/enterprise/employeeData.json' with { type: 'json' };
import { getRandomNumber } from '../../../utils/randomNumber.js';
import EmployeeSecuritySettingsPage from '../../../pageObjects/enterprise/administrationFG/employeeSecuritySettings.po.js';
import RoleBasedSecurityManagementPage from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/roleBasedSecurityManagement.po.js';

test('Check Disabled Employee does not secuirty Rights from group settings', async ({
  authenticatedPage,
}) => {
  const page = authenticatedPage;
  const employeePage = new EmployeePage(page);
  const employeeSecuritySettingsPage = new EmployeeSecuritySettingsPage(page);
  const roleBasedSecurityPage = new RoleBasedSecurityManagementPage(page);

  // Navigate to Employee page from Administration menu
  await employeePage.navigateToEmployee();

  // Verify Employee Details text is visible
  await expect(await employeePage.verifyEmployeeDetailsText()).toBeVisible();

  // Verify Show Active Employees label is visible
  await expect(await employeePage.verifyShowActiveEmployeesCheckbox()).toBeVisible();

  // Verify Show Inactive Employees label is visible
  await expect(await employeePage.verifyShowInactiveEmployeesCheckbox()).toBeVisible();

  // Verify Show All Employees label is visible
  await expect(await employeePage.verifyShowAllEmployeesCheckbox()).toBeVisible();

  // Verify Name column header is hidden
  await expect(await employeePage.verifySecondNameHeader()).toBeHidden();

  // Verify User ID column header is visible
  await expect(await employeePage.verifyUserIdHeader()).toBeVisible();

  // Verify Address column header is visible
  await expect(await employeePage.verifyAddressHeader()).toBeVisible();

  // Verify Email column header is visible
  await expect(await employeePage.verifyEmailHeader()).toBeVisible();

  // Verify Status column header is visible
  await expect(await employeePage.verifyStatusHeader()).toBeVisible();

  // Verify Refresh button is visible
  await expect(await employeePage.verifyRefreshButton()).toBeVisible();

  // Verify Export to Excel button is visible
  await expect(await employeePage.verifyExportToExcelButton()).toBeVisible();

  // Verify Export to PDF button is visible
  await expect(await employeePage.verifyExportToPdfButton()).toBeVisible();

  // Verify Add New button is visible and has button type attribute
  await expect(await employeePage.verifyAddNewButton()).toBeVisible();
  await expect(await employeePage.verifyAddNewButton()).toHaveAttribute('type', 'button');

  // Click on Add New button to navigate to the Add Employee form
  await employeePage.clickAddNewButton();

  // Verify section headings are visible
  const headingSectionText = [
    'Employee Details',
    'Address Information',
    'Payroll Details',
    'Profile Details',
  ];

  for (const sectionText of headingSectionText) {
    await expect(await employeePage.verifySectionHeading(sectionText)).toBeVisible();
  }

  // Generate a random number and create a unique first name
  const randomNumber = getRandomNumber(1, 10000);
  const uniqueFirstName = `John${randomNumber}`;

  // Fill employee form fields
  await employeePage.fillFirstName(uniqueFirstName);
  await employeePage.fillLastName(employeeData.employee.lastName);
  await employeePage.fillUserName(uniqueFirstName);
  await employeePage.fillPassword(uniqueFirstName);

  // Select random job title
  const selectedJobTitle = await employeePage.selectRandomJobTitle();

  // Fill address information
  await employeePage.fillStateProvince(employeeData.employee.address.state);
  await employeePage.fillAddress(employeeData.employee.address.street);
  await employeePage.fillZipCode(employeeData.employee.address.zip);
  await employeePage.fillCity(employeeData.employee.address.city);
  await employeePage.fillEmail(uniqueFirstName + '@gmail.com');

  // Save the employee
  await employeePage.clickSaveButton();

  // Verify success message
  const successMessage = await employeePage.verifySuccessMessage(
    'Employee details updated successfully.',
  );
  await expect(successMessage).toHaveText('Employee details updated successfully.');

  // Go back to employee list
  await employeePage.clickBackButton();

  // Search for the newly added employee by User ID
  await employeePage.searchByUserId(uniqueFirstName);

  // Verify grid is visible
  await expect(await employeePage.verifyGridDataVisible()).toBeVisible({
    timeout: 10000,
  });
  await expect(await employeePage.verifyGridTableVisible()).toBeVisible({
    timeout: 10000,
  });

  // Verify only one employee is found
  const editLinksCount = await employeePage.getEditLinksCount();
  expect(editLinksCount).toBe(1);

  // Click on edit link after verifying count
  await employeePage.clickEditLinkByName();

  // Deactivate the employee locator
  const deactivateCheckbox = page.locator('#ctl00_ContentPlaceHolder1_chkInactive');
  await expect(deactivateCheckbox).toBeVisible();
  await expect(deactivateCheckbox).not.toBeChecked();

  await deactivateCheckbox.check(); // Deactivate the employee
  await page.waitForLoadState('networkidle');

  // Click on Save button
  await employeePage.clickSaveButton();
  await page.waitForLoadState('networkidle');

  // Reassign to an Active Employee modal should appear
  const reassignModal = page.locator('#RadWindowWrapper_ctl00_ContentPlaceHolder1_window_Common');
  await expect(reassignModal).toBeVisible({ timeout: 20000 });

  // Assert heading of the modal
  const modalHeading = reassignModal.locator('em');
  await expect(modalHeading).toHaveText('Reassign to an Active Employee');

  // Wait for the iframe to be attached and visible
  await expect(page.locator('iframe[name="window_Common"]')).toBeVisible({ timeout: 20000 });

  // Get its frame locator for interacting with elements inside
  const reassignFrame = page.frameLocator('iframe[name="window_Common"]');

  // Wait for the OK button to be visible before clicking
  const okButton = reassignFrame
    .locator('input[type="submit"][value="OK"], button:has-text("OK"), input[value="OK"]')
    .first();
  await expect(okButton).toBeVisible({ timeout: 20000 });

  // Prepare to accept the alert dialog after modal closes
  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  // Click the OK button to confirm reassignment
  await okButton.click();

  // Wait for the modal to close (become hidden or detached)
  await expect(reassignModal).toBeHidden({ timeout: 20000 });
  await page.waitForLoadState('networkidle');

  // Click on Show Inactive Employees
  await employeePage.clickShowInactiveEmployeesCheckbox();

  // Search for the deactivated employee by User ID
  await employeePage.searchByUserId(uniqueFirstName);

  // Verify grid is visible
  await expect(await employeePage.verifyGridDataVisible()).toBeVisible({
    timeout: 10000,
  });
  await expect(await employeePage.verifyGridTableVisible()).toBeVisible({
    timeout: 10000,
  });

  // Verify only one employee is found
  const editLinksCountInActive = await employeePage.getEditLinksCount();
  expect(editLinksCountInActive).toBe(1);

  // Navigate to Employee Security Settings page from Administration menu
  await employeeSecuritySettingsPage.navigateToEmployeeSecuritySettings();

  // Click on Group Security tile
  await employeeSecuritySettingsPage.clickGroupSecurityTile();

  // Verify User Group Access text is visible and has correct text
  await expect(await roleBasedSecurityPage.verifyUserGroupAccessText()).toBeVisible();
  await expect(await roleBasedSecurityPage.verifyUserGroupAccessText()).toHaveText(
    'User Group Access',
  );

  // Verify Update button is disabled initially
  await expect(await roleBasedSecurityPage.verifyUpdateButton()).toHaveAttribute(
    'disabled',
    'disabled',
  );

  // Verify Select Group dropdown is visible and enabled
  await expect(await roleBasedSecurityPage.verifySelectGroupDropdown()).toBeVisible();
  await expect(await roleBasedSecurityPage.verifySelectGroupDropdown()).toBeEnabled();

  // Select CEO option from the dropdown
  await roleBasedSecurityPage.selectGroupOptionByText(selectedJobTitle);

  // Verify Update button is enabled after selecting an option
  await expect(await roleBasedSecurityPage.verifyUpdateButton()).toBeEnabled();

  // Assert that the Username is not in Group security Employee Name Grid list
  await roleBasedSecurityPage.groupSecurityEmployeeNameSearchInput(uniqueFirstName);
});
