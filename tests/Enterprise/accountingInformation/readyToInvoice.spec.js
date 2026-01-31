import { test } from '../../../fixtures/enterpriseFixtures.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import { ReadyToInvoicePage } from '../../../pageObjects/enterprise/accountingInformation/ReadyToInvoicePage.po.js';
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('testData/enterprise/accountingInformation');
const readyToInvoiceData = JSON.parse(
  fs.readFileSync(path.join(dataPath, 'readyToInvoice.json'), 'utf-8'),
);

let jobNumber;

test.beforeAll(async () => {
  const jobData = JSON.parse(
    fs.readFileSync('testData/enterprise/enterpriseJobNumber.json', 'utf-8'),
  );
  jobNumber = jobData.jobNumber;
});

test('Create Invoice workflow', async ({ authenticatedPage }) => {
  const readyToInvoicePage = new ReadyToInvoicePage(authenticatedPage);
  await searchJobNumber(authenticatedPage, jobNumber);
  await readyToInvoicePage.createInvoice({
    ...readyToInvoiceData.invoice,
    customerLastName: readyToInvoiceData.invoice.billToName,
  });
});
