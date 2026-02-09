import { test } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobCloseJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobCloseJob.po.js';
import createJobData from '../../../testData/enterprise/enterpriseJobData.json' with { type: 'json' };
import { saveJobNumber } from '../../../utils/enterpriseJobGenerator.js';
import { saveJobNumberForCompanySettings } from '../../../utils/enterpriseJobGenerator.js';

const { newJobData } = createJobData;

test('Setup - Create Job for Enterprise', async ({ authenticatedPage }) => {
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

  // Generate a unique job name
  const uniqueJobName = `${newJobData.jobName}${Math.floor(Math.random() * 100000)}`;

  await createJobPage.createUniqueJobName(uniqueJobName);
  await createJobPage.checkSameAsCustomerAddress(
    newJobData.customerFirstName,
    newJobData.customerLastName,
  );
  await createJobPage.checkWaterMitigation();
  await createJobPage.fillLossDescription(newJobData.lossDescription);

  // Save and get job number
  const jobNumber = await createJobPage.saveJobAndGetJobNumber();

  // Get customer full name for jobNumberWithName
  const customerFullName = `${newJobData.customerLastName.toUpperCase()}, ${newJobData.customerFirstName.toUpperCase()}`;
  const jobNumberWithName = `${jobNumber}; ${customerFullName}`;

  // Save job number and customer name to JSON files for other tests to use
  saveJobNumber(
    jobNumber,
    jobNumberWithName,
    'testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json',
    uniqueJobName,
  );

  // Save job number to all Company Settings JSON files
    saveJobNumberForCompanySettings(jobNumber, jobNumberWithName);
});
