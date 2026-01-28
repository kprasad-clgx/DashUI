import { test } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobCloseJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobCloseJob.po.js';
import createJobData from '../../../testData/enterprise/enterpriseJobData.json' with { type: 'json' };
const { newJobData } = createJobData;

test('Create Job Enterprise and Close it', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const createJobPage = new CreateJobCloseJobPage(page);

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

  // Reject all compliance tasks
  await createJobPage.rejectAllComplianceTasks();

  // Close the job
  await createJobPage.closeJob();

  // Verify job is closed
  await createJobPage.verifyJobIsClosed();
});
