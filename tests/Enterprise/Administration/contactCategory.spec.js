import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import ContactCategoryPage from '../../../pageObjects/enterprise/administrationFG/contactCategory.po.js';

test('Contact Category Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const contactCategoryPage = new ContactCategoryPage(page);

  // Navigate to Contact Category page from Administration menu
  await contactCategoryPage.navigateToContactCategory();

  // Verify Contact Categories header is visible and has correct text
  await expect(await contactCategoryPage.verifyContactCategoryHeader()).toBeVisible();
  await expect(await contactCategoryPage.verifyContactCategoryHeader()).toHaveText(
    'Contact Categories',
  );

  // Verify Grid Refresh Button is visible
  await expect(await contactCategoryPage.verifyGridRefreshButton()).toBeVisible();

  // Verify Add New Record Button is visible
  await expect(await contactCategoryPage.verifyAddNewRecordButton()).toBeVisible();

  // Click on Add New Record Button
  await contactCategoryPage.clickAddNewRecordButton();

  // Verify Description Input is visible and has correct type attribute
  await expect(await contactCategoryPage.verifyDescriptionInput()).toBeVisible();
  await expect(await contactCategoryPage.verifyDescriptionInput()).toHaveAttribute('type', 'text');

  // Verify Save Button is visible and enabled
  await expect(await contactCategoryPage.verifySaveButton()).toBeVisible();
  await expect(await contactCategoryPage.verifySaveButton()).toBeEnabled();

  // Verify Cancel Button is visible and enabled
  await expect(await contactCategoryPage.verifyCancelButton()).toBeVisible();
  await expect(await contactCategoryPage.verifyCancelButton()).toBeEnabled();
});
