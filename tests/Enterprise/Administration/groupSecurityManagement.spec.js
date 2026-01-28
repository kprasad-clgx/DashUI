import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import RoleBasedSecurityManagementPage from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/roleBasedSecurityManagement.po.js';

test('Group Security Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const roleBasedSecurityPage = new RoleBasedSecurityManagementPage(page);

  // Navigate to Group Security page through Administration > Employee / Security Settings
  await roleBasedSecurityPage.navigateToGroupSecurity();

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
  await roleBasedSecurityPage.selectGroupOption('349');

  // Verify Update button is enabled after selecting an option
  await expect(await roleBasedSecurityPage.verifyUpdateButton()).toBeEnabled();
});
