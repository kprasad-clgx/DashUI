import { test } from '../../../fixtures/enterpriseFixtures.js';
import { CreateClaimPage } from '../../../pageObjects/enterprise/dashEnterprise/createNewClaim.po.js';
import { CreateClaimCloseClaimPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createClaimCloseClaim.po.js';
import claimDetails from '../../../testData/enterprise/enterpriseClaimData.json' with { type: 'json' };

// Test data for creating a new claim
const { claimDetails: createNewClaimDetails } = claimDetails;

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

  // Close the job
  await closeClaimPage.closeJob();

  // Validate the job is closed
  await closeClaimPage.validateJobClosed();
});
