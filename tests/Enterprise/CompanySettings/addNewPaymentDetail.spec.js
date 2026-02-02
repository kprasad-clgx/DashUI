import { test } from '../../../fixtures/enterpriseFixtures.js';
import EnterpriseAddPaymentPage from '../../../pageObjects/enterprise/companySetting/enterpriseAddPayment.po.js';
import addNewPaymentData from '../../../testData/enterprise/enterpriseCompanySettings/AddNewPaymentData.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Add New Payment Details', async ({ authenticatedPage }) => {
  //------------Code Starts Here------------

  const page = authenticatedPage;
  const addPaymentPage = new EnterpriseAddPaymentPage(page);

  // Search for job by number
  await searchJobNumber(page, addNewPaymentData.jobNumber);

  // Wait for Acct. Details image to be visible and click it
  await addPaymentPage.waitAndClickAcctDetailsImg();

  // Verify job number is displayed correctly
  await addPaymentPage.assertJobNumberContains(addNewPaymentData.jobNumber);

  // Click Payments button
  await addPaymentPage.clickPaymentsButton();

  // Get initial payment rows count
  const totalRows = await addPaymentPage.getPaymentRowsCount();

  // Click Add New Payment button
  await addPaymentPage.clickAddNewPaymentButton();

  // Verify Payment Mode label is visible
  await addPaymentPage.assertPaymentModeLabelVisible();

  // Fill payment mode
  await addPaymentPage.fillPaymentMode(addNewPaymentData.paymentMode);

  // Verify Memo label is visible
  await addPaymentPage.assertMemoLabelVisible();

  // Fill memo
  await addPaymentPage.fillMemo(addNewPaymentData.memo);

  // Verify Invoice Number label is visible
  await addPaymentPage.assertInvoiceNumberLabelVisible();

  // Select today's date
  await addPaymentPage.selectTodayDateForPayment();

  // Verify Reference Number label is visible
  await addPaymentPage.assertReferenceNumberLabelVisible();

  // Fill reference number
  await addPaymentPage.fillReferenceNumber(addNewPaymentData.referenceNumber);

  // Verify Payment Amount label is visible
  await addPaymentPage.assertPaymentAmountLabelVisible();

  // Fill payment amount
  await addPaymentPage.fillPaymentAmount(addNewPaymentData.paymentAmount);

  // Verify Discount Amount label is visible
  await addPaymentPage.assertDiscountAmountLabelVisible();

  // Fill discount amount
  await addPaymentPage.fillDiscountAmount(addNewPaymentData.discountAmount);

  // Click Save button
  await addPaymentPage.clickSavePaymentButton();

  // Wait for payment rows to increase
  const newTotalRows = await addPaymentPage.waitForPaymentRowsIncrease(totalRows);

  // Verify payment row increased
  await addPaymentPage.assertPaymentRowsIncreased(newTotalRows, totalRows);
});
