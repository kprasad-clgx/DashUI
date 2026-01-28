import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { MassAssignmentsForJobPage } from '../../../pageObjects/enterprise/administrationFG/massAssignmentsForJob.po.js';

test('Manage Assignments For Job Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const massAssignmentsPage = new MassAssignmentsForJobPage(page);

  // Navigate to Mass Assignment for Jobs page
  await massAssignmentsPage.navigateToMassAssignmentForJobs();

  // Verify Mass Assignment for Jobs header is visible
  const massAssignmentHeader = await massAssignmentsPage.verifyMassAssignmentHeader();
  await expect(massAssignmentHeader).toBeVisible();
  await expect(massAssignmentHeader).toHaveText(/^\s*Mass Assignment for Jobs\s*$/);

  // Verify Assign Participants button is visible and is submit type
  const assignParticipantsButton = await massAssignmentsPage.verifyAssignParticipantsButton();
  await expect(assignParticipantsButton).toBeVisible();
  await expect(assignParticipantsButton).toHaveAttribute('type', 'submit');

  // Verify Close Selected Job button is visible and is submit type
  const closeSelectedJobButton = await massAssignmentsPage.verifyCloseSelectedJobButton();
  await expect(closeSelectedJobButton).toBeVisible();
  await expect(closeSelectedJobButton).toHaveAttribute('type', 'submit');

  // Verify Job List Grid text is visible
  const jobListGridText = await massAssignmentsPage.verifyJobListGridText();
  await expect(jobListGridText).toBeVisible();
  await expect(jobListGridText).toHaveText(/^\s*Job List\s*$/);

  // Verify Show Admin Jobs Grid text is visible
  const showAdminJobsGridText = await massAssignmentsPage.verifyShowAdminJobsGridText();
  await expect(showAdminJobsGridText).toBeVisible();
  await expect(showAdminJobsGridText).toHaveText(/^\s*Show Admin Jobs\s*$/);

  // Verify Job Number grid column is visible
  const jobNumberGridColumn = await massAssignmentsPage.verifyJobNumberGridColumn();
  await expect(jobNumberGridColumn).toBeVisible();

  // Verify Customer grid column is visible
  const customerGridColumn = await massAssignmentsPage.verifyCustomerGridColumn();
  await expect(customerGridColumn).toBeVisible();

  // Verify Estimator grid column is visible
  const estimatorGridColumn = await massAssignmentsPage.verifyEstimatorGridColumn();
  await expect(estimatorGridColumn).toBeVisible();

  // Verify Coordinator grid column is visible
  const coordinatorGridColumn = await massAssignmentsPage.verifyCoordinatorGridColumn();
  await expect(coordinatorGridColumn).toBeVisible();

  // Verify Supervisor grid column is visible
  const supervisorGridColumn = await massAssignmentsPage.verifySupervisorGridColumn();
  await expect(supervisorGridColumn).toBeVisible();

  // Verify Foreperson grid column is visible
  const forepersonGridColumn = await massAssignmentsPage.verifyForepersonGridColumn();
  await expect(forepersonGridColumn).toBeVisible();

  // Verify Accounting grid column is visible
  const accountingGridColumn = await massAssignmentsPage.verifyAccountingGridColumn();
  await expect(accountingGridColumn).toBeVisible();

  // Verify Claim Number grid column is visible
  const claimNumberGridColumn = await massAssignmentsPage.verifyClaimNumberGridColumn();
  await expect(claimNumberGridColumn).toBeVisible();

  // Verify Export to PDF button is visible and is button type
  const exportToPDFButton = await massAssignmentsPage.verifyExportToPDFButton();
  await expect(exportToPDFButton).toBeVisible();
  await expect(exportToPDFButton).toHaveAttribute('type', 'button');

  // Verify Export to Excel button is visible and is button type
  const exportToExcelButton = await massAssignmentsPage.verifyExportToExcelButton();
  await expect(exportToExcelButton).toBeVisible();
  await expect(exportToExcelButton).toHaveAttribute('type', 'button');

  // Click on Export to PDF button and assert the downloaded file name
  const pdfFilename = await massAssignmentsPage.downloadAndAssertPDF();
  expect(pdfFilename).toMatch(/^MassAssignmentForJob(\s\(\d+\))?\.pdf$/);

  // Click on Export to Excel button and assert the downloaded file name
  const excelFilename = await massAssignmentsPage.downloadAndAssertExcel();
  expect(excelFilename).toMatch(/^MassAssignmentForJob(\s\(\d+\))?\.xlsx?$/);
});
