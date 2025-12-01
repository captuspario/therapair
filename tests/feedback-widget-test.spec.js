import { test, expect } from '@playwright/test';

const SANDBOX_URL = process.env.SANDBOX_URL || 'http://localhost:8000/sandbox-demo.html';

test.describe('Feedback Widget', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to sandbox demo
    await page.goto(SANDBOX_URL);
    // Wait for page to load and scripts to execute
    await page.waitForLoadState('domcontentloaded');
    // Wait for custom element to be defined
    await page.waitForFunction(() => customElements.get('feedback-widget'), { timeout: 10000 });
    await page.waitForTimeout(1000); // Give widget time to initialize
  });

  test('should display 6 rating stars', async ({ page }) => {
    // Wait for feedback widget to load
    await page.waitForSelector('feedback-widget', { state: 'attached', timeout: 10000 });
    
    // Click the feedback button to open the widget (using shadow DOM)
    const widget = page.locator('feedback-widget');
    const feedbackButton = widget.locator('button.cta');
    await expect(feedbackButton).toBeVisible({ timeout: 5000 });
    await feedbackButton.click();
    
    // Wait for dialog to appear (check for open attribute)
    await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      if (!widget) return false;
      const dialog = widget.shadowRoot?.querySelector('.dialog');
      return dialog?.hasAttribute('open');
    }, { timeout: 5000 });
    
    // Count rating buttons (using shadow DOM)
    const count = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      if (!widget?.shadowRoot) return 0;
      return widget.shadowRoot.querySelectorAll('.rating-button').length;
    });
    
    console.log(`Found ${count} rating buttons`);
    
    // Take screenshot
    await page.screenshot({ path: 'playwright-screenshots/feedback-6-stars.png', fullPage: true });
    
    // Verify we have 6 stars
    expect(count).toBe(6);
    
    // Verify all 6 stars are visible
    const stars = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      if (!widget?.shadowRoot) return [];
      const buttons = Array.from(widget.shadowRoot.querySelectorAll('.rating-button'));
      return buttons.map(btn => ({
        value: btn.getAttribute('data-value'),
        visible: btn.offsetParent !== null
      }));
    });
    
    expect(stars.length).toBe(6);
    stars.forEach((star, i) => {
      expect(star.value).toBe(String(i + 1));
      expect(star.visible).toBe(true);
    });
  });

  test('should allow selecting rating 6', async ({ page }) => {
    await page.waitForSelector('feedback-widget', { state: 'attached' });
    
    // Open feedback widget
    const widget = page.locator('feedback-widget');
    const feedbackButton = widget.locator('button.cta');
    await feedbackButton.click();
    
    // Wait for dialog
    await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      return widget?.shadowRoot?.querySelector('.dialog')?.hasAttribute('open');
    }, { timeout: 5000 });
    
    // Click the 6th star
    await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const star6 = widget?.shadowRoot?.querySelector('.rating-button[data-value="6"]');
      star6?.click();
    });
    
    await page.waitForTimeout(500);
    
    // Verify 6th star is selected
    const star6State = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const star6 = widget?.shadowRoot?.querySelector('.rating-button[data-value="6"]');
      if (!star6) return null;
      return {
        ariaPressed: star6.getAttribute('aria-pressed'),
        opacity: window.getComputedStyle(star6).opacity
      };
    });
    
    expect(star6State).not.toBeNull();
    expect(star6State.ariaPressed).toBe('true');
    
    // Verify all stars 1-6 are highlighted
    const allStarsState = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const buttons = Array.from(widget?.shadowRoot?.querySelectorAll('.rating-button') || []);
      return buttons.map(btn => ({
        value: btn.getAttribute('data-value'),
        opacity: window.getComputedStyle(btn).opacity
      }));
    });
    
    allStarsState.forEach(star => {
      expect(parseFloat(star.opacity)).toBeGreaterThan(0.9);
    });
    
    await page.screenshot({ path: 'playwright-screenshots/feedback-star-6-selected.png' });
  });

  test('should submit feedback to database', async ({ page }) => {
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

    await page.waitForSelector('feedback-widget', { state: 'attached' });
    
    // Open feedback widget
    const widget = page.locator('feedback-widget');
    const feedbackButton = widget.locator('button.cta');
    await feedbackButton.click();
    
    // Wait for dialog
    await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      return widget?.shadowRoot?.querySelector('.dialog')?.hasAttribute('open');
    }, { timeout: 5000 });
    
    // Select rating 6
    await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const star6 = widget?.shadowRoot?.querySelector('.rating-button[data-value="6"]');
      star6?.click();
    });
    
    await page.waitForTimeout(500);
    
    // Submit feedback
    await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const submitButton = widget?.shadowRoot?.querySelector('button[type="submit"]');
      submitButton?.click();
    });
    
    // Wait for API call
    await page.waitForTimeout(2000);
    
    // Check console logs
    const logs = [];
    page.on('console', msg => {
      if (msg.text().includes('feedback-widget')) {
        logs.push(msg.text());
      }
    });
    
    // Verify API was called
    expect(apiCall).not.toBeNull();
    console.log('API Call:', apiCall);
    
    if (apiCall) {
      // Check if it was successful
      expect(apiCall.status).toBe(200);
      
      if (apiCall.body) {
        const response = JSON.parse(apiCall.body);
        console.log('API Response:', response);
        expect(response.ok).toBe(true);
      }
    }
    
    // Check for success message
    const hasSuccessMessage = await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      const dialog = widget?.shadowRoot?.querySelector('.dialog');
      return dialog?.textContent?.toLowerCase().includes('thanks') || 
             dialog?.textContent?.toLowerCase().includes('success');
    }, { timeout: 5000 });
    
    expect(hasSuccessMessage).toBeTruthy();
    
    await page.screenshot({ path: 'playwright-screenshots/feedback-submitted.png' });
  });

  test('should show correct star count in aria-label', async ({ page }) => {
    await page.waitForSelector('feedback-widget', { state: 'attached' });
    
    const widget = page.locator('feedback-widget');
    const feedbackButton = widget.locator('button.cta');
    await feedbackButton.click();
    
    // Wait for dialog
    await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      return widget?.shadowRoot?.querySelector('.dialog')?.hasAttribute('open');
    }, { timeout: 5000 });
    
    // Check all stars have correct aria-label
    const ariaLabels = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const buttons = Array.from(widget?.shadowRoot?.querySelectorAll('.rating-button') || []);
      return buttons.map(btn => ({
        value: btn.getAttribute('data-value'),
        ariaLabel: btn.getAttribute('aria-label')
      }));
    });
    
    expect(ariaLabels.length).toBe(6);
    ariaLabels.forEach((star, i) => {
      expect(star.value).toBe(String(i + 1));
      expect(star.ariaLabel).toBe(`${i + 1} out of 6`);
    });
  });
});

