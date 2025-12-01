const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://therapair.com.au/research/survey/index.html?token=preview', { waitUntil: 'networkidle' });
  
  // Force the biggest-gap step visible
  await page.evaluate(() => {
    const textarea = document.querySelector('[name="biggest_gap"]');
    if (textarea) {
      const step = textarea.closest('.survey-step');
      if (step) {
        step.classList.add('active');
        step.style.display = 'flex';
        // Scroll into view
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Capture full step
  const step = page.locator('[data-step="biggest-gap"]');
  await step.screenshot({ path: 'playwright-screenshots/biggest-gap-full-step.png', fullPage: false });
  
  // Capture just the textarea card
  const textareaCard = page.locator('.textarea-card');
  if (await textareaCard.count() > 0) {
    await textareaCard.screenshot({ path: 'playwright-screenshots/biggest-gap-card-only.png' });
  }
  
  // Get computed styles for analysis
  const styles = await page.evaluate(() => {
    const card = document.querySelector('.textarea-card');
    const textarea = document.querySelector('[name="biggest_gap"]');
    if (!card || !textarea) return null;
    
    const cardStyles = window.getComputedStyle(card);
    const textareaStyles = window.getComputedStyle(textarea);
    
    return {
      card: {
        padding: cardStyles.padding,
        margin: cardStyles.margin,
        borderRadius: cardStyles.borderRadius,
        fontSize: cardStyles.fontSize,
        lineHeight: cardStyles.lineHeight,
      },
      textarea: {
        padding: textareaStyles.padding,
        minHeight: textareaStyles.minHeight,
        fontSize: textareaStyles.fontSize,
        lineHeight: textareaStyles.lineHeight,
        borderRadius: textareaStyles.borderRadius,
      }
    };
  });
  
  console.log('Current styles:', JSON.stringify(styles, null, 2));
  
  await browser.close();
})();
