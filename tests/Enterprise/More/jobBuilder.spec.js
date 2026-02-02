import { test } from '../../../fixtures/enterpriseFixtures.js';
import { JobBuilderPage } from '../../../pageObjects/enterprise/moreFg/jobBuilder.po.js';

test('Job Builder in More', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const jobBuilderPage = new JobBuilderPage(page);

  // Navigate to Job Builder
  await jobBuilderPage.navigateToJobBuilder();

  // Validate Heading
  await jobBuilderPage.validateHeading();

  // Define grid headers
  const gridHeaders = ['File Name', 'Added By', 'Added Date', 'Updated By'];

  // Validate Grid Headers
  await jobBuilderPage.validateGridHeaders(gridHeaders);

  // Validate Add New Job Template Button
  await jobBuilderPage.validateAddNewJobTemplateButton();

  // Validate Save and Reset Buttons
  await jobBuilderPage.validateSaveAndResetButtons();

  // Validate Preview Button
  await jobBuilderPage.validatePreviewButton();

  // Validate Rename File Button
  await jobBuilderPage.validateRenameFileButton();

  // Validate Delete File Button
  await jobBuilderPage.validateDeleteFileButton();

  // Validate Clear Section Button
  await jobBuilderPage.validateClearSectionButton();

  // Validate Add New Email Template Button
  await jobBuilderPage.validateAddNewEmailTemplateButton();

  // Validate Upload to Franchisees Button
  await jobBuilderPage.validateUploadToFranchiseesButton();

  // Validate Export to PDF Button
  await jobBuilderPage.validateExportToPDFButton();

  // Define template builder table options
  const jobTemplateBuilderTableOptions = [
    'Optional Customer Initial No.1',
    'Area Rugs',
    'Accounting Person',
    'Broker Company',
    'Actual Cost',
    'Area Rugs Completed Date',
    'Referred By Address',
    'Company Display Name',
    'Customer Address',
    'Current Date',
  ];

  // Validate Template Builder Table Options
  await jobBuilderPage.validateTemplateBuilderTableOptions(jobTemplateBuilderTableOptions);
});
