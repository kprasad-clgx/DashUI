import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class AccountDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Navigation
    this.accountDetailsLink = page.locator("img[alt='Acct. Details']");

    // JOB ACCOUNTING SUMMARY
    this.summaryLabels = {
      header: page.locator('#ctl00_ContentPlaceHolder1_JobAccountSummaryLabel'),
      jobNumber: page.locator('#ctl00_ContentPlaceHolder1_JobNumberLabel'),
      originalEst: page.locator('#ctl00_ContentPlaceHolder1_OriginalEstimateLabel'),
      supplementEst: page.locator('#ctl00_ContentPlaceHolder1_SupplementEstimateLabel'),
      changeOrder: page.locator('#ctl00_ContentPlaceHolder1_ChangeOrderLabel'),
      finalEst: page.locator('#ctl00_ContentPlaceHolder1_FinalEstimateLabel'),
      estUnpaid: page.locator('#ctl00_ContentPlaceHolder1_EstimateUnpaidLabel'),
      woPoTotal: page.locator('#ctl00_ContentPlaceHolder1_WorkOrderTotalLabel'),
      estGPPer: page.locator('#ctl00_ContentPlaceHolder1_EstimatedGPPercentageLabel'),
      estGP: page.locator('#ctl00_ContentPlaceHolder1_EstimatedGPLabel'),
      estAfterWO: page.locator('#ctl00_ContentPlaceHolder1_EstimateAfterWOAdjustmentLabel'),
      estAfterWOPer: page.locator(
        '#ctl00_ContentPlaceHolder1_EstimateAfterWOAdjustmentPercentageLabel',
      ),
      invoiced: page.locator('#ctl00_ContentPlaceHolder1_InvoicedLabel'),
      creditMemos: page.locator('#ctl00_ContentPlaceHolder1_PaymentRefundedLabel'),
      estUninvoiced: page.locator('#ctl00_ContentPlaceHolder1_EstimateUnInvoicedLabel'),
      paymentRec: page.locator('#ctl00_ContentPlaceHolder1_PaymentReceivedLabel'),
      discount: page.locator('#ctl00_ContentPlaceHolder1_Label_PaymentDiscount'),
      balReceivable: page.locator('#ctl00_ContentPlaceHolder1_BalanceReceivableLabel'),
      actualCost: page.locator('#ctl00_ContentPlaceHolder1_ActualJobCostLabel'),
      actualGPPer: page.locator('#ctl00_ContentPlaceHolder1_ActualGPPercentageLabel'),
      actualGP: page.locator('#ctl00_ContentPlaceHolder1_ActualGPLabel'),
      percentComplete: page.locator('#ctl00_ContentPlaceHolder1_PercentageCompletedLabel'),
    };

    // Amount Values
    this.summaryValues = {
      originalEstimateAmount: page.locator(
        '#ctl00_ContentPlaceHolder1_OriginalEstimateAmountLabel',
      ),
      supplementEstimateAmount: page.locator(
        '#ctl00_ContentPlaceHolder1_SupplementEstimateAmountLabel',
      ),
      changeOrderAmount: page.locator('#ctl00_ContentPlaceHolder1_ChangeOrderAmountLabel'),
      finalEstimateAmount: page.locator('#ctl00_ContentPlaceHolder1_FinalEstimateAmountLabel'),
      estimateUnpaidAmount: page.locator('#ctl00_ContentPlaceHolder1_EstimateUnpaidAmountLabel'),
      workOrderTotalAmount: page.locator('#ctl00_ContentPlaceHolder1_WorkOrderTotalAmountLabel'),
      estimatedGPPercentage: page.locator(
        '#ctl00_ContentPlaceHolder1_EstimatedGPPercentageAmountLabel',
      ),
      estimatedGPAmount: page.locator('#ctl00_ContentPlaceHolder1_EstimatedGPAmountLabel'),
      estimateAfterWOAmount: page.locator(
        '#ctl00_ContentPlaceHolder1_EstimateAfterWOAdjustmentAmountLabel',
      ),
      estimateAfterWOPercentage: page.locator(
        '#ctl00_ContentPlaceHolder1_EstimateAfterWOAdjustmentPercentageAmountLabel',
      ),
      invoicedAmount: page.locator('#ctl00_ContentPlaceHolder1_InvoicedAmountLabel'),
      creditMemosAmount: page.locator('#ctl00_ContentPlaceHolder1_PaymentRefundAmountLabel'),
      estimatedUninvoicedAmount: page.locator(
        '#ctl00_ContentPlaceHolder1_EstimateUnInvoicedAmountLabel',
      ),
      paymentReceivedAmount: page.locator('#ctl00_ContentPlaceHolder1_PaymentReceivedAmountLabel'),
      discountAmount: page.locator('#ctl00_ContentPlaceHolder1_Label_PaymentDiscountAmount'),
      balanceReceivableAmount: page.locator(
        '#ctl00_ContentPlaceHolder1_BalanceReceivableAmountLabel',
      ),
      actualJobCostAmount: page.locator('#ctl00_ContentPlaceHolder1_ActualJobCostAmountLabel'),
      actualGPPercentage: page.locator('#ctl00_ContentPlaceHolder1_ActualGPPercentageAmountLabel'),
      actualGPAmount: page.locator('#ctl00_ContentPlaceHolder1_ActualGPAmountLabel'),
    };

    // 2. SECTIONS

    // --- Payments ---
    this.payments = {
      tabButton: page.locator('#ctl00_ContentPlaceHolder1_PaymentButton'),
      headerLabel: page.locator('#ctl00_ContentPlaceHolder1_lbPayments'),
      jobLabel: page.locator('#ctl00_ContentPlaceHolder1_lbljob'),
      addButton: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl00_AddNewRecordButton',
      ),
      // Form
      modeDropdown: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_PaymentModeRadComboBox_Input',
      ),
      modeFirstOption: page.locator(
        'div.RadComboBoxDropDown_SecondaryComboBox li.rcbItem:first-child',
      ),
      memoInput: page.locator('#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtMemo'),
      dateInput: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtDateOfPayment_dateInput',
      ),
      refInput: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtRefferenceNo',
      ),
      amountInput: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_txtPaymentAmount',
      ),
      discountInput: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_RadNumericTextBox_DiscountAmount',
      ),
      saveButton: page.locator('#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_btnUpdate'),
      cancelButton: page.locator(
        '#ctl00_ContentPlaceHolder1_gvPayments_ctl00_ctl02_ctl04_btnCancel',
      ),
    };

    // --- Estimates ---
    this.estimates = {
      tabButton: page.locator('#ctl00_ContentPlaceHolder1_EstimateButton'),
      jobLabel: page.locator('#ctl00_ContentPlaceHolder1_lblJobNumber'),
      trackerBtn: page.locator('#ctl00_ContentPlaceHolder1_btnEstTracker'),
      woBtn: page.locator('#ctl00_ContentPlaceHolder1_btnWorkOrder'),
      xactBtn: page.locator('#ctl00_ContentPlaceHolder1_btnOpenXactEstimate'),
      button1: page.locator('#ctl00_ContentPlaceHolder1_Button1'),
      exportBtn: page.locator(
        '#ctl00_ContentPlaceHolder1_gvInvoice_ctl00_ctl02_ctl00_ExportToExcelButton',
      ),
    };

    // --- Job Costing ---
    this.jobCosting = {
      tabButton: page.locator('#ctl00_ContentPlaceHolder1_JobCostingButton'),
      headerLabel: page.locator('#ctl00_ContentPlaceHolder1_JobCostingLabel'),
      jobLabel: page.locator('#ctl00_ContentPlaceHolder1_JobNumberLabel'),
      timeSheetBtn: page.locator('#ctl00_ContentPlaceHolder1_ViewTimeSheetReconciliationButton'),
      catOverviewLabel: page.locator('#ctl00_ContentPlaceHolder1_OverviewbyCategoryLabel'),
      costCatLabel: page.locator('#ctl00_ContentPlaceHolder1_CostCategoriesLabel'),
      burdenLabel: page.locator('#ctl00_ContentPlaceHolder1_BurdenCostLabel'),
      totalLabel: page.locator('#ctl00_ContentPlaceHolder1_TotalCostLabel'),
      // Sub-buttons
      consumables: page.locator('#ctl00_ContentPlaceHolder1_ConsumablesButton'),
      equipment: page.locator('#ctl00_ContentPlaceHolder1_EquipmentButton'),
      extra: page.locator('#ctl00_ContentPlaceHolder1_ExtraCostsButton'),
      labor: page.locator('#ctl00_ContentPlaceHolder1_LaborButton'),
      materials: page.locator('#ctl00_ContentPlaceHolder1_MaterialsButton'),
      others: page.locator('#ctl00_ContentPlaceHolder1_OthersButton'),
      professional: page.locator('#ctl00_ContentPlaceHolder1_ProfessionalButton'),
      referral: page.locator('#ctl00_ContentPlaceHolder1_ReferralFeeButton'),
      subTrade: page.locator('#ctl00_ContentPlaceHolder1_SubTradeButton'),
      warranty: page.locator('#ctl00_ContentPlaceHolder1_WarrantyButton'),
      allCosts: page.locator('#ctl00_ContentPlaceHolder1_AllCategoryCostsButton'),
      backButton: page.locator('#ctl00_ContentPlaceHolder1_BackToAccountingButton'),
    };

    // --- Invoices ---
    this.invoices = {
      tabButton: page.locator('#ctl00_ContentPlaceHolder1_InvoiceButton'),
      headerLabel: page.locator('#ctl00_ContentPlaceHolder1_Label1'),
      jobLabel: page.locator('#ctl00_ContentPlaceHolder1_lblJN'),
      insertBtn: page.locator(
        '#ctl00_ContentPlaceHolder1_gvInvoices_ctl00_ctl02_ctl00_InitInsertButton',
      ),
      paymentBtn: page.locator('#ctl00_ContentPlaceHolder1_btnPayment'),
      deleteBtn: page.locator('#ctl00_ContentPlaceHolder1_btnDelete'),
      backSlideboardBtn: page.locator('#ctl00_ContentPlaceHolder1_btnBacktoSlideBoard'),
    };

    // --- Work Order ---
    this.workOrder = {
      tabButton: page.locator('#ctl00_ContentPlaceHolder1_WorkOrderButton'),
      jobLabel: page.locator('#ctl00_ContentPlaceHolder1_lbljnumber'),
      backHomeBtn: page.locator('#ctl00_ContentPlaceHolder1_btnBackToHomepage'),
      backJobCostingBtn: page.locator('#ctl00_ContentPlaceHolder1_btnBackToJobCosting'),
      jobSummary: page.locator(
        '#ctl00_ContentPlaceHolder1_JobSummaryControl_JobSummaryPane_header_Label16',
      ),
      // Images/Controls
      autoGenImg: page.locator('#ctl00_ContentPlaceHolder1_imgAutoGenerateWo'),
      createNewImg: page.locator('#ctl00_ContentPlaceHolder1_imgCreateNewWo'),
      startImg: page.locator('#ctl00_ContentPlaceHolder1_imgActualWorkOrderStart'),
      completeImg: page.locator('#ctl00_ContentPlaceHolder1_imgCompleteWo'),
      deleteImg: page.locator('#ctl00_ContentPlaceHolder1_imgDeleteWo'),
      ganttImg: page.locator('#ctl00_ContentPlaceHolder1_imgJobGantchart'),
      negativeImg: page.locator('#ctl00_ContentPlaceHolder1_imgNegetivelineItem'),
      addEstImg: page.locator('#ctl00_ContentPlaceHolder1_imgaddEstimate'),
      convertPOImg: page.locator('#ctl00_ContentPlaceHolder1_imgConvertPurchaseOrder'),
      sharedExtBtn: page.locator('#ctl00_ContentPlaceHolder1_WorkOrderSharedExternallyImageButton'),
      milestoneBtn: page.locator('#ctl00_ContentPlaceHolder1_MilestoneImageButton'),
    };

    // --- Reports ---
    this.reports = {
      tabButton: page.locator('#ctl00_ContentPlaceHolder1_ReportButton'),
      poReportBtn: page.locator('#ctl00_ContentPlaceHolder1_ReportWithPOButton'),
      backToEstBtn: page.locator('#btnBacktoEstimate'),
      // Labels for validation
      labels: [
        page.locator('#lblInvoiced'),
        page.locator('#lblInvoicedAmount'),
        page.locator('#lblLabor'),
        page.locator('#lblLaborvlaue'),
        page.locator('#lblLaborPer'),
        page.locator('#lblTaxes'),
        page.locator('#lblTaxesAmount'),
        page.locator('#lblRevenue'),
        page.locator('#lblRevenueAmount'),
        page.locator('#lblCosts'),
        page.locator('#lblCostsAccounting'),
        page.locator('#lblCostPresentage'),
        page.locator('#lblBurden'),
        page.locator('#lblBurdenamount'),
        page.locator('#lblMargin'),
        page.locator('#lblMarginValue'),
        page.locator('#lblMarginPer'),
        page.locator('#lblTotalLabor'),
        page.locator('#lblTotalLaborAmount'),
        page.locator('#lblMaterials'),
        page.locator('#lblMaterialsamount'),
      ],
    };

    // Shared
    this.btnBackToAccounting = page.locator('#ctl00_ContentPlaceHolder1_btnBacktoAccounting');
  }

  // ACTIONS

  async goToHome() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async openAccountDetails() {
    await this.accountDetailsLink.click();
    await this.summaryLabels.header.waitFor({ state: 'visible' });
  }

  async validateAccountingSummaryPage() {
    for (const locator of Object.values(this.summaryLabels)) {
      await locator.waitFor({ state: 'visible' });
    }
  }

  // --- Payments ---
  async openPayments() {
    await this.payments.tabButton.click();
    await this.payments.headerLabel.waitFor({ state: 'visible' });
  }

  async validatePaymentsPage() {
    await this.payments.headerLabel.waitFor({ state: 'visible' });
    await this.payments.jobLabel.waitFor({ state: 'visible' });
    await this.payments.addButton.waitFor({ state: 'visible' });
  }

  async addPayment(paymentData) {
    await this.payments.addButton.click();
    await this.payments.modeDropdown.waitFor({ state: 'visible' });
    // Open dropdown and select the first available option (scoped to visible dropdown)
    await this.payments.modeDropdown.click();
    const dropdown = this.page.locator(
      'div.RadComboBoxDropDown_SecondaryComboBox[style*="display: block"]',
    );
    await dropdown.waitFor({ state: 'visible' });
    const firstOption = dropdown.locator('li.rcbItem').first();
    await firstOption.waitFor({ state: 'visible' });
    await firstOption.click();

    if (paymentData.memo) await this.payments.memoInput.fill(paymentData.memo);
    if (paymentData.paymentDate) await this.payments.dateInput.fill(paymentData.paymentDate);
    if (paymentData.referenceNo) await this.payments.refInput.fill(paymentData.referenceNo);

    await this.payments.amountInput.clear();
    await this.payments.amountInput.fill(paymentData.paymentAmount.toString());

    if (paymentData.discountAmount) {
      await this.payments.discountInput.clear();
      await this.payments.discountInput.fill(paymentData.discountAmount.toString());
    }

    await this.payments.saveButton.click();
    await this.payments.modeDropdown.waitFor({ state: 'hidden' });
  }

  async backToAccountingFromPayments() {
    await this.btnBackToAccounting.click();
    await this.summaryLabels.header.waitFor({ state: 'visible' });
  }

  // --- Estimates ---
  async openEstimates() {
    await this.estimates.tabButton.click();
    await this.estimates.jobLabel.waitFor({ state: 'visible' });
  }

  async validateEstimatesPage() {
    // Check visibility of all estimate controls except tabButton
    for (const [key, locator] of Object.entries(this.estimates)) {
      if (key === 'tabButton') continue;
      await locator.waitFor({ state: 'visible' });
    }
  }

  // --- Job Costing ---
  async openJobCosting() {
    await this.jobCosting.tabButton.click();
    await this.jobCosting.headerLabel.waitFor({ state: 'visible' });
  }

  async validateJobCostingPage() {
    // Iterate over all locators in the jobCosting group except tabButton
    for (const [key, locator] of Object.entries(this.jobCosting)) {
      if (key === 'tabButton') continue;
      await locator.waitFor({ state: 'visible' });
    }
  }

  async backToAccountingFromJobCosting() {
    await this.jobCosting.backButton.click();
    await this.summaryLabels.header.waitFor({ state: 'visible' });
  }

  // --- Invoices ---
  async openInvoices() {
    await this.invoices.tabButton.click();
    await this.invoices.headerLabel.waitFor({ state: 'visible' });
  }

  async validateInvoicesPage() {
    for (const [key, locator] of Object.entries(this.invoices)) {
      if (key === 'tabButton') continue;
      await locator.waitFor({ state: 'visible' });
    }
    await this.btnBackToAccounting.waitFor({ state: 'visible' });
  }

  // --- Work Orders ---
  async openWorkOrder() {
    await this.workOrder.tabButton.click();
    await this.workOrder.jobLabel.waitFor({ state: 'visible' });
  }

  async validateWorkOrderPage() {
    for (const [key, locator] of Object.entries(this.workOrder)) {
      if (key === 'tabButton') continue;
      await locator.waitFor({ state: 'visible' });
    }
  }

  // --- Reports ---
  async openAccountingReport() {
    await this.reports.tabButton.click();
    await this.reports.labels[0].waitFor({ state: 'visible' });
  }

  async validateAccountingReportPage() {
    for (const locator of this.reports.labels) {
      await locator.waitFor({ state: 'visible' });
    }
  }

  async openAccountReportWithPOs() {
    await this.reports.poReportBtn.click();
  }

  async validateAccountingAmount() {
    const results = {};
    // Loop through summaryValues to get text content efficiently
    for (const [key, locator] of Object.entries(this.summaryValues)) {
      await locator.waitFor({ state: 'visible' });
      const text = await locator.textContent();
      results[key] = text;
    }
    return results;
  }
}
