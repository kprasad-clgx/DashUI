import { BasePage } from '../basePage/enterpriseBasePage.po';

export class SecurityPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.expandSlideboard = page.getByRole('img', { name: 'Expand Slideboard' });
    this.expandOther = page.getByTitle('Expand Other');
    this.hoverLink = page.getByRole('link', { name: 'Hover Link' });
    this.securityCard = page.locator('div.card.card_33:visible');
    this.expandCopyJobs = page.getByTitle('Expand Copy Jobs');
    this.copyJobsCheckbox = page.locator(
      `//tr[td[normalize-space()='Copy Jobs']]//input[@type='checkbox']`,
    );
    this.copyLocalToAdminClaimCheckbox = page.locator(
      `//tr[td[normalize-space()='Copy Local job into Admin Dispatched Claim']]//input[@type='checkbox']`,
    );
    this.copyLocalToLocalJobCheckbox = page.locator(
      `//tr[td[normalize-space()='Copy Local job into another Local job']]//input[@type='checkbox']`,
    );
    this.copyLocalToProviderClaimCheckbox = page.locator(
      `//tr[td[normalize-space()='Copy Local job into provider created Claim']]//input[@type='checkbox']`,
    );
    this.copyProviderClaimToAdminClaim = page.locator(
      `//tr[td[normalize-space()='Copy Provider created claim into Admin Dispatched Claim']]//input[@type='checkbox']`,
    );
    this.copyProviderClaimToProviderClaimCheckbox = page.locator(
      `//tr[td[normalize-space()='Copy Provider created claim into another Provider created claim']]//input[@type='checkbox']`,
    );
    this.saveButton = page.locator('#ctl00_ContentPlaceHolder1_btnSave');
  }

  async openSecurityPage() {
    await this.securityCard.click();
    await this.waitForPageReady();
  }

  async verifyAllCopyJobsChecked() {
    await this.expandOther.click();
    await this.expandCopyJobs.click();

    const copyJobCheckboxes = [
      this.copyLocalToAdminClaimCheckbox,
      this.copyLocalToLocalJobCheckbox,
      this.copyLocalToProviderClaimCheckbox,
      this.copyProviderClaimToAdminClaim,
      this.copyProviderClaimToProviderClaimCheckbox,
    ];

    let anyUnchecked = false;
    for (const checkbox of copyJobCheckboxes) {
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
        anyUnchecked = true;
      }
    }

    if (anyUnchecked) {
      await this.saveButton.click();
    }
  }
}
