import { test } from '../../../fixtures/adminFixtures.js';
import RequiredFieldForClosingPage from '../../../pageObjects/admin/dashAdmin/requiredFieldForClosing.po.js';

test('Required Field For Closing Page Validation', async ({
  authenticatedPage,
}) => {
  const page = authenticatedPage;
  const requiredFieldForClosingPage = new RequiredFieldForClosingPage(page);

  // Navigate to Required Fields For Closing page
  await requiredFieldForClosingPage.navigateToRequiredFieldsForClosing();

  // Assert the heading is visible
  await requiredFieldForClosingPage.assertRequiredFieldsForClosingHeading();

  // Assert the buttons are visible
  await requiredFieldForClosingPage.assertAddNewRequiredFieldButton();
  await requiredFieldForClosingPage.assertDeleteSelectedButton();

  // Click Add New Required Field button and assert modal header
  await requiredFieldForClosingPage.clickAddNewRequiredFieldButton();
  await requiredFieldForClosingPage.assertAddNewRequiredFieldModalHeader();

  // Assert the Required Field label is present in the modal
  await requiredFieldForClosingPage.assertRequiredFieldLabel();

  // Click the modal close button
  await requiredFieldForClosingPage.clickModalCloseButton();
});