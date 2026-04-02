import type { Page } from '@playwright/test';

export default class Filter {
  public static dept = {
    CUSTOMER_SUCCESS: 'customer success',
    DESIGN: 'design',
    ENGINEERING: 'engineering',
    ENTERPRISE_TECH: 'enterprise tech',
    FINANCE: 'finance',
    FINTECH: 'fintech',
    GENERAL_AND_ADMIN: 'general & admin',
    HARDWARE: 'hardware',
    LEGAL: 'legal',
    MARKETING: 'marketing',
    PEOPLE_AND_PLACES: 'people & places',
    PRODUCT: 'product',
    RESEARCH_AND_DEVELOPMENT: 'research & development',
    SALES: 'sales',
    ENTERPRISE_SALES: 'sales : enterprise solutions',
  };

  public static country = {
    AUSTRALIA: 'australia',
    CANADA: 'canada',
    INDIA: 'india',
    IRELAND: 'ireland',
    TAIWAN: 'taiwan',
    UNITED_KINGDOM: 'united kingdom',
    UNITED_STATES: 'united states',
  };

  public static state = {
    ALABAMA: 'alabama',
    ARIZONA: 'arizona',
    CALIFORNIA: 'california',
    COLORADO: 'colorado',
    CONNECTICUT: 'connecticut',
    COUNTY_DUBLIN: 'county dublin',
    DELAWARE: 'delaware',
    DISTRICT_OF_COLOMBIA: 'district of columbia',
    ENGLAND: 'england',
    FLORIDA: 'florida',
    GEORGIA: 'georgia',
    HAWAII: 'hawaii',
    ILLINOIS: 'illinois',
    INDIANA: 'indiana',
    KARNATAKA: 'karnataka',
    LOUISIANA: 'louisiana',
    MAINE: 'maine',
    MARYLAND: 'maryland',
    MASSACHUSETTES: 'massachusetts',
    MICHIGAN: 'michigan',
    MISSISSIPPI: 'mississippi',
    MISSOURI: 'missouri',
    NEBRASKA: 'nebraska',
    NEVADA: 'nevada',
    NEW_JERSEY: 'new jersey',
    NEW_SOUTH_WALES: 'new south wales',
    NEW_YORK: 'new york',
    NORTH_CAROLINA: 'north carolina',
    OHIO: 'ohio',
    ONTARIO: 'ontario',
    OREGON: 'oregon',
    PENNSYLVANIA: 'pennsylvania',
    SOUTH_CAROLINA: 'south carolina',
    SOUTH_DAKOTA: 'south dakota',
    TAIPEI_CITY: 'taipei city',
    TAMIL_NADU: 'tamil nadu',
    TENNESSEE: 'tennessee',
    TEXAS: 'texas',
    UTAH: 'utah',
    VERMONT: 'vermont',
    VIRGINIA: 'virginia',
    WASHINGTON: 'washington',
  };

  static async getFilters(page: Page): Promise<string[]> {
    const departments = page.locator('.job-search-list-item-label');

    const deptNames = (await departments.allTextContents()).map((dept) =>
      dept.trim().toLowerCase()
    );

    return deptNames;
  }
}
