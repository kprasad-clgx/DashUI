import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CompanyPage } from '../../../pageObjects/enterprise/quickNotes/CompanyPage.po.js';
import CompanyData from '../../../testData/enterprise/quickNotes/createCompany/companyData.json' with { type: 'json' };
import { generateUniqueName } from '../../../utils/helpers.js';

test('Create Company from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const companyPage = new CompanyPage(authenticatedPage);

  // Generate unique company name with timestamp (HHMMSS format)
  const uniqueCompanyName = generateUniqueName('Company-T');

  await companyPage.openQuickNotesCreateCompany();

  // Click on Contact Manager
  await companyPage.clickContactManager();

  // Click on Add New Company button
  await companyPage.clickAddNewCompany();

  // Select Company Type "Lead Company"
  await companyPage.selectCompanyType(CompanyData.companyType);

  // Fill Company Name
  await companyPage.fillCompanyName(uniqueCompanyName);

  // Assert Company Name is filled
  const filledCompanyName = await companyPage.getCompanyNameValue();
  expect(filledCompanyName).toBe(uniqueCompanyName);

  // Fill Company Main Phone
  await companyPage.fillCompanyMainPhone(CompanyData.companyPhone);

  // Assert Company Main Phone is filled
  const filledCompanyPhone = await companyPage.getCompanyMainPhoneValue();
  expect(filledCompanyPhone).toBe(CompanyData.companyPhone);

  // Click Save and Back to Contact Manager
  await companyPage.clickSaveAndBack();

  // Filter by Company Name
  await companyPage.filterByCompanyName(uniqueCompanyName);

  // Assert the unique company name is present in the grid
  const displayedCompanyName = await companyPage.getFirstCompanyName();
  expect(displayedCompanyName).toContain(uniqueCompanyName);
});
