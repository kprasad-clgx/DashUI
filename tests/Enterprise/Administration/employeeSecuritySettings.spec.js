import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import EmployeeSecuritySettingsPage from '../../../pageObjects/enterprise/administrationFG/employeeSecuritySettings.po.js';

test('Verify Employee Group Security Settings Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const employeeSecuritySettingsPage = new EmployeeSecuritySettingsPage(page);

  // Navigate to Employee Security Settings page from Administration menu
  await employeeSecuritySettingsPage.navigateToEmployeeSecuritySettings();

  // Verify Group Security tile is visible
  await expect(await employeeSecuritySettingsPage.verifyGroupSecurityTileVisible()).toBeVisible();

  // Click on Group Security tile
  await employeeSecuritySettingsPage.clickGroupSecurityTile();

  // Verify User Group Access text is visible
  await expect(await employeeSecuritySettingsPage.verifyUserGroupAccessTextVisible()).toBeVisible();

  // Verify User Group Access text has correct content
  await expect(await employeeSecuritySettingsPage.verifyUserGroupAccessTextContent()).toHaveText(
    'User Group Access',
  );

  // Verify Update button is disabled by default
  await expect(await employeeSecuritySettingsPage.verifyUpdateButtonDisabled()).toHaveAttribute(
    'disabled',
    'disabled',
  );

  // Verify Select Group dropdown is visible
  await expect(await employeeSecuritySettingsPage.verifySelectGroupDropdownVisible()).toBeVisible();

  // Verify Select Group dropdown is enabled
  await expect(await employeeSecuritySettingsPage.verifySelectGroupDropdownEnabled()).toBeEnabled();

  // Select CEO option from the dropdown
  await employeeSecuritySettingsPage.selectGroupOption('349');

  // Verify Update button is enabled after selecting an option
  await expect(await employeeSecuritySettingsPage.verifyUpdateButtonEnabled()).toBeEnabled();
});
