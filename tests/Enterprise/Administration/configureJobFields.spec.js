import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import ConfigureJobFieldsPage from '../../../pageObjects/enterprise/administrationFG/configureJobFields.po.js';

test('Configure Job Fields Page validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const configureJobFieldsPage = new ConfigureJobFieldsPage(page);

  // Navigate to Configure Job Fields page via menu
  await configureJobFieldsPage.navigateToConfigureJobFields();

  // Assert main heading is visible and correct
  await expect(await configureJobFieldsPage.verifyHeadingVisible()).toBeVisible();
  await expect(await configureJobFieldsPage.verifyHeadingVisible()).toHaveText(
    'Configure Job Fields',
  );

  // Assert "Custom Participants" section heading is visible and correct
  await expect(await configureJobFieldsPage.verifyCustomParticipantsHeadingVisible()).toBeVisible();
  await expect(await configureJobFieldsPage.verifyCustomParticipantsHeadingVisible()).toHaveText(
    'Custom Participants',
  );

  // Assert "Custom Participants" sub-heading is visible and correct
  await expect(
    await configureJobFieldsPage.verifyCustomParticipantsSubHeadingVisible(),
  ).toBeVisible();
  await expect(await configureJobFieldsPage.verifyCustomParticipantsSubHeadingVisible()).toHaveText(
    'Custom Participants',
  );

  // Assert "Custom Dates" sub-heading is visible and correct
  await expect(await configureJobFieldsPage.verifyCustomDatesSubHeadingVisible()).toBeVisible();
  await expect(await configureJobFieldsPage.verifyCustomDatesSubHeadingVisible()).toHaveText(
    'Custom Dates',
  );

  // Assert "Add Custom Participant Field" button and text are visible and correct
  await expect(
    await configureJobFieldsPage.verifyAddCustomParticipantButtonVisible(),
  ).toBeVisible();
  await expect(await configureJobFieldsPage.verifyAddCustomParticipantTextVisible()).toBeVisible();
  await expect(await configureJobFieldsPage.verifyAddCustomParticipantTextVisible()).toHaveText(
    'Add Custom Participant Field',
  );

  // Assert "Inactive" tab header is visible and correct
  await expect(await configureJobFieldsPage.verifyInactiveHeaderVisible()).toBeVisible();
  await expect(await configureJobFieldsPage.verifyInactiveHeaderVisible()).toHaveText('Inactive');

  // Assert "Active" tab header is visible, correct, and click to activate
  await expect(await configureJobFieldsPage.verifyActiveHeaderVisibleAndClick()).toBeVisible();
  await expect(await configureJobFieldsPage.verifyActiveHeaderVisibleAndClick()).toHaveText(
    'Active',
  );

  // Assert all grid headers are visible and correct
  const gridHeaders = [
    'Display Name',
    'Participant Type',
    'Company/Contact Type',
    'Mapped Company Type',
  ];
  await configureJobFieldsPage.verifyGridHeadersVisible(gridHeaders);

  // Fill Display Name input with 'External' and apply filter
  await expect(await configureJobFieldsPage.fillDisplayNameInput('External')).toBeVisible();
  await expect(await configureJobFieldsPage.clickDisplayNameFilterButton()).toBeVisible();

  // Select "Contains" from filter dropdown
  await expect(await configureJobFieldsPage.selectContainsFromFilterDropdown()).toBeVisible();

  // Assert at least one row exists in the grid data
  const cellCount = await configureJobFieldsPage.assertGridHasRows();
  expect(cellCount).toBeGreaterThan(0);
});
