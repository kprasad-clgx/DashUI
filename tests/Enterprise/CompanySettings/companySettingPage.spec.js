import { test } from '../../../fixtures/enterpriseFixtures.js';
import EnterpriseCompanySettingPage, {
  EnterpriseCompanySettingLocators,
} from '../../../pageObjects/enterprise/companySetting/enterpriseCompanySetting.po.js';

test('Verify Company Setting Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const companySettingPage = new EnterpriseCompanySettingPage(page);

  // Step 1: Navigate to Company Settings page
  await companySettingPage.navigateToCompanySettings();

  // Step 2: Assert Accounting Logo card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.accountingLogoCard,
    EnterpriseCompanySettingLocators.accountingLogoHeader,
    'Accounting',
  );

  // Step 3: Assert Change Logo card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.changeLogoCard,
    EnterpriseCompanySettingLocators.changeLogoHeader,
    'Change Logo',
  );

  // Step 4: Assert Company Display Name card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.companyDisplayNameCard,
    EnterpriseCompanySettingLocators.companyDisplayNameHeader,
    'Company Display Name',
  );

  // Step 5: Assert Compensation Plans card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.compensationPlansCard,
    EnterpriseCompanySettingLocators.compensationPlansHeader,
    'Compensation Plans',
  );

  // Step 6: Assert Create Survey card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.createSurveyCard,
    EnterpriseCompanySettingLocators.createSurveyHeader,
    'Create Survey',
  );

  // Step 7: Assert Data Import Tool card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.dataImportToolCard,
    EnterpriseCompanySettingLocators.dataImportToolHeader,
    'Data Import Tool',
  );

  // Step 8: Assert Email Distribution card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.emailDistributionCard,
    EnterpriseCompanySettingLocators.emailDistributionHeader,
    'E-mail Distribution List',
  );

  // Step 9: Assert Equipment Type card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.equipmentTypeCard,
    EnterpriseCompanySettingLocators.equipmentTypeHeader,
    'Equipment Type',
  );

  // Step 10: Assert Job Title card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.jobTitleCard,
    EnterpriseCompanySettingLocators.jobTitleHeader,
    'Job Title',
  );

  // Step 11: Assert Location and Truck card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.locationAndTruckCard,
    EnterpriseCompanySettingLocators.locationAndTruckHeader,
    'Location and Truck',
  );

  // Step 12: Assert Note Visibility Configuration card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.newVisibilityConfigurationCard,
    EnterpriseCompanySettingLocators.newVisibilityConfigurationHeader,
    'Note Visibility Configuration',
  );

  // Step 13: Assert Notifications card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.notificationsCard,
    EnterpriseCompanySettingLocators.notificationsHeader,
    'Notifications',
  );

  // Step 14: Assert Office card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.officeCard,
    EnterpriseCompanySettingLocators.officeHeader,
    'Office',
  );

  // Step 15: Assert Preset Progress Notification card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.presetProgressNotificationCard,
    EnterpriseCompanySettingLocators.presetProgressNotificationHeader,
    'Preset Progress Notification',
  );

  // Step 16: Assert Standard Note card is visible with correct header
  await companySettingPage.assertCardVisibleAndHeaderText(
    EnterpriseCompanySettingLocators.standardNoteCard,
    EnterpriseCompanySettingLocators.standardNoteHeader,
    'Standard Note',
  );
});
