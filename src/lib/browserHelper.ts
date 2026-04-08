import Config from '#src/Config.ts';
import { chromium, type Browser } from '@playwright/test';

export const launchPage = async () => {
  // Launch browser and initialize page
  const browser: Browser = await chromium.launch({
    headless: Config.HEADLESS,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  return { browser, page };
};
