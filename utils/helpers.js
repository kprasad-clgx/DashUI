/**
 * Utility functions for test automation
 */

/**
 * Generates a unique name by appending the current time in hhmmss format.
 * @param {string} name - The base name for the entity (e.g., 'Checklist', 'workorder').
 * @returns {string} - The unique name (e.g., 'Checklist112233').
 */
export function generateUniqueName(name = 'name') {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${name}${hh}${mm}${ss}`;
}

/**
 * Generates a unique description with timestamp for test data
 * @param {string} prefix - The prefix for the description
 * @param {string} testType - The type of test (e.g., 'Job', 'Marketing', etc.)
 * @returns {string} Unique description with timestamp
 */
export function generateUniqueDescription(prefix, testType = 'Test') {
  const timestamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
  return `${prefix} ${testType} ${timestamp}`;
}
