# DashUI Framework Setup Guide

## 🚀 Quick Start for New PC Setup

Follow these steps to set up the testing framework on a new machine:

### 1. Prerequisites

- **Node.js**: Version 20.x or later ([Download](https://nodejs.org/))
- **Git**: For cloning the repository
- **VS Code**: Recommended editor

### 2. Installation Steps

```bash
# 1. Clone the repository (if not already done)
git clone <repository-url>
cd DashUI

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npm run test:install
# OR
npx playwright install --with-deps chromium
```

### 3. Environment Configuration

⚠️ **CRITICAL STEP** - Configure your environment variables:

1. **Create a `.env` file** in the root directory (if it doesn't exist)
2. Set the `TEST_ENV` variable to your desired environment:

   ```dotenv
   TEST_ENV=stage  # Options: dkirc, stage, dev, qa, prod
   ```

3. Add the corresponding environment variables with valid values:
   - For `TEST_ENV=stage`, add these variables:
     ```dotenv
     STAGE_ENTERPRISE_LOGIN_URL=https://your-enterprise-url
     STAGE_ADMIN_LOGIN_URL=https://your-admin-url
     STAGE_ENTERPRISE_COMPANY_ID=your-company-id
     STAGE_ENTERPRISE_USERNAME=your-username
     STAGE_ENTERPRISE_PASSWORD=your-password
     STAGE_ADMIN_USERNAME=admin-username
     STAGE_ADMIN_PASSWORD=admin-password
     ```
   - For other environments (dkirc, dev, qa, prod), use the same pattern with the environment prefix

4. **Save the file** after making changes

**Note**: The `.env` file is automatically loaded by `global-setup.js` using `dotenv`. Never commit this file to version control.

### 4. Verify Setup

```bash
# Run a simple test to verify everything works
npm test -- --grep "Home Page"
```

## 🔧 Common Setup Issues

### Issue 1: "url: expected string, got undefined"

**Symptom**: Error when running tests on new setup

```
Error: page.goto: url: expected string, got undefined
```

**Solution**:

1. Check your `.env` file exists in the root directory
2. Verify `TEST_ENV` is set (e.g., `TEST_ENV=stage`)
3. Ensure the environment-specific variables are configured:
   - If `TEST_ENV=stage`, check `STAGE_ENTERPRISE_LOGIN_URL` is set
   - If `TEST_ENV=dkirc`, check `DKIRC_ENTERPRISE_LOGIN_URL` is set
4. Make sure there are no typos in variable names
5. Restart your terminal/IDE after modifying `.env`

### Issue 2: Missing Dependencies

**Solution**:

```bash
npm install
npx playwright install --with-deps chromium
```

### Issue 3: Authentication Fails

**Solution**:

1. Verify credentials in `.env` are correct
2. Delete `.auth` folder and run tests again:
   ```bash
   rm -rf .auth
   npm test
   ```

## 📁 Project Structure

```
DashUI_FrameworkGit/
├── .env                    # Environment configuration (IMPORTANT! - Create this file)
├── azure-pipelines.yml    # CI/CD pipeline configuration
├── eslint.config.js       # ESLint configuration
├── global-setup.js        # Authentication setup (loads .env automatically)
├── global-teardown.js     # Cleanup after test execution
├── playwright.config.js   # Playwright configuration
├── package.json          # Dependencies and scripts
├── README.md             # This file - Quick start guide
├── zSetup                # Detailed setup guide for new machines
├── config/               # Configuration files
│   ├── browser.config.js       # Browser settings
│   ├── environment.config.js   # Environment variables loader
│   └── timeout.config.js       # Centralized timeout configuration
├── docs/                 # Documentation
│   ├── CI-CD-SETUP.md
│   ├── NOTIFICATION_HANDLING.md
│   ├── NOTIFICATION_IMPLEMENTATION.md
│   ├── NOTIFICATION_QUICK_REFERENCE.md
│   ├── POM_STANDARD.md
│   └── GLOBAL_TEARDOWN_GUIDE.md
├── e2e/                  # Example test files
├── fixtures/             # Test fixtures (with auto notification handling)
│   ├── adminFixtures.js
│   ├── enterpriseFixtures.js
│   └── mixedFixtures.js
├── pageObjects/          # Page Object Models
│   ├── admin/
│   ├── enterprise/
│   └── enterpriseAndAdmin/
├── playwright-report/    # Generated HTML test reports
├── scripts/              # Utility scripts
│   ├── cleanup.js
│   ├── find-unused-imports.js
│   ├── setup.ps1
│   ├── verify-imports.js
│   └── verify-setup.js
├── test-results/         # Test artifacts (screenshots, traces, videos)
├── testData/             # Test data files (JSON)
│   ├── admin/
│   └── enterprise/
├── tests/                # Test files
│   ├── Admin/
│   ├── Enterprise/
│   └── EnterpriseAndAdmin/
└── utils/                # Utility helpers
    ├── adminClaimGenerator.js
    ├── enterpriseClaimGenerator.js
    ├── enterpriseJobGenerator.js
    ├── helpers.js
    ├── notificationHelper.js
    ├── randomNumber.js
    └── searchJobNumber.js
```

## ✨ Key Features

### 🔔 Automatic Notification Handling

The framework includes **automatic notification dismissal** to prevent pop-ups from blocking test execution:

- ✅ **Zero configuration required** - Works automatically on all tests
- ✅ **3-layer protection** - Fixture level, navigation level, manual control
- ✅ **8 detection strategies** - Finds notifications using multiple selectors
- ✅ **Centralized timeout management** - Consistent timeout values across framework

**Learn more:** See [Notification Handling Guide](docs/NOTIFICATION_HANDLING.md)

**Quick example:**
```javascript
test('My test', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  // Notifications auto-dismissed ✅
  
  // Optional: Manual dismissal if needed
  await page.notificationHelper.dismissAllNotifications();
});
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run only enterprise tests
npm run test:enterprise

# Run only admin tests
npm run test:admin

# Run only mixed tests (enterprise + admin)
npm run test:mixed

# Run with UI mode (interactive)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Run tests for CI/CD (with multiple reporters)
npm run test:ci

# Run specific test file
npx playwright test tests/Admin/Administration/homePageValidation.spec.js

# Run with more workers (parallel execution)
npx playwright test --workers=4
```

## 🌍 Environment Management

### Available Environments

The framework supports multiple environments configured via `TEST_ENV`:

- `dkirc` - DKIRC environment
- `stage` - Staging environment
- `dev` - Development environment
- `qa` - QA environment
- `prod` - Production environment

### Switching Environments

Edit `.env` file:

```dotenv
TEST_ENV=stage  # Change this to switch environments
```

## 📊 Viewing Test Results

After running tests:

```bash
# Open HTML report
npx playwright show-report
```

Reports are generated in:

- `playwright-report/` - HTML reports
- `test-results/` - Test artifacts and screenshots

## � Utility Scripts

```bash
# Install all dependencies and browsers (complete setup)
npm run setup

# Verify your setup is correct
npm run verify-setup

# Clean up test artifacts
npm run cleanup

# Full cleanup (including Playwright cache)
npm run cleanup:full

# Clean only reports
npm run cleanup:reports

# Format code with Prettier
npm run format

# Lint and fix code with ESLint
npm run lint
```

## 🐛 Debugging

### Debug a specific test

```bash
npx playwright test --debug tests/Admin/Administration/homePageValidation.spec.js
```

### Generate trace

```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### Debug with VS Code

1. Install the "Playwright Test for VSCode" extension
2. Open the Testing panel (Test tube icon in sidebar)
3. Click the debug icon next to any test

## 📝 Writing Tests

### Using Page Object Model

```javascript
import { expect, test } from '../../../fixtures/adminFixtures.js';
import HomePageValidation from '../../../pageObjects/admin/adminstration/homePageValidation.po.js';

test('My test', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const homePage = new HomePageValidation(page);

  await homePage.navigateToHomePage();
  // ... rest of test
});
```

## 🤝 Getting Help

If you encounter issues:

1. Check this README
2. Review `CI-CD-SETUP.md` for CI/CD specific setup
3. Verify all environment variables in `.env`
4. Check the error logs in `test-execution.log`
5. Contact the team

## ⚙️ Advanced Configuration

### Browser Settings

Edit `config/browser.config.js` for browser-specific settings

### Timeouts

Edit `config/environment.config.js` to adjust timeout values

### Retry Logic

Configure in `playwright.config.js`:

```javascript
retries: process.env.CI ? 2 : 0;
```
