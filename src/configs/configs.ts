/**
 * Configuration File
 * This file contains all the global configuration required throughout the code.
 * Don't use process.env directly inside your code, rather, use it through config.
 */

export const configs = {
  frontendURL: process.env.FRONTEND_BASE_URL,
  apiURL: process.env.API_BASE_URL,
  mongoDB: {
    host: process.env.MONGODB_HOST,
    user: process.env.MONGODB_USER,
    db: process.env.MONGODB_NAME,
    pass: process.env.MONGODB_PASS
  }
};

// TODO: Create a service to report error if any env variable is missing
