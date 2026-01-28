import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Validates that required environment variables are set
 * @param {string} env - Environment name
 * @throws {Error} If required variables are missing
 */
function validateEnvVars(env) {
  const envUpper = env.toUpperCase();
  const requiredVars = [
    `${envUpper}_ENTERPRISE_LOGIN_URL`,
    `${envUpper}_ENTERPRISE_COMPANY_ID`,
    `${envUpper}_ENTERPRISE_USERNAME`,
    `${envUpper}_ENTERPRISE_PASSWORD`,
    `${envUpper}_ADMIN_LOGIN_URL`,
    `${envUpper}_ADMIN_USERNAME`,
    `${envUpper}_ADMIN_PASSWORD`,
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `\n❌ Missing required environment variables for environment "${env}":\n` +
        `   ${missingVars.join('\n   ')}\n\n` +
        `📝 Please check your .env file and ensure:\n` +
        `   1. TEST_ENV is set to: ${env}\n` +
        `   2. All ${envUpper}_* variables are configured\n` +
        `   3. No typos in variable names\n\n` +
        `💡 See README.md for setup instructions\n`,
    );
  }
}

/**
 * Get configuration for specific environment
 * @param {string} env - Environment name (dkirc, stage, dev, qa, prod)
 * @returns {Object} Environment-specific configuration
 */
function getEnvConfig(env) {
  const envUpper = env.toUpperCase();
  validateEnvVars(env);

  return {
    enterprise: {
      baseUrl: process.env[`${envUpper}_ENTERPRISE_LOGIN_URL`],
      url: process.env[`${envUpper}_ENTERPRISE_LOGIN_URL`], // Backward compatibility
      credentials: {
        companyId: process.env[`${envUpper}_ENTERPRISE_COMPANY_ID`],
        username: process.env[`${envUpper}_ENTERPRISE_USERNAME`],
        password: process.env[`${envUpper}_ENTERPRISE_PASSWORD`],
      },
    },
    admin: {
      baseUrl: process.env[`${envUpper}_ADMIN_LOGIN_URL`],
      url: process.env[`${envUpper}_ADMIN_LOGIN_URL`], // Backward compatibility
      credentials: {
        username: process.env[`${envUpper}_ADMIN_USERNAME`],
        password: process.env[`${envUpper}_ADMIN_PASSWORD`],
      },
    },
  };
}

export const config = {
  // Current active environment
  env: process.env.TEST_ENV || 'dkirc',

  // Get current environment config
  get enterprise() {
    return getEnvConfig(this.env).enterprise;
  },

  get admin() {
    return getEnvConfig(this.env).admin;
  },

  // Access specific environment configs directly (lazily)
  get environments() {
    return {
      get dkirc() {
        return getEnvConfig('dkirc');
      },
      get stage() {
        return getEnvConfig('stage');
      },
      get dev() {
        return getEnvConfig('dev');
      },
      get qa() {
        return getEnvConfig('qa');
      },
      get prod() {
        return getEnvConfig('prod');
      },
    };
  },
};

export default config;
