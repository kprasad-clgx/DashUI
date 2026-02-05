import { test } from '../../../fixtures/enterpriseFixtures.js';
import { EmployeePage } from '../../../pageObjects/enterprise/quickNotes/EmployeePage.po.js';
import employeeData from '../../../testData/Enterprise/quickNotes/createEmployee/employeeData.json' with { type: 'json' };
import { generateUniqueName } from '../../../utils/helpers.js';

test('Create Employee from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const employeePage = new EmployeePage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Employee
  await employeePage.openQuickNotesCreateEmployee();

  // make username/email unique for test isolation
  const uniqueData = {
    ...employeeData,
    userName: generateUniqueName(employeeData.userName),
    email: employeeData.email.replace('@', `${generateUniqueName('')}@`),
  };

  // Create employee using the complete workflow
  await employeePage.createEmployee(uniqueData);

  // Assert that the success message is displayed
  await employeePage.assertSuccessMessage();
});

test('Deactivate Employee', async ({ authenticatedPage }) => {
  // Initialize page objects
  const employeePage = new EmployeePage(authenticatedPage);

  // First, create an employee to deactivate
  await employeePage.openQuickNotesCreateEmployee();

  const uniqueData = {
    ...employeeData,
    userName: generateUniqueName(employeeData.userName),
    email: employeeData.email.replace('@', `${generateUniqueName('')}@`),
  };

  await employeePage.createEmployee(uniqueData);
  await employeePage.assertSuccessMessage();

  // Navigate to employee list
  await employeePage.navigateTo('Administration', 'Employee');

  // Wait for the employee grid page to fully load
  await authenticatedPage.waitForLoadState('networkidle');
  await authenticatedPage.waitForTimeout(3000);

  // Search for the created employee by username
  await employeePage.searchEmployeeByUsername(uniqueData.userName);

  // Click the Edit link for the employee
  await employeePage.clickEditEmployee();

  // Deactivate the employee
  await employeePage.deactivateEmployee();

  // Navigate back to employee list to search for deactivated employee
  await employeePage.navigateTo('Administration', 'Employee');
  await authenticatedPage.waitForLoadState('networkidle');
  await authenticatedPage.waitForTimeout(2000);

  //search the deactivated employee
  await employeePage.searchEmployeeByUsername(uniqueData.userName);

  //assert no employee has been found
  await employeePage.assertEmployeeNotFound(uniqueData.userName);
});
