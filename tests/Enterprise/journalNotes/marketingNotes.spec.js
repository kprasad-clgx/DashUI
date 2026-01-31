import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { MarketingNotesPage } from '../../../pageObjects/enterprise/journalNotes/MarketingNotesPage.po.js';

test.describe('Marketing Notes', () => {
  test('Create and Verify Individual Notes', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const marketingNotesPage = new MarketingNotesPage(page);
    // Navigate to Journal Notes > Marketing Notes
    await marketingNotesPage.navigateTo('Journal Notes', 'Marketing Notes');

    // 1. INDIVIDUAL NOTE
    const individualNote = marketingNotesPage.generateUniqueNote('Individual Note');
    const individualId = individualNote.split('MarketingNote')[1].trim();

    await marketingNotesPage.clickAddNewRecord();
    await marketingNotesPage.selectIndividual();
    await marketingNotesPage.enterNoteText(individualNote);
    await marketingNotesPage.saveNote();
    await marketingNotesPage.waitForGridRefresh();

    // SEARCH & VERIFY
    const individualResult = await marketingNotesPage.searchAndGetFirstRow(individualId);
    expect(individualResult).toContain(individualId);
  });

  test('Create and Verify Company Notes', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const marketingNotesPage = new MarketingNotesPage(page);
    // Navigate to Journal Notes > Marketing Notes
    await marketingNotesPage.navigateTo('Journal Notes', 'Marketing Notes');

    // Switch to Company Notes
    await marketingNotesPage.clickCompanyNotesTab();

    // 1. COMPANY NOTE
    const companyNote = marketingNotesPage.generateUniqueNote('Company Note');
    const companyId = companyNote.split('MarketingNote')[1].trim();

    await marketingNotesPage.clickAddCompanyRecord();
    await marketingNotesPage.selectCompany();
    await marketingNotesPage.enterNoteText(companyNote);
    await marketingNotesPage.saveNote();
    await marketingNotesPage.waitForGridRefresh();

    // SEARCH & VERIFY
    const companyResult = await marketingNotesPage.searchAndGetFirstRow(companyId);
    expect(companyResult).toContain(companyId);
  });
});
