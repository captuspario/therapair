import { test, expect } from '@playwright/test';

const SANDBOX_URL = process.env.SANDBOX_URL || 'https://therapair.com.au/sandbox/sandbox-demo.html';

test.describe('Sandbox Feedback Page Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SANDBOX_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Wait for widget to initialize
  });

  test('tracks page context when opening feedback modal', async ({ page }) => {
    let apiCall = null;
    
    // Intercept API call
    page.on('response', async (response) => {
      if (response.url().includes('/sandbox/api/feedback.php')) {
        const request = response.request();
        if (request.method() === 'POST') {
          const postData = request.postDataJSON();
          apiCall = {
            url: response.url(),
            status: response.status(),
            body: postData
          };
        }
      }
    });

    // Wait for widget
    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    
    // Open modal
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await ctaButton.click();
    await page.waitForTimeout(500);
    
    // Check modal is open
    const modal = page.locator('#sandbox-feedback-modal');
    await expect(modal).toBeVisible();
    
    // Verify page context was captured (check in console logs or stored variable)
    const contextCaptured = await page.evaluate(() => {
      // Check if context was stored (window.sandboxFeedbackPageContext or similar)
      return typeof window.feedbackPageContext !== 'undefined' || 
             (typeof window.sandboxFeedbackPageContext !== 'undefined');
    });
    
    console.log('Context captured:', contextCaptured);
    
    // Select rating and submit
    await page.evaluate(() => {
      window.sandboxSetRating(5);
    });
    await page.waitForTimeout(200);
    
    const commentTextarea = page.locator('#sandbox-feedback-comment');
    await commentTextarea.fill('Test feedback with page tracking');
    
    const submitBtn = page.locator('#sandbox-feedback-submit');
    await submitBtn.click();
    await page.waitForTimeout(2000);
    
    // Verify API was called with page context
    expect(apiCall).not.toBeNull();
    expect(apiCall.body).toHaveProperty('page_url');
    expect(apiCall.body).toHaveProperty('section');
    
    // Check if step tracking is included (if on questionnaire step)
    if (apiCall.body.current_step) {
      expect(apiCall.body).toHaveProperty('current_step');
      expect(apiCall.body).toHaveProperty('total_steps');
      console.log('Step tracking:', {
        step: apiCall.body.current_step,
        total: apiCall.body.total_steps,
        question_id: apiCall.body.question_id
      });
    }
    
    console.log('API Payload:', JSON.stringify(apiCall.body, null, 2));
  });

  test('tracks step/question when feedback submitted during questionnaire', async ({ page }) => {
    let apiCall = null;
    
    page.on('response', async (response) => {
      if (response.url().includes('/sandbox/api/feedback.php')) {
        const request = response.request();
        if (request.method() === 'POST') {
          const postData = request.postDataJSON();
          apiCall = postData;
        }
      }
    });

    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    // Should be on first step/question
    const stepIndicator = page.locator('#progressCounter');
    await expect(stepIndicator).toContainText('1 of');
    
    // Open feedback modal
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await ctaButton.click();
    await page.waitForTimeout(500);
    
    // Submit feedback
    await page.evaluate(() => {
      window.sandboxSetRating(4);
    });
    await page.waitForTimeout(200);
    
    const submitBtn = page.locator('#sandbox-feedback-submit');
    await submitBtn.click();
    await page.waitForTimeout(2000);
    
    // Verify step tracking
    expect(apiCall).not.toBeNull();
    expect(apiCall.current_step).toBe(1); // First step
    expect(apiCall.section).toBe('questionnaire');
    expect(apiCall.question_id).toBeTruthy();
    expect(apiCall.question_text).toBeTruthy();
    
    console.log('Question tracking:', {
      step: apiCall.current_step,
      question_id: apiCall.question_id,
      question_text: apiCall.question_text,
      section: apiCall.section
    });
  });

  test('tracks scroll position and viewport', async ({ page }) => {
    let apiCall = null;
    
    page.on('response', async (response) => {
      if (response.url().includes('/sandbox/api/feedback.php')) {
        const request = response.request();
        if (request.method() === 'POST') {
          apiCall = request.postDataJSON();
        }
      }
    });

    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    
    // Scroll down a bit
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await page.waitForTimeout(500);
    
    // Open and submit feedback
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await ctaButton.click();
    await page.waitForTimeout(500);
    
    await page.evaluate(() => {
      window.sandboxSetRating(3);
    });
    await page.waitForTimeout(200);
    
    const submitBtn = page.locator('#sandbox-feedback-submit');
    await submitBtn.click();
    await page.waitForTimeout(2000);
    
    // Verify scroll tracking
    expect(apiCall).not.toBeNull();
    expect(apiCall).toHaveProperty('scroll_percent');
    expect(apiCall.scroll_percent).toBeGreaterThanOrEqual(0);
    expect(apiCall.scroll_percent).toBeLessThanOrEqual(100);
    
    console.log('Scroll tracking:', {
      scroll_percent: apiCall.scroll_percent,
      viewport_height: apiCall.viewport_height
    });
  });
});





