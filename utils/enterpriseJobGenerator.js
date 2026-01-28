import fs from 'fs';
import path from 'path';

/**
 * Saves the job number to a JSON file for use in other tests.
 * @param {string} jobNumber - The job number to save
 * @param {string} customerName - The customer name associated with the job
 * @param {string} filePath - Relative path to the JSON file (e.g., 'testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json')
 * @param {string} jobName - The job name
 * @param {object} additionalData - Additional data to save (optional)
 */
export function saveJobNumber(jobNumber, customerName, filePath, jobName, additionalData = {}) {
  const fullPath = path.resolve(filePath);
  const data = {
    jobNumber: jobNumber,
    jobNumberLowerCase: jobNumber.toLowerCase(),
    customerName: customerName,
    jobName: jobName,
    updatedAt: new Date().toISOString(),
    ...additionalData,
  };
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(
    `Job number saved to ${filePath}: ${jobNumber}, Customer: ${customerName}, Job Name: ${jobName}`,
  );
}

/**
 * Saves job number to all Company Settings JSON files
 * @param {string} jobNumber - The job number to save
 * @param {string} jobNumberWithName - The job number with customer name (e.g., "DRC15-11-0073-WTR; Enterprise, Automate")
 */
export function saveJobNumberForCompanySettings(jobNumber, jobNumberWithName) {
  const files = [
    {
      path: 'testData/enterprise/enterpriseJobNumber.json',
      data: {
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
    {
      path: 'testData/enterprise/enterpriseCompanySettings/AddNewInvoiceData.json',
      data: {
        invoiceMemo: 'Test Invoice Memo',
        additionalInfo: '100',
        billTo: 'ENTERPRISE, AUTOMATE',
        class: '2',
        invoicedAmount: '200',
        salesTax: '10',
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
    {
      path: 'testData/enterprise/enterpriseCompanySettings/AccountValidationData.json',
      data: {
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
    {
      path: 'testData/enterprise/enterpriseCompanySettings/AddNewPaymentData.json',
      data: {
        paymentMode: 'Cash',
        memo: 'Test Payment Memo',
        referenceNumber: 'Keep to Update',
        paymentAmount: '100',
        discountAmount: '99',
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
    {
      path: 'testData/enterprise/enterpriseCompanySettings/EstimatesValidationData.json',
      data: {
        description: 'Test Estimate Description',
        billTo: 'ENTERPRISE, AUTOMATE',
        estimateType: 'Main',
        careOf: 'ACCESSIBILITY FARRER CO.',
        notes: 'Test Notes for Estimate',
        class: 'Warranty',
        estimateAmount: '1500',
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
    {
      path: 'testData/enterprise/enterpriseCompanySettings/JobCostingValidationData.json',
      data: {
        expenseAccount: 'Test Expense Account',
        memo: 'Test Memo',
        quantity: '5',
        unitOfMeasure: 'Hours',
        jobCostType: 'Labor',
        rate: '50',
        transactionType: 'Payment',
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
    {
      path: 'testData/enterprise/enterpriseCompanySettings/AccountingDetailsData.json',
      data: {
        jobNumber: jobNumber,
        jobNumberLowerCase: jobNumber.toLowerCase(),
        jobNumberWithName: jobNumberWithName,
      },
    },
  ];

  files.forEach((file) => {
    const fullPath = path.resolve(file.path);
    fs.writeFileSync(fullPath, JSON.stringify(file.data, null, 2), 'utf-8');
  });
}
