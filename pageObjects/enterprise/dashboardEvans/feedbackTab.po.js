import { expect } from '@playwright/test';

const FeedbackTabLocators = {
  feedbackTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  gridHeader:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobFeedback_userControl_JobFeedbackGrid_ctl00_Header .rgHeader',
};

class FeedbackTabPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Feedback tab
   */
  async navigateToFeedbackTab() {
    const feedBackTabLocator = this.page.locator(FeedbackTabLocators.feedbackTab, {
      hasText: 'Feedback',
    });
    await expect(feedBackTabLocator).toBeVisible();
    await feedBackTabLocator.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Assert all grid headers are visible
   * @param {Array<string>} headers - Array of expected header texts
   */
  async assertGridHeaders(headers) {
    for (const headerText of headers) {
      const headerLocator = this.page.locator(FeedbackTabLocators.gridHeader, {
        hasText: headerText,
      });
      await expect(headerLocator).toBeVisible();
    }
  }
}

export default FeedbackTabPage;
