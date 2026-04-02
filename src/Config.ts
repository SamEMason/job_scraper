/**
 * @project Career Page Scraper
 * @author Sam Mason
 * @file Config.js
 * @description Central configuration class for the Career Page Scraper.
 * @created 2026-03-30
 */

/**
 * Configuration class providing global static settings for the application.
 *
 * @class
 */
export default class Config {
  static HEADLESS: boolean = false;

  static REMOTE_ENABLED: boolean = true;

  static SECOND_PASS_ENABLED: boolean = false;

  static SCRAPE_JOBS_ENABLED: boolean = false;

  static DEPT_UID_DISCOVERY_ENABLED: boolean = true;
}
