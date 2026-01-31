import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { NotesPage } from '../../../pageObjects/enterprise/quickNotes/NotesPage.po.js';

test('Create Notes from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const notesPage = new NotesPage(authenticatedPage);

  // 1. Navigate to Create Notes
  await notesPage.openQuickNotesCreateNotes();

  // 2. Fill out the form
  await notesPage.createNotes();

  // 3. Save and Verify
  const isSuccess = await notesPage.saveNotesAndVerify();

  expect(isSuccess).toBe(true);
});
