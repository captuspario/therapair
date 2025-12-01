const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });
  
  await page.goto('https://therapair.com.au/research/survey/index.html?token=preview&v=20251114', { 
    waitUntil: 'networkidle' 
  });
  
  // Force the biggest-gap step visible
  await page.evaluate(() => {
    const textarea = document.querySelector('[name="biggest_gap"]');
    if (textarea) {
      const step = textarea.closest('.survey-step');
      if (step) {
        step.classList.add('active');
        step.style.display = 'flex';
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
  
  await page.waitForTimeout(1500);
  
  // Capture full step with context
  const step = page.locator('[data-step="biggest-gap"]');
  await step.screenshot({ 
    path: 'playwright-screenshots/biggest-gap-optimized.png',
    fullPage: false 
  });
  
  // Capture just the textarea card
  const textareaCard = page.locator('.textarea-card');
  if (await textareaCard.count() > 0) {
    await textareaCard.screenshot({ 
      path: 'playwright-screenshots/textarea-card-optimized.png' 
    });
  }
  
  console.log('Screenshots captured successfully');
  await browser.close();
})();
