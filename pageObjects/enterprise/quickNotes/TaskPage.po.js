import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class TaskPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- Main Action Buttons ---
    this.createTaskButton = page
      .locator(
        'button:has-text("Create Task"), button:has-text("Add Task"), button.btn-create-task, [aria-label*="Create"], button[title*="Create"]',
      )
      .first();

    // --- Modal Components ---
    this.modalContent = page.locator('.modal-content');
    this.modalSaveButton = this.modalContent
      .locator('.modal-footer button.btn-success')
      .filter({ hasText: 'Save & Close' })
      .first();
    this.typeaheadFirstOption = page
      .locator('typeahead-container button:first-child, .dropdown-item:first-child')
      .first();

    // --- Form Inputs ---
    this.jobNumberInput = this.modalContent
      .locator('input[placeholder*="job"], input[name*="job"], app-autocomplete input')
      .first();
    this.taskDescriptionInput = this.modalContent
      .locator(
        'textarea[placeholder*="task"], textarea[name*="task"], textarea[name*="Description"]',
      )
      .first();
    this.companyInput = this.modalContent.locator('input[placeholder="Enter company name"]');
    this.activitySelect = this.modalContent.locator('select[name="activity"]');
    this.amountInput = this.modalContent.locator('input[name="Amount"]');

    // --- Date & Time Inputs ---
    this.startDateInput = this.modalContent.locator('input[name="start-date"]');
    this.startHourInput = this.modalContent.locator(
      'app-time-picker[name="start-date-time"] input[placeholder="HH"]',
    );
    this.startMinuteInput = this.modalContent.locator(
      'app-time-picker[name="start-date-time"] input[placeholder="MM"]',
    );
    this.startAmPmButton = this.modalContent.locator(
      'app-time-picker[name="start-date-time"] button',
    );

    this.endDateInput = this.modalContent.locator('input[name="end-date"]');
    this.endHourInput = this.modalContent.locator(
      'app-time-picker[name="end-date-time"] input[placeholder="HH"]',
    );
    this.endMinuteInput = this.modalContent.locator(
      'app-time-picker[name="end-date-time"] input[placeholder="MM"]',
    );
    this.endAmPmButton = this.modalContent.locator('app-time-picker[name="end-date-time"] button');

    // --- Resource Picker ---
    this.assignResourceButton = this.modalContent.locator('button.btn-assign-resource');
    this.resourcesContainer = this.modalContent.locator('.resources-container');

    // Popover elements are attached to body, usually outside modal
    this.popoverContainer = page.locator('popover-container, .popover, tooltip-container').first();
    this.resourceSearchInput = this.popoverContainer.locator('input[type="text"]');

    // --- Calendar Verification ---
    this.taskPopup = page.locator('.event-popover');

    // --- Quick Notes ---
    // The Icon that opens the side pane
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    // The Container that slides out
    this.quickNotesContentPane = page.locator(
      '#RAD_SLIDING_PANE_CONTENT_ctl00_ctl44_QuickMenuSlidingPane',
    );
    // The Link inside the pane
    this.createTaskQuickLink = this.quickNotesContentPane.locator('text="Tasks"').first();
  }

  // ================= ACTIONS =================

  async openCreateTaskModal() {
    await this.page.waitForLoadState('networkidle');
    await this.createTaskButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.createTaskButton.click();
    await this.modalContent.waitFor({ state: 'visible', timeout: 10000 });
    return this.modalContent;
  }

  async saveTask() {
    await this.modalSaveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.modalSaveButton.hover();
    await this.modalSaveButton.click();

    // Wait for modal to disappear
    await this.modalContent
      .filter({ hasText: 'Task Type' })
      .first()
      .waitFor({ state: 'hidden', timeout: 15000 });
    await this.waitForPageReady(); // Assuming this is defined in BasePage
  }

  async openQuickNotesCreateTask() {
    // 1. Click the icon to trigger the slide-out
    await this.quickNotesIcon.click();

    // 2. Wait for the sliding pane content to actually become visible
    // Telerik sliding panes often take a split second to animate in
    await this.quickNotesContentPane.waitFor({ state: 'visible', timeout: 5000 });

    // 3. Click the link now that it is visible
    await this.createTaskQuickLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ================= FORM FILLERS =================

  async fillJobNumber() {
    await this.jobNumberInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.jobNumberInput.click();
    await this.typeaheadFirstOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.typeaheadFirstOption.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillTaskDescription(taskDescription) {
    await this.taskDescriptionInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskDescriptionInput.fill(taskDescription);
  }

  async fillCompany() {
    await this.companyInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.companyInput.click();
    await this.typeaheadFirstOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.typeaheadFirstOption.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillActivity(activity) {
    await this.activitySelect.waitFor({ state: 'visible', timeout: 5000 });
    await this.activitySelect.selectOption({ label: activity });
  }

  async fillAmount(amount) {
    await this.amountInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.amountInput.fill(amount);
  }

  async assignResource(resourceName) {
    // Open Picker
    await this.assignResourceButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.assignResourceButton.click();

    await this.popoverContainer.waitFor({ state: 'visible', timeout: 5000 });

    // Search & Select
    await this.resourceSearchInput.waitFor({ state: 'visible' });
    await this.resourceSearchInput.click();
    await this.resourceSearchInput.fill('');
    await this.resourceSearchInput.pressSequentially(resourceName, { delay: 100 });

    const userRow = this.popoverContainer
      .locator('.item')
      .filter({ hasText: resourceName })
      .first();
    await userRow.waitFor({ state: 'visible', timeout: 5000 });
    await userRow.click();

    // Verify Selection in Modal Background
    await this.resourcesContainer
      .filter({ hasText: resourceName })
      .waitFor({ state: 'visible', timeout: 5000 });

    // Close Popover logic
    if (await this.popoverContainer.isVisible()) {
      await this.assignResourceButton.click(); // Toggle Off

      try {
        await this.popoverContainer.waitFor({ state: 'hidden', timeout: 3000 });
      } catch {
        console.warn("Toggle didn't close popover. Clicking body fallback.");
        await this.page.mouse.click(0, 0);
        await this.popoverContainer.waitFor({ state: 'hidden', timeout: 5000 });
      }
    }
  }

  async fillDates(daysFromToday = 7) {
    const dateInfo = this.calculateFutureDate(daysFromToday);

    // Start Date
    await this.startDateInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.startDateInput.fill(dateInfo.dateString);
    await this._setTime(
      this.startHourInput,
      this.startMinuteInput,
      this.startAmPmButton,
      '2',
      '00',
      'PM',
    );

    // End Date
    await this.endDateInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.endDateInput.fill(dateInfo.dateString);
    await this._setTime(
      this.endHourInput,
      this.endMinuteInput,
      this.endAmPmButton,
      '4',
      '00',
      'PM',
    );

    return dateInfo;
  }

  // ================= VERIFICATION & UTILS =================

  /**
   * Verifies task existence using the Calendar Search function.
   * @param {string} taskDescription - The unique task name to search for
   */
  async verifyTaskOnCalendar(taskDescription) {
    // 1. Locate the Search Box
    const searchInput = this.page.locator('app-search input.task-search');
    await searchInput.waitFor({ state: 'visible', timeout: 15000 });

    // 2. Enter the task name
    await searchInput.clear();
    await searchInput.fill(taskDescription);

    // Optional: Click search button if typing doesn't auto-trigger
    const searchButton = this.page.locator('app-search button.task-search');
    if (await searchButton.isVisible()) {
      await searchButton.click();
    }

    // 3. Wait for the results dropdown container (.popout-root)
    const resultsContainer = this.page.locator('app-search .popout-root');
    await resultsContainer.waitFor({ state: 'visible', timeout: 10000 });

    // 4. Locate the specific result item
    const resultItem = resultsContainer
      .locator('.item .text .main', { hasText: taskDescription })
      .first();

    // 5. Assert: Verify the task is found and visible in the results
    try {
      await resultItem.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      throw new Error(
        `[verifyTaskOnCalendar] Task '${taskDescription}' was not found in the calendar search results.`,
      );
    }

    // 6. Click the result (simulates user selecting the task)
    await resultItem.click();

    // 7. Verify the Calendar navigates to/highlights the task
    return resultItem;
  }

  calculateFutureDate(daysFromToday) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysFromToday);

    return {
      dateString: `${futureDate.getMonth() + 1}/${futureDate.getDate()}/${futureDate.getFullYear()}`,
      month: futureDate.getMonth() + 1,
      day: futureDate.getDate(),
      year: futureDate.getFullYear(),
    };
  }

  // Internal Helper to set time
  async _setTime(hourInput, minuteInput, amPmBtn, hour, minute, targetAmPm) {
    await hourInput.fill(hour);
    await minuteInput.fill(minute);

    const currentAmPm = await amPmBtn.textContent();
    if (currentAmPm && !currentAmPm.includes(targetAmPm)) {
      await amPmBtn.click();
    }
  }
}
