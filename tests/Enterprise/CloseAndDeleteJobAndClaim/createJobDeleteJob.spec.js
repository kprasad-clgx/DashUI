import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobCloseJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobCloseJob.po.js';
import { CreateJobDeleteJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobDeleteJob.po.js';
import createJobData from '../../../testData/enterprise/enterpriseJobData.json' with { type: 'json' };
const { newJobData } = createJobData;

test('Create Job Enterprise and Delete it', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const createJobPage = new CreateJobCloseJobPage(page);
  const deleteJobPage = new CreateJobDeleteJobPage(page);

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
  await createJobPage.fillLossDescription(newJobData.lossDescription);

  // Click on Save and Go to Job Slideboard
  await createJobPage.clickSaveBtnAndGoToSlideBoard();

  // Now reject all compliance tasks
  await createJobPage.rejectAllComplianceTasks();

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

  // Delete the job
  await deleteJobPage.deleteJob();

  // Validate job deletion
  await deleteJobPage.validateJobDeleted();
});
