const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://therapair.com.au/research/survey/index.html?token=preview', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const textarea = document.querySelector('[name="biggest_gap"]');
    if (!textarea) {
      throw new Error('Textarea not found');
    }
    const step = textarea.closest('.survey-step');
    if (step) {
      step.classList.add('active');
      step.style.display = 'flex';
    }
  });
  const textarea = page.locator('[name="biggest_gap"]');
  await textarea.waitFor({ state: 'visible' });
  await textarea.scrollIntoViewIfNeeded();
  await textarea.screenshot({ path: 'playwright-screenshots/biggest-gap-textarea.png' });
  await browser.close();
})();
