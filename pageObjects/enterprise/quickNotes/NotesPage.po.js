import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class NotesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- PARENT PAGE LOCATORS ---
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.createNotesQuickLink = page
      .locator('#ctl00_ctl44_QuickMenudDiv')
      .getByRole('link', { name: 'Notes', exact: true });

    // --- IFRAME SETUP ---
    this.modalIframeName = 'iframe[name="RadWindow_AddNotes"]';
    this.notesDialogFrame = page.frameLocator(this.modalIframeName);
    this.radWindowWrapper = page
      .locator('.RadWindow_AddNotes, .rwWindow')
      .filter({ has: page.locator(`iframe[name="RadWindow_AddNotes"]`) });

    // --- IFRAME LOCATORS ---
    this.jobNumberArrow = this.notesDialogFrame.locator('#ctl02_ddlJobNumber_Arrow');
    this.jobNumberDropdownList = this.notesDialogFrame.locator(
      '#ctl02_ddlJobNumber_DropDown .rcbList li',
    );

    // Standard notes list
    this.standardNoteItem = this.notesDialogFrame.locator('#ctl02_lstStandardNotes_i3');

    // Individual contacts checkboxes
    this.individualContactsCheckboxes = this.notesDialogFrame.locator(
      'input[type="checkbox"][name*="IndividualContacts"]:not([disabled])',
    );

    // Save button
    this.saveButton = this.notesDialogFrame.locator(
      '#ctl02_Button_SaveAndGoToSlideBoardBottom_input',
    );

    // Success Indicator (Green Tick) inside the iframe
    this.greenTick = this.notesDialogFrame.locator('img[src*="Completed_On_Time_Icon.svg"]');
  }

  // --- ACTIONS ---

  async openQuickNotesCreateNotes() {
    await this.quickNotesIcon.click();
    await this.createNotesQuickLink.click();
    //await this.radWindowWrapper.waitFor({ state: 'visible', timeout: 15000 });
  }

  // Complete notes creation workflow
  async createNotes() {
    await this.selectJobNumber();
    await this.selectStandardNote();
    await this.checkActiveIndividualContacts();
  }

  // Save notes and verify success using the Green Tick
  async saveNotesAndVerify() {
    // 1. Click Save
    await this.saveButton.click();

    // 2. Verify Success: Wait for the Green Tick to appear inside the iframe.
    try {
      await this.greenTick.waitFor({ state: 'visible', timeout: 5000 });
      return true; // Success: Tick appeared
    } catch {
      // If tick didn't appear (or frame closed), check if the window is gone.
      if (await this.radWindowWrapper.isHidden()) {
        return true;
      }
      return false; // Window stuck open, no tick -> Fail
    }
  }

  // --- FORM HELPERS ---

  async selectJobNumber() {
    await this.jobNumberArrow.click();
    await this.jobNumberDropdownList.first().waitFor({ state: 'visible', timeout: 5000 });
    await this.jobNumberDropdownList.first().click();
    await this.jobNumberDropdownList.first().waitFor({ state: 'hidden', timeout: 3000 });
  }

  async selectStandardNote() {
    await this.standardNoteItem.scrollIntoViewIfNeeded();
    await this.standardNoteItem.dblclick();
  }

  async checkActiveIndividualContacts() {
    const count = await this.individualContactsCheckboxes.count();
    for (let i = 0; i < count; i++) {
      const checkbox = this.individualContactsCheckboxes.nth(i);
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }
  }
}
