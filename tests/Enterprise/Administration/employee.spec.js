import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import EmployeePage from '../../../pageObjects/enterprise/administrationFG/employee.po.js';
import employeeData from '../../../testData/enterprise/employeeData.json' with { type: 'json' };
import { getRandomNumber } from '../../../utils/randomNumber.js';

test('Verify Add New and Disable Employee Functionality', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const employeePage = new EmployeePage(page);

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
  await employeePage.selectRandomJobTitle();

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

  // Deactivate the employee
  await expect(await employeePage.verifyDeactivateCheckboxVisible()).toBeVisible();
  await expect(await employeePage.verifyDeactivateCheckboxNotChecked()).not.toBeChecked();
  await employeePage.checkDeactivateCheckbox();

  // Click on Save button
  await employeePage.clickSaveButton();

  // Reassign to an Active Employee modal should appear
  await expect(await employeePage.verifyReassignModalVisible()).toBeVisible({ timeout: 20000 });

  // Assert heading of the modal
  await expect(await employeePage.verifyReassignModalHeading()).toHaveText(
    'Reassign to an Active Employee',
  );

  // Wait for the iframe to be attached and visible
  await expect(await employeePage.verifyReassignIframeVisible()).toBeVisible({ timeout: 20000 });

  // Click the OK button to confirm reassignment
  await employeePage.clickReassignOkButton();

  // Wait for the modal to close
  await employeePage.waitForReassignModalToClose();

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
});
