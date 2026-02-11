import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import { readdir } from 'fs/promises';
import { resolve } from 'path';

test('Allowed File Extensions for document upload', async ({ authenticatedPage }) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job 
  await searchJobNumber(authenticatedPage, jobNumber);

  // Click on Documents Tab
  await jobSlideboardPage.clickDocumentsTab();
  await authenticatedPage.waitForLoadState('domcontentloaded');

  // Get all files from testData/enterprise/uploadFiles directory
  const uploadFilesDir = resolve('testData/enterprise/uploadFiles');
  const files = await readdir(uploadFilesDir);
  
  // Filter out any non-file entries and sort for consistent order
  const testFiles = files.sort();
  expect(testFiles.length).toBe(21);

  // Create full paths for all files
  const allFilePaths = testFiles.map(fileName => resolve(uploadFilesDir, fileName));
    
  // Upload all files at once
  await jobSlideboardPage.uploadAllDocuments(allFilePaths);
  
  // Select "Others" album from dropdown
  await jobSlideboardPage.selectAlbumFromDropdown('Others');
  
  // Click the Upload button to process all files
  await jobSlideboardPage.clickUploadDocumentsButton();
  
  // Wait for upload completion message
  const uploadCompletionMessage = jobSlideboardPage.getUploadCompletionMessage();
  await expect(uploadCompletionMessage).toContainText('Document upload initiated', { timeout: 60000 });
});

