import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateClaimPage } from '../../../pageObjects/enterprise/dashEnterprise/createNewClaim.po.js';
import { CreateClaimCloseClaimPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createClaimCloseClaim.po.js';
import claimDetails from '../../../testData/enterprise/enterpriseClaimData.json' with { type: 'json' };
import { isProduction } from '../../../utils/testTags.js';

// Test data for creating a new claim
const { claimDetails: createNewClaimDetails } = claimDetails;

// Skip this test in production environment
test.skip(isProduction(), 'Skip in production');

// Create a new claim and persist its job number
test('Create Claim Enterprise', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const closeClaimPage = new CreateClaimCloseClaimPage(page);
  const createClaimPage = new CreateClaimPage(page);

  const jobNumber = await createClaimPage.createNewClaim(createNewClaimDetails);

  await page.waitForLoadState('networkidle');

  // Refresh the page to ensure the new job appears in the dashboard
  await page.reload();
  await page.waitForLoadState('networkidle');

  // Reject all compliance tasks
  await closeClaimPage.rejectAllComplianceTasks();

  await page.waitForLoadState('networkidle');

  // Click on Edit Job information
  const jobInformationEdit = page.locator('#img_EditDivision');
  await jobInformationEdit.waitFor({ state: 'visible' });
  await jobInformationEdit.click();

  // Assert the Edit Job Information modal is present
  const modalTitle = page.locator('.rwTitlebar em', { hasText: 'Edit Job Information' });
  await expect(modalTitle).toBeVisible({ timeout: 10000 });
  // Assert the modal wrapper is visible
  const modalWrapper = page.locator('#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common');
  await expect(modalWrapper).toBeVisible({ timeout: 10000 });

  // Assert the iframe inside the modal is visible
  const modalIframe = page.locator('iframe[name="RadWindow_Common"]');
  await expect(modalIframe).toBeVisible({ timeout: 10000 });

  // Interact with the iframe: click the select custom code dropdown arrow
  const frame = page.frameLocator('iframe[name="RadWindow_Common"]');
  const customCodeDropdownArrow = frame.locator('#comboBoxEnvironmentalCode_Arrow');
  await expect(customCodeDropdownArrow).toBeVisible({ timeout: 10000 });
  await customCodeDropdownArrow.click();

  // Select the second option from the dropdown list
  const dropdownList = frame.locator('#comboBoxEnvironmentalCode_DropDown ul.rcbList > li.rcbItem');
  await expect(dropdownList.nth(1)).toBeVisible({ timeout: 10000 });
  await dropdownList.nth(1).click();

  // Click the Save button in the iframe
  const saveButton = frame.locator('#button_Save_input');
  await expect(saveButton).toBeVisible({ timeout: 10000 });
  await saveButton.click();

  await page.waitForLoadState('networkidle');

  // Close the job
  await closeClaimPage.closeJob();

  // Validate the job is closed
  await closeClaimPage.validateJobClosed();
});
