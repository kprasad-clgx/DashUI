import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobCloseJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobCloseJob.po.js';
import CreateNewJobPage from '../../../pageObjects/enterprise/dashEnterprise/createNewJob.po.js';
import createJobData from '../../../testData/enterprise/enterpriseJobData.json' with { type: 'json' };
const { newJobData } = createJobData;

test('Create Job', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const createJobPage = new CreateJobCloseJobPage(page);
  const createNewJobPage = new CreateNewJobPage(page);

  // Navigate to Create Job
  await createJobPage.clickCreateJobButton();

  // Fill Job Form
  await createJobPage.selectRandomLossCategoryExceptFirst();
  await createJobPage.selectCustomer(
    newJobData.customerName,
    newJobData.customerFirstName,
    newJobData.customerLastName,
  );
  await createJobPage.checkSameAsCustomerAddress(
    newJobData.customerFirstName,
    newJobData.customerLastName,
  );
  await createJobPage.checkWaterMitigation();
  await createJobPage.fillPolicyInformation();
  await createJobPage.fillLossDescription(newJobData.lossDescription);

  // Click on Save and Go to Job Slideboard
  await createJobPage.clickSaveBtnAndGoToSlideBoard();

  // Extract the JobNumber from the URL
  const jobNumber = createNewJobPage.extractJobNumberFromURL();

  // Verify URL contains job identifier
  await createNewJobPage.verifyJobURL();

  await page.waitForLoadState('networkidle');

  // Customer Information Edit button
  const customerInformationEditButton = page.locator('#img_CustomerEdit');
  await customerInformationEditButton.waitFor({ state: 'visible', timeout: 30000 });
  customerInformationEditButton.click();

  await page.waitForLoadState('networkidle');

    // Assert the modal is visible
  const radWindow = page.locator('#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common');
  await expect(radWindow).toBeVisible({ timeout: 30000 });

  // Assert Edit Customer Information header is visible
  await expect(page.locator('em', { hasText: 'Edit Customer Information' })).toBeVisible();

  // Wait for iframe to load and be visible
  const iframeLocator = page.frameLocator('iframe[name="RadWindow_Common"]');
  await page.waitForLoadState('networkidle', { timeout: 90000 });
  
  // Assert Switch to Company button is visible inside the iframe with extended timeout
  const switchCompanyButton = iframeLocator.locator('#buttonSwitchToCompany');
  await switchCompanyButton.waitFor({ state: 'visible', timeout: 30000 });

  // Use scrollIntoViewIfNeeded to bring button into viewport
  await switchCompanyButton.scrollIntoViewIfNeeded();

  // Click Switch to Company button and accept confirmation alert
  await Promise.all([
    page.waitForEvent('dialog').then(dialog => dialog.accept()),
    switchCompanyButton.click({ force: true })
  ]);

  await page.waitForLoadState('networkidle', { timeout: 90000 });

  // Assert Customer As Company Information label is shown inside the new iframe
  const newIframeLocator = page.frameLocator('iframe[name="RadWindow_Common"]');
  await expect(newIframeLocator.getByText(/Customer As Company Information/i)).toBeVisible({ timeout: 30000 });

  // Click on Close button to close the RadWindow
  const closeButton = page.locator('a.rwCloseButton');
  await closeButton.click({ force: true });

  // Assert Customer Information modal is closed
  await expect(radWindow).toBeHidden();

});
