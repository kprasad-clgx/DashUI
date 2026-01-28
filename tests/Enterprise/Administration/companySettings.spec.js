import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import {
  CompanySettingsPage,
  companySettingsExpectedValues,
} from '../../../pageObjects/enterprise/administrationFG/companySettings.po.js';

test('Company Settings Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const companySettingsPage = new CompanySettingsPage(page);

  // Navigate to Company Settings page
  await companySettingsPage.navigateToCompanySettings();

  // Verify Company Display Name section label is visible
  const companyDisplayNameLabel = await companySettingsPage.verifyCompanyDisplayNameLabel();
  await expect(companyDisplayNameLabel).toBeVisible();
  await expect(companyDisplayNameLabel).toHaveText(
    companySettingsExpectedValues.expectedLabels.companyDisplayName,
  );

  // Note Visibility Configuration Name text locator
  const noteVisibilityConfigurationLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*Note Visibility Configuration$/,
    },
  );

  // Assert that the locator is visible
  await expect(noteVisibilityConfigurationLocator).toBeVisible();

  // Notifications Name text locator
  const notificationsCardLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*Notifications$/,
    },
  );

  // Assert that the locator is visible
  await expect(notificationsCardLocator).toBeVisible();

  // Office Name text locator
  const OfficeCardLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*Office$/,
    },
  );

  // Assert that the locator is visible
  await expect(OfficeCardLocator).toBeVisible();

  // Standard Note Cart text locator
  const standardNoteCard = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*Standard Note$/,
    },
  );

  // Assert that the locator is visible
  await expect(standardNoteCard).toBeVisible();

  // Click on Company Display Name section
  await companySettingsPage.clickCompanyDisplayNameSection();

  // Verify Company Display Name text on expanded section
  const companyDisplayNameText = await companySettingsPage.verifyCompanyDisplayNameText();
  await expect(companyDisplayNameText).toBeVisible();
  await expect(companyDisplayNameText).toHaveText(/^Company Display Name$/);

  // Verify Company Display Name input field is visible
  const companyDisplayNameInput = await companySettingsPage.verifyCompanyDisplayNameInput();
  await expect(companyDisplayNameInput).toBeVisible();
  await expect(companyDisplayNameInput).toHaveAttribute('type', 'text');

  // Verify Company Display Name Save button is visible
  const companyDisplayNameSaveBtn = await companySettingsPage.verifyCompanyDisplayNameSaveBtn();
  await expect(companyDisplayNameSaveBtn).toBeVisible();
  await expect(companyDisplayNameSaveBtn).toHaveAttribute('type', 'submit');

  // Verify Company Display Name Cancel button is visible
  const companyDisplayNameCancelBtn = await companySettingsPage.verifyCompanyDisplayNameCancelBtn();
  await expect(companyDisplayNameCancelBtn).toBeVisible();
  await expect(companyDisplayNameCancelBtn).toHaveAttribute('type', 'submit');

  // Navigate to Company Settings page again
  await companySettingsPage.navigateToCompanySettings();

  // Verify Compensation Plans section label is visible
  const compensationPlansLabel = await companySettingsPage.verifyCompensationPlansLabel();
  await expect(compensationPlansLabel).toBeVisible();
  await expect(compensationPlansLabel).toHaveText(/^Compensation Plans$/);

  // Click on Compensation Plans section
  await companySettingsPage.clickCompensationPlansSection();

  // Verify Compensation Plans text on expanded page
  const compensationPlansText = await companySettingsPage.verifyCompensationPlansText();
  await expect(compensationPlansText).toBeVisible();
  await expect(compensationPlansText).toHaveText(
    companySettingsExpectedValues.expectedLabels.compensationPlans,
  );

  // Verify Compensation Plans Delete button is visible
  const compensationPlansDeleteBtn = await companySettingsPage.verifyCompensationPlansDeleteBtn();
  await expect(compensationPlansDeleteBtn).toBeVisible();
  await expect(compensationPlansDeleteBtn).toHaveAttribute('type', 'submit');

  // Verify Compensation Plans Change Status button is visible
  const compensationPlansChangeStatusBtn =
    await companySettingsPage.verifyCompensationPlansChangeStatusBtn();
  await expect(compensationPlansChangeStatusBtn).toBeVisible();
  await expect(compensationPlansChangeStatusBtn).toHaveAttribute('type', 'submit');

  // Verify Add New Compensation Plan button is visible
  const addNewCompensationPlanBtn = await companySettingsPage.verifyAddNewCompensationPlanBtn();
  await expect(addNewCompensationPlanBtn).toBeVisible();

  // Verify Plan Name grid header is visible
  const planNameGridHeader = await companySettingsPage.verifyPlanNameGridHeader();
  await expect(planNameGridHeader).toBeVisible();

  // Verify Min. Company Gross Margin % grid header is visible
  const minCompanyGrossMarginGridHeader =
    await companySettingsPage.verifyMinCompanyGrossMarginGridHeader();
  await expect(minCompanyGrossMarginGridHeader).toBeVisible();

  // Verify Sale Commission % grid header is visible
  const saleCommissionGridHeader = await companySettingsPage.verifySaleCommissionGridHeader();
  await expect(saleCommissionGridHeader).toBeVisible();

  // Verify % Share of Profit Above Min. Margin (incentive) grid header is visible
  const shareOfProfitGridHeader = await companySettingsPage.verifyShareOfProfitGridHeader();
  await expect(shareOfProfitGridHeader).toBeVisible();

  // Verify % Share of Profit Below Min. Margin (deduction) grid header is visible
  const profitBelowMinMarginGridHeader =
    await companySettingsPage.verifyProfitBelowMinMarginGridHeader();
  await expect(profitBelowMinMarginGridHeader).toBeVisible();

  // Verify Max Sale % Commissioned grid header is visible
  const maxSaleCommissionedGridHeader =
    await companySettingsPage.verifyMaxSaleCommissionedGridHeader();
  await expect(maxSaleCommissionedGridHeader).toBeVisible();

  // Navigate to Company Settings page again
  await companySettingsPage.navigateToCompanySettings();

  // Create Survey text locator
  const createSurveyLabel = page.locator('.sectionHeaderText', {
    hasText: /^Create Survey$/,
  });

  // Assert that the locator is visible
  await expect(createSurveyLabel).toBeVisible();

  // Click on Create Survey section
  await createSurveyLabel.click();
  await page.waitForLoadState('networkidle');

  // Quality Questionnaire text locator
  const qualityQuestionnaireTextLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_lbQualityQuestionaireHead',
  );

  // Assert that the locator is visible
  await expect(qualityQuestionnaireTextLocator).toBeVisible();

  // Assert that the locator has correct text
  await expect(qualityQuestionnaireTextLocator).toHaveText('Quality Questionnaire');

  await page.goBack({ waitUntil: 'networkidle' });

  // Data Import Tool text locator
  const dataImportToolLabel = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^Data Import Tool$/,
    },
  );

  // Assert that the locator is visible
  await expect(dataImportToolLabel).toBeVisible();

  // Click on Data Import Tool section
  await dataImportToolLabel.click();
  await page.waitForLoadState('networkidle');

  // Data Import Tool text locator
  const dataImportToolTextLocator = page.locator('#ctl00_ContentPlaceHolder1_lbDefault');

  // Assert that the locator is visible
  await expect(dataImportToolTextLocator).toBeVisible();

  // Assert that the locator has correct text
  await expect(dataImportToolTextLocator).toHaveText(
    companySettingsExpectedValues.expectedLabels.dataImport,
  );

  // CompanyContacts Donwload Template button locator
  const companyContactsDownloadTemplateBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_RadGridDataImport_ctl00_ctl04_DownloadTemplateButton',
  );

  // Assert that the locator is visible
  await expect(companyContactsDownloadTemplateBtn).toBeVisible();

  // Assert that the locator is a button element
  await expect(companyContactsDownloadTemplateBtn).toHaveAttribute('type', 'button');

  // CompanyContacts View History button locator
  const companyContactsViewHistoryBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_RadGridDataImport_ctl00_ctl04_ViewHistoryButton',
  );

  // Assert that the locator is visible
  await expect(companyContactsViewHistoryBtn).toBeVisible();

  // Assert that the locator is a button element
  await expect(companyContactsViewHistoryBtn).toHaveAttribute('type', 'button');

  // CompanyContacts Start Import button locator
  const companyContactsStartImportBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_RadGridDataImport_ctl00_ctl04_StartImportButton',
  );

  // Assert that the locator is visible
  await expect(companyContactsStartImportBtn).toBeVisible();

  // Assert that the locator is a button element
  await expect(companyContactsStartImportBtn).toHaveAttribute('type', 'button');

  // Back to Company Settings page
  await page.goBack({ waitUntil: 'networkidle' });

  // E-Mail Distribution List text locator
  const emailDistributionListLabel = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*E-mail Distribution List$/,
    },
  );

  // Assert that the locator is visible
  await expect(emailDistributionListLabel).toBeVisible();

  // Click on E-Mail Distribution List section
  await emailDistributionListLabel.click();
  await page.waitForLoadState('networkidle');

  // Distribution List text locator
  const distributionListTextLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_lblDistributionList',
  );

  // Assert that the locator is visible
  await expect(distributionListTextLocator).toBeVisible();

  // Assert that the locator has correct text
  await expect(distributionListTextLocator).toHaveText(/^Distribution List$/);

  // Back to E-mail section button locator
  const backToEmailSectionBtn = page.locator('#ctl00_ContentPlaceHolder1_Button1');

  // Assert that the locator is visible
  await expect(backToEmailSectionBtn).toBeVisible();

  // Assert that the locator is a button element
  await expect(backToEmailSectionBtn).toHaveAttribute('type', 'submit');

  // Add new Record button on E-mail locator
  const addNewRecordEMailBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_gvDistributionList_ctl00_ctl02_ctl00_InitInsertButton',
  );

  // Assert that the locator is visible
  await expect(addNewRecordEMailBtn).toBeVisible();

  // Grid Column Name Distribution List locator
  const distributionListGridHeaderLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_gvDistributionList_GridHeader tr th a',
    { hasText: /^Distribution List$/ },
  );

  // Assert that the locator is visible
  await expect(distributionListGridHeaderLocator).toBeVisible();

  // Email distribution grid Refresh button locator
  const emailDistributionGridRefreshBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_gvDistributionList_ctl00_ctl02_ctl00_RebindGridButton',
  );

  // Assert that the locator is visible
  await expect(emailDistributionGridRefreshBtn).toBeVisible();

  await page.goBack({ waitUntil: 'networkidle' });

  // Equipment Type text locator
  const equipmentTypeLabel = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*Equipment Type$/,
    },
  );

  // Assert that the locator is visible
  await expect(equipmentTypeLabel).toBeVisible();

  // Click on Equipment Type section
  await equipmentTypeLabel.click();
  await page.waitForLoadState('networkidle');

  // Equipment Type text locator
  const equipmentTypeTextLocator = page.locator('#ctl00_ContentPlaceHolder1_lbEquipmentTypeHead');

  // Assert that the locator is visible
  await expect(equipmentTypeTextLocator).toBeVisible();

  // Assert that the locator has correct text
  await expect(equipmentTypeTextLocator).toHaveText(
    companySettingsExpectedValues.expectedLabels.equipmentType,
  );

  // Equipment Type Add New button locator
  const equipmentTypeAddNewBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_gvEquipmentType_ctl00_ctl02_ctl00_InitInsertButton',
  );

  // Assert that the locator is visible
  await expect(equipmentTypeAddNewBtn).toBeVisible();

  // Equipment Type Refresh button locator
  const equipmentTypeRefreshBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_gvEquipmentType_ctl00_ctl02_ctl00_RebindGridButton',
  );

  // Assert that the locator is visible
  await expect(equipmentTypeRefreshBtn).toBeVisible();

  // Equipment Type Grid Column Header locator
  const equipmentTypeGridHeaderLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_gvEquipmentType_ctl00_Header th a',
    { hasText: /^\s*Equipment Type$/ },
  );

  // Assert that the locator is visible
  await expect(equipmentTypeGridHeaderLocator).toBeVisible();

  await page.goBack({ waitUntil: 'networkidle' });

  // Job Title text locator
  const jobTitleLabel = page.locator(
    '#ctl00_ContentPlaceHolder1_CompanySettingsDIV .sectionHeaderText',
    {
      hasText: /^\s*Job Title$/,
    },
  );

  // Assert that the locator is visible
  await expect(jobTitleLabel).toBeVisible();

  // Click on Job Title section
  await jobTitleLabel.click();
  await page.waitForLoadState('networkidle');

  // Job Title text locator
  const jobTitleTextLocator = page.locator('#ctl00_ContentPlaceHolder1_lbJobTitle');

  // Assert that the locator is visible
  await expect(jobTitleTextLocator).toBeVisible();

  // Assert that the locator has correct text
  await expect(jobTitleTextLocator).toHaveText(
    companySettingsExpectedValues.expectedLabels.jobTitle,
  );

  // Add new Job Title button locator
  const addNewJobTitleBtn = page.locator(
    '#ctl00_ContentPlaceHolder1_gvJobTitle_ctl00_ctl02_ctl00_InitInsertButton',
  );

  // Assert that the locator is visible
  await expect(addNewJobTitleBtn).toBeVisible();

  // Job Title Grid column header locator
  const jobTitleGridHeaderLocator = page.locator(
    '#ctl00_ContentPlaceHolder1_gvJobTitle_ctl00_Header th a',
    { hasText: /^\s*Job Title$/ },
  );

  // Assert that the locator is visible
  await expect(jobTitleGridHeaderLocator).toBeVisible();
});

// Storage state persists session - no logout needed
/* test.afterEach(async ({ page, context }) => {
  // Logout and cleanup
}); */
