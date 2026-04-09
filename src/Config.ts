/**
 * @project Career Page Scraper
 * @author Sam Mason
 * @file Config.js
 * @description Central configuration class for the Career Page Scraper.
 * @created 2026-03-30
 */

export const RunMode = {
  SCRAPE: 'scrape',
  DISCOVERY: 'discovery',
  FILTERS: 'filters',
};

export type RunMode = (typeof RunMode)[keyof typeof RunMode];

export const DiscoveryMode = {
  SEQUENTIAL: 'sequential',
  CONCURRENT: 'concurrent',
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

  static RUN_MODE_DEFAULT: RunMode = RunMode.SCRAPE;

  static DEPT_UID_DISCOVERY_MODE: DiscoveryMode = DiscoveryMode.CONCURRENT;

  static CONCURRENCY_LIMIT: number = 10;

  static DEPT_UID_JSON_FILEPATH = 'store/deptFilters.json';
}
