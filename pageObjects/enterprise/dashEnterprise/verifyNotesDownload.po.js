import { expect } from '@playwright/test';

class VerifyNotesDownloadPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to My Notes page
   */
  async navigateToMyNotes() {
    const journalNotesLink = this.page.locator('a[href*="JournalNotesDashboard.aspx"]');
    await journalNotesLink.first().click();
    await this.page.waitForLoadState('networkidle');

    // Click the My Notes dashboard tile (td element with onclick)
    await this.page.locator('td[onclick*="MyNotes.aspx"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Download notes and verify download started
   */
  async downloadNotesAndVerify() {
    // Start waiting for download before clicking
    const downloadPromise = this.page.waitForEvent('download');

    const exportExcelBtn = this.page.locator(
      '#ctl00_ContentPlaceHolder1_MyNotesUserControl_imageButtonExportToExcell',
    );
    await exportExcelBtn.click();

    // Wait for the download to start
    const download = await downloadPromise;

    // Verify download started and filename contains excel extension
    const filename = download.suggestedFilename();
    expect(filename).toBeTruthy();
    expect(filename).toMatch(/\.(xls|xlsx)$/i);
  }

  /**
   * Complete download notes workflow
   */
  async downloadNotesWorkflow() {
    await this.navigateToMyNotes();
    await this.downloadNotesAndVerify();
  }
}

export default VerifyNotesDownloadPage;
