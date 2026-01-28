import { expect } from '@playwright/test';

export class ProgramCenterPage {
  constructor(page) {
    this.page = page;
    this.moreMenuHover = page.locator("span:has-text('More...')").first();
    this.programCenterMenuItem = page.getByText('Program Center', {
      exact: true,
    });
    this.programCenterHeader = page.locator('.ProgramCenter_Heading');
    this.sectionHeader = page.locator('.table-head');
    this.globalRequirementHeader = page.getByRole('cell', {
      name: 'Global Requirements',
      exact: true,
    });
    this.globalDocumentHeader = page.locator(
      '#ctl00_ContentPlaceHolder1_Control_ProviderProgramCenter_Control_ProviderProgramDocument_PanelTitle',
    );
  }

  async navigateToProgramCenter() {
    await this.moreMenuHover.hover();
    await this.programCenterMenuItem.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await this.programCenterMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateLabels(labelsToVerify, variableNumberLabels) {
    for (const label of labelsToVerify) {
      const labelLocator = this.programCenterHeader
        .getByText(label.replace(/:$/, ''), { exact: false })
        .first();
      const textContent = await labelLocator.evaluate((el) =>
        el.textContent.trim().replace(/\s+/g, ' '),
      );

      if (variableNumberLabels.includes(label)) {
        const regex = new RegExp(`^\\d+\\s*-\\s*${label}$`);
        expect(textContent).toMatch(regex);
      } else {
        const expectedNormalized = label.trim().replace(/\s+/g, ' ');
        expect(textContent).toBe(expectedNormalized);
      }
    }
  }

  async validateSectionHeaders(sectionHeadersToVerify) {
    for (const header of sectionHeadersToVerify) {
      const headerLocator = this.sectionHeader.getByText(header.replace(/:$/, ''), {
        exact: false,
      });
      const textContent = await headerLocator.evaluate((el) =>
        el.textContent.replace(/\s+/g, ' ').trim(),
      );
      const expectedNormalized = header.replace(/\s+/g, ' ').trim();
      expect(textContent).toBe(expectedNormalized);
    }
  }

  async validateGlobalRequirementHeader() {
    await expect(this.globalRequirementHeader).toBeVisible();
    await expect(this.globalRequirementHeader).toHaveText('Global Requirements');
  }

  async validateGlobalDocumentHeader() {
    await expect(this.globalDocumentHeader).toHaveText('Global Document');
    await expect(this.globalDocumentHeader).toBeVisible();
  }
}
