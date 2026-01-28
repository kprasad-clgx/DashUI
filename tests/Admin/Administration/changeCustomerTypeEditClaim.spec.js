import { expect, test } from '../../../fixtures/adminFixtures.js';
import CreateClaimPage from '../../../pageObjects/admin/dashAdmin/createNewClaim.po.js';
import RoleBasedSecurityPage from '../../../pageObjects/admin/adminstration/changeCustomerTypeEditClaim.po.js';
import claimData from '../../../testData/admin/adminClaimData.json' with { type: 'json' };

test('Change User Rights To See Company Customer Option on Edit Claim Page', async ({
  authenticatedPage,
}) => {
  const page = authenticatedPage;
  const createClaimPage = new CreateClaimPage(page);
  const roleBasedSecurityPage = new RoleBasedSecurityPage(page);

  // Navigate to Role Based Security Management page
  await roleBasedSecurityPage.navigateToRoleBasedSecurity();

  // Verify Update Role button is visible
  const updateRoleButton = await roleBasedSecurityPage.verifyUpdateRoleButton();
  await expect(updateRoleButton).toBeVisible();

  // Expand Claims Management to make Change Customer Type visible
  await roleBasedSecurityPage.expandClaimsManagement();

  // Enable Change Customer Type permission
  const changeCustomerTypeCheckbox = await roleBasedSecurityPage.enableChangeCustomerType();
  await expect(changeCustomerTypeCheckbox).toBeVisible();
  await expect(changeCustomerTypeCheckbox).toBeChecked();

  // Click on Update Role button
  await roleBasedSecurityPage.clickUpdateRoleButton();

  // Click on Create New Claim button
  await createClaimPage.clickCreateClaimBtn();

  // Complete claim creation workflow
  await createClaimPage.createClaimAndEditWorkFlow(claimData.claimDetails);

  // Click Admin Edit Claim button
  const adminEditClaimButton = roleBasedSecurityPage.getAdminEditClaimButton();
  await expect(adminEditClaimButton).toBeVisible();
  await roleBasedSecurityPage.clickAdminEditClaimButton();

  // Verify Switch Customer Type label
  const switchCustomerTypeLabel = await roleBasedSecurityPage.verifySwitchCustomerTypeLabel();
  await expect(switchCustomerTypeLabel).toBeVisible();
  await expect(switchCustomerTypeLabel).toHaveText(
    'Click the Company Customer radio button to change the customer type',
  );
});
