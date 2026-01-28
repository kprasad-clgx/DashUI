import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Determine project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Change to project root to ensure .env is found
process.chdir(projectRoot);

// Load environment variables from project root
dotenv.config({ path: path.join(projectRoot, '.env') });

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

console.log(
  `\n${colors.bold}${colors.blue}🔍 DashUI Framework Setup Verification${colors.reset}\n`,
);

let hasErrors = false;

// Check Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
log(`${colors.bold}1. Node.js Version:${colors.reset}`);
if (majorVersion >= 18) {
  log(`   ✓ ${nodeVersion} (OK)`, colors.green);
} else if (majorVersion >= 16) {
  log(`   ⚠ ${nodeVersion} (Recommended: v18.x or later)`, colors.yellow);
} else {
  log(`   ✗ ${nodeVersion} (Required: v18.x or later)`, colors.red);
  hasErrors = true;
}
console.log('');

// Check TEST_ENV
log(`${colors.bold}2. Test Environment:${colors.reset}`);
const testEnv = process.env.TEST_ENV;
if (testEnv) {
  log(`   ✓ TEST_ENV = ${testEnv}`, colors.green);
} else {
  log(`   ✗ TEST_ENV not set in .env file`, colors.red);
  hasErrors = true;
}
console.log('');

// Check environment-specific variables
if (testEnv) {
  const envUpper = testEnv.toUpperCase();
  log(`${colors.bold}3. ${envUpper} Environment Variables:${colors.reset}`);

  const requiredVars = [
    { name: `${envUpper}_ENTERPRISE_LOGIN_URL`, label: 'Enterprise Login URL' },
    { name: `${envUpper}_ENTERPRISE_COMPANY_ID`, label: 'Enterprise Company ID' },
    { name: `${envUpper}_ENTERPRISE_USERNAME`, label: 'Enterprise Username' },
    { name: `${envUpper}_ENTERPRISE_PASSWORD`, label: 'Enterprise Password', mask: true },
    { name: `${envUpper}_ADMIN_LOGIN_URL`, label: 'Admin Login URL' },
    { name: `${envUpper}_ADMIN_USERNAME`, label: 'Admin Username' },
    { name: `${envUpper}_ADMIN_PASSWORD`, label: 'Admin Password', mask: true },
  ];

  let missingVars = [];
  requiredVars.forEach(({ name, label, mask }) => {
    const value = process.env[name];
    if (value) {
      const displayValue = mask ? '***' : value;
      log(`   ✓ ${label}: ${displayValue}`, colors.green);
    } else {
      log(`   ✗ ${label}: NOT SET`, colors.red);
      missingVars.push(name);
      hasErrors = true;
    }
  });
  console.log('');

  if (missingVars.length > 0) {
    log(`\n${colors.bold}❌ Missing Variables:${colors.reset}`, colors.red);
    console.log('');
    missingVars.forEach((varName) => {
      log(`   - ${varName}`, colors.red);
    });
    console.log('');
  }
}

// Check .env file existence
log(`${colors.bold}4. Configuration Files:${colors.reset}`);
try {
  const fs = await import('fs');
  const envPath = path.join(projectRoot, '.env');
  const envExamplePath = path.join(projectRoot, '.env.example');
  const packagePath = path.join(projectRoot, 'package.json');
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  const playwrightConfigPath = path.join(projectRoot, 'playwright.config.js');

  if (fs.existsSync(envPath)) {
    log(`   ✓ .env file exists (${envPath})`, colors.green);
  } else {
    log(`   ✗ .env file not found at: ${envPath}`, colors.red);
    if (fs.existsSync(envExamplePath)) {
      log('     💡 Run setup.ps1 or copy .env.example to .env and configure it', colors.yellow);
    } else {
      log('     💡 .env.example also missing - restore from repository', colors.yellow);
    }
    hasErrors = true;
  }

  if (fs.existsSync(packagePath)) {
    log('   ✓ package.json exists', colors.green);
  } else {
    log('   ✗ package.json not found - invalid project structure', colors.red);
    hasErrors = true;
  }

  if (fs.existsSync(nodeModulesPath)) {
    log('   ✓ node_modules folder exists (dependencies installed)', colors.green);
  } else {
    log('   ⚠ node_modules not found - run: npm install', colors.yellow);
    hasErrors = true;
  }

  if (fs.existsSync(playwrightConfigPath)) {
    log('   ✓ playwright.config.js exists', colors.green);
  } else {
    log('   ✗ playwright.config.js not found - invalid project structure', colors.red);
    hasErrors = true;
  }
} catch (error) {
  log(`   ✗ Error checking files: ${error.message}`, colors.red);
  hasErrors = true;
}
console.log('');

// Final status
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', colors.bold);
if (hasErrors) {
  log('❌ Setup has errors!\n', `${colors.bold}${colors.red}`);
  log('📝 Action Required:', colors.yellow);
  log('   1. Fix the errors listed above', colors.yellow);
  log('   2. Check your .env file configuration', colors.yellow);
  log('   3. Run: npm install (if node_modules missing)', colors.yellow);
  log('   4. Run: npm run test:install (to install browsers)', colors.yellow);
  log('   5. See README.md for detailed setup instructions\n', colors.yellow);
  process.exit(1);
} else {
  log('✅ Setup looks good!\n', `${colors.bold}${colors.green}`);
  log('🚀 Next steps:', colors.green);
  log('   1. Run: npm run test:install (if browsers not installed)', colors.green);
  log('   2. Run: npm test (to run all tests)', colors.green);
  log('   3. Run: npm run test:ui (for interactive mode)\n', colors.green);
}
