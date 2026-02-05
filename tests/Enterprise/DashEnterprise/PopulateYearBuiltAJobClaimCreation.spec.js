import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateClaimPage } from '../../../pageObjects/enterprise/quickNotes/ClaimPage.po.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import claimData from '../../../testData/enterprise/quickNotes/createClaim/providerClaimData.json' with { type: 'json' };

test('Populate Year Built gender Neutral title other mobile number at Claim Creation', async ({
  authenticatedPage,
}) => {
  const createClaimPage = new CreateClaimPage(authenticatedPage);

  // Extract claim data from claimData.json
  const { claimDetails } = claimData;
  const { customer } = claimDetails;

  await createClaimPage.openCreateClaim();
  await createClaimPage.selectReportedBy(claimDetails.reportedBy);
  await createClaimPage.selectProvider(claimDetails.office);
  await createClaimPage.selectClient();
  await createClaimPage.selectCustomer(customer);

  await createClaimPage.checkSameAsIndividualAddress();
  await createClaimPage.selectEstimator(claimDetails.estimator);
  await createClaimPage.selectCoordinator(claimDetails.coordinator);
  await createClaimPage.selectAccounting(claimDetails.accounting);
  await createClaimPage.fillOtherPhoneNumber(claimDetails.otherMobileNumber);
  await createClaimPage.setDateOfLoss(claimDetails.dateOfLoss);
  await createClaimPage.selectLossCategory(claimDetails.lossCategory);
  await createClaimPage.selectYearBuilt(claimDetails.yearBuilt);
  await createClaimPage.selectWaterMitigation();
  await createClaimPage.enterLossDescription(claimDetails.lossDescription);
  await createClaimPage.saveClaim();
  await createClaimPage.selectProgram();
  await createClaimPage.createClaim();
  await authenticatedPage.waitForLoadState('networkidle');
  await expect(authenticatedPage).toHaveURL(/.*Job.*/, { timeout: 5000 });

  // Assert that the Year Built is present and equals the supplied data
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  const displayedYearBuilt = await jobSlideboardPage.getYearBuiltValue();
  expect(displayedYearBuilt.trim()).toBe(claimDetails.yearBuilt);
});
