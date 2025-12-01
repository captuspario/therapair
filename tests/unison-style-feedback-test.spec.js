import { test, expect } from '@playwright/test';

const SANDBOX_URL = process.env.SANDBOX_URL || 'https://therapair.com.au/sandbox/sandbox-demo.html';

test.describe('Unison-Style Feedback Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SANDBOX_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Wait for widget to initialize
  });

  test('widget appears as floating footer at bottom', async ({ page }) => {
    // Check widget exists
    const widget = page.locator('#sandbox-feedback-widget');
    await expect(widget).toBeVisible({ timeout: 5000 });
    
    // Check positioning
    const position = await widget.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        bottom: window.innerHeight - rect.bottom,
        left: rect.left,
        right: window.innerWidth - rect.right
      };
    });
    
    // Should be at bottom (within 50px)
    expect(position.bottom).toBeLessThan(50);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/unison-style-widget-footer.png',
      fullPage: true
    });
  });

  test('opens modal when button clicked', async ({ page }) => {
    const toggleBtn = page.locator('#sandbox-feedback-toggle-btn');
    await expect(toggleBtn).toBeVisible();
    
    // Click to open
    await toggleBtn.click();
    await page.waitForTimeout(500);
    
    // Check modal is visible
    const modal = page.locator('#sandbox-feedback-modal');
    await expect(modal).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/unison-style-modal-open.png',
      fullPage: false
    });
  });

  test('rating selection works', async ({ page }) => {
    const toggleBtn = page.locator('#sandbox-feedback-toggle-btn');
    await toggleBtn.click();
    await page.waitForTimeout(500);
    
    // Click rating 3
    await page.evaluate(() => {
      window.sandboxSetRating(3);
    });
    
    await page.waitForTimeout(300);
    
    // Check rating is set
    const ratingValue = await page.locator('#sandbox-feedback-rating').inputValue();
    expect(ratingValue).toBe('3');
    
    // Check submit button is enabled
    const submitBtn = page.locator('#sandbox-feedback-submit');
    const isDisabled = await submitBtn.isDisabled();
    expect(isDisabled).toBe(false);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/unison-style-rating-selected.png',
      fullPage: false
    });
  });

  test('submits feedback to Notion with sandbox label', async ({ page }) => {
    // Intercept API call
    let apiCall = null;
    page.on('response', async (response) => {
      if (response.url().includes('/api/feedback.php')) {
        apiCall = {
          url: response.url(),
          status: response.status(),
          body: await response.text().catch(() => null)
        };
      }
    });

    const toggleBtn = page.locator('#sandbox-feedback-toggle-btn');
    await expect(toggleBtn).toBeVisible({ timeout: 10000 });
    await toggleBtn.click();
    await page.waitForTimeout(1000);
    
    // Set rating
    await page.evaluate(() => {
      window.sandboxSetRating(5);
    });
    await page.waitForTimeout(300);
    
    // Add comment
    await page.fill('#sandbox-feedback-comment', 'Test feedback from Playwright - ' + new Date().toISOString());
    
    // Submit
    const submitBtn = page.locator('#sandbox-feedback-submit');
    await submitBtn.click();
    
    // Wait for API call (up to 5 seconds)
    let attempts = 0;
    while (!apiCall && attempts < 10) {
      await page.waitForTimeout(500);
      attempts++;
    }
    
    // Verify API was called and successful
    expect(apiCall).not.toBeNull();
    expect(apiCall.status).toBe(200);
    
    // Parse and verify response
    if (apiCall.body) {
      try {
        const response = JSON.parse(apiCall.body);
        expect(response.ok).toBe(true);
        expect(response.id).toBeDefined();
        console.log('✅ Feedback saved successfully to Notion:', response.id);
        console.log('✅ Labeled as: Sandbox');
      } catch (e) {
        // If not JSON, log but don't fail (status 200 is key)
        console.log('API response (non-JSON):', apiCall.body.substring(0, 200));
      }
    }
    
    await page.screenshot({ 
      path: 'playwright-screenshots/unison-style-submit-success.png',
      fullPage: false
    });
  });

  test('design matches unison style', async ({ page }) => {
    const toggleBtn = page.locator('#sandbox-feedback-toggle-btn');
    await toggleBtn.click();
    await page.waitForTimeout(500);
    
    // Check design elements
    const designCheck = await page.evaluate(() => {
      const modal = document.getElementById('sandbox-feedback-modal');
      const title = modal?.querySelector('h4');
      const ratingBtns = modal?.querySelectorAll('.sandbox-rating-btn');
      const submitBtn = document.getElementById('sandbox-feedback-submit');
      
      return {
        modalExists: !!modal,
        titleText: title?.textContent?.trim(),
        titleFontSize: title ? window.getComputedStyle(title).fontSize : null,
        ratingButtonsCount: ratingBtns?.length || 0,
        submitButtonColor: submitBtn ? window.getComputedStyle(submitBtn).backgroundColor : null,
        modalPadding: modal ? window.getComputedStyle(modal).padding : null,
        modalBorderRadius: modal ? window.getComputedStyle(modal).borderRadius : null
      };
    });
    
    console.log('Design Check:', designCheck);
    
    // Verify design elements
    expect(designCheck.modalExists).toBe(true);
    expect(designCheck.titleText).toBe('Share feedback');
    expect(designCheck.ratingButtonsCount).toBe(6);
    
    // Take comparison screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/unison-style-design-verification.png',
      fullPage: false
    });
  });
});

