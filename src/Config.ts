/**
 * @project Career Page Scraper
 * @author Sam Mason
 * @file Config.js
 * @description Central configuration class for the Career Page Scraper.
 * @created 2026-03-30
 */

export const DiscoveryMode = {
  sequential: 'SEQUENTIAL',
  concurrent: 'CONCURRENT',
} as const;

export type DiscoveryMode = (typeof DiscoveryMode)[keyof typeof DiscoveryMode];

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

  static DEPT_UID_DISCOVERY_ENABLED: boolean = false;

  static GET_FILTER_NAMES_ENABLED: boolean = true;

  static DEPT_UID_DISCOVERY_MODE: DiscoveryMode = DiscoveryMode.concurrent;

  static CONCURRENCY_LIMIT: number = 10;

  static DEPT_UID_JSON_FILEPATH = 'store/deptFilters.json';
}
