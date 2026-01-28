import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ManageAssignmentsPage } from '../../../pageObjects/enterprise/administrationFG/manageAssignments.po.js';

test('Manage Assignments Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const manageAssignmentsPage = new ManageAssignmentsPage(page);

  // Navigate to Manage Assignments page
  await manageAssignmentsPage.navigateToManageAssignments();

  // Verify Manage Assignments header is visible
  const manageAssignmentsHeader = await manageAssignmentsPage.verifyManageAssignmentsHeader();
  await expect(manageAssignmentsHeader).toHaveText(/^\s*Manage Assignments\s*$/);

  // Verify Refresh button is visible
  const refreshButton = await manageAssignmentsPage.verifyRefreshButton();
  await expect(refreshButton).toBeVisible();

  // Verify Linked Job grid header is visible
  const linkedJobGridHeader = await manageAssignmentsPage.verifyLinkedJobGridHeader();
  await expect(linkedJobGridHeader).toBeVisible();

  // Verify Transaction ID grid header is visible
  const transactionIDGridHeader = await manageAssignmentsPage.verifyTransactionIDGridHeader();
  await expect(transactionIDGridHeader).toBeVisible();

  // Verify Job Number grid header is visible
  const jobNumberGridHeader = await manageAssignmentsPage.verifyJobNumberGridHeader();
  await expect(jobNumberGridHeader).toBeVisible();

  // Verify Assignment Origin grid header is visible
  const assignmentOriginGridHeader = await manageAssignmentsPage.verifyAssignmentOriginGridHeader();
  await expect(assignmentOriginGridHeader).toBeVisible();

  // Verify System Received grid header is visible
  const systemReceivedGridHeader = await manageAssignmentsPage.verifySystemReceivedGridHeader();
  await expect(systemReceivedGridHeader).toBeVisible();

  // Verify Job Date Received grid header is visible
  const jobDateGridHeader = await manageAssignmentsPage.verifyJobDateGridHeader();
  await expect(jobDateGridHeader).toBeVisible();

  // Verify Client grid header is visible
  const clientGridHeader = await manageAssignmentsPage.verifyClientGridHeader();
  await expect(clientGridHeader).toBeVisible();

  // Verify Customer Name grid header is visible
  const customerNameGridHeader = await manageAssignmentsPage.verifyCustomerNameGridHeader();
  await expect(customerNameGridHeader).toBeVisible();

  // Verify Loss Address grid header is visible
  const lossAddressGridHeader = await manageAssignmentsPage.verifyLossAddressGridHeader();
  await expect(lossAddressGridHeader).toBeVisible();
});
