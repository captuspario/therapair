const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://therapair.com.au/research/survey/index.html?token=preview', { waitUntil: 'networkidle' });
  await page.waitForSelector('[name="biggest_gap"]', { state: 'visible' });
  const textarea = await page.locator('[name="biggest_gap"]');
  await textarea.scrollIntoViewIfNeeded();
  await textarea.screenshot({ path: 'playwright-screenshots/biggest-gap-textarea.png' });
  await browser.close();
})();
