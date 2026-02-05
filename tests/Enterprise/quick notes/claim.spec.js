import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateClaimPage } from '../../../pageObjects/enterprise/quickNotes/ClaimPage.po.js';
import claimData from '../../../testData/enterprise/quickNotes/createClaim/providerClaimData.json' with { type: 'json' };

test('Create Claim from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const createClaimPage = new CreateClaimPage(authenticatedPage);

  // Extract claim data from claimData.json
  const { claimDetails } = claimData;
  const { customer } = claimDetails;

  // Open Quick Notes menu and navigate to Create Claim
  await createClaimPage.openQuickNotesCreateClaim();

  // Create new claim using the page object method
  const jobNumber = await createClaimPage.createNewClaim(claimDetails, customer);

  // Verify job number was created
  expect(jobNumber).toBeTruthy();
});
