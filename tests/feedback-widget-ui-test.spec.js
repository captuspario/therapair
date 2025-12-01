import { test, expect } from '@playwright/test';

const SANDBOX_URL = process.env.SANDBOX_URL || 'https://therapair.com.au/sandbox/sandbox-demo.html';

test.describe('Feedback Widget UI Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SANDBOX_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(() => customElements.get('feedback-widget'), { timeout: 10000 });
    await page.waitForTimeout(1000);
  });

  test('capture current widget design', async ({ page }) => {
    // Wait for widget to load
    await page.waitForSelector('feedback-widget', { state: 'attached', timeout: 10000 });
    
    // Open feedback widget
    const widget = page.locator('feedback-widget');
    const feedbackButton = widget.locator('button.cta');
    await expect(feedbackButton).toBeVisible({ timeout: 5000 });
    
    // Take screenshot of button
    await feedbackButton.screenshot({ path: 'playwright-screenshots/feedback-button-current.png' });
    
    // Click to open dialog
    await feedbackButton.click();
    
    // Wait for dialog
    await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      return widget?.shadowRoot?.querySelector('.dialog')?.hasAttribute('open');
    }, { timeout: 5000 });
    
    // Take screenshot of dialog
    await page.screenshot({ 
      path: 'playwright-screenshots/feedback-dialog-current.png',
      fullPage: false
    });
    
    // Get dialog dimensions and styles
    const dialogInfo = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const dialog = widget?.shadowRoot?.querySelector('.dialog');
      if (!dialog) return null;
      
      const styles = window.getComputedStyle(dialog);
      const rect = dialog.getBoundingClientRect();
      
      return {
        width: rect.width,
        height: rect.height,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow,
        maxWidth: styles.maxWidth
      };
    });
    
    console.log('Current Dialog Styles:', dialogInfo);
    
    // Get rating buttons info
    const ratingInfo = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const buttons = Array.from(widget?.shadowRoot?.querySelectorAll('.rating-button') || []);
      return buttons.map(btn => {
        const styles = window.getComputedStyle(btn);
        const rect = btn.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          borderRadius: styles.borderRadius,
          fontSize: styles.fontSize,
          backgroundColor: styles.backgroundColor,
          border: styles.border
        };
      });
    });
    
    console.log('Rating Buttons Info:', ratingInfo);
  });

  test('compare with unison design requirements', async ({ page }) => {
    await page.waitForSelector('feedback-widget', { state: 'attached' });
    
    const widget = page.locator('feedback-widget');
    const feedbackButton = widget.locator('button.cta');
    await feedbackButton.click();
    
    await page.waitForFunction(() => {
      const widget = document.querySelector('feedback-widget');
      return widget?.shadowRoot?.querySelector('.dialog')?.hasAttribute('open');
    }, { timeout: 5000 });
    
    // Check design elements
    const designCheck = await page.evaluate(() => {
      const widget = document.querySelector('feedback-widget');
      const dialog = widget?.shadowRoot?.querySelector('.dialog');
      const title = widget?.shadowRoot?.querySelector('.dialog-title');
      const ratingGroup = widget?.shadowRoot?.querySelector('.rating-group');
      const buttons = Array.from(widget?.shadowRoot?.querySelectorAll('.rating-button') || []);
      
      return {
        dialogExists: !!dialog,
        titleText: title?.textContent?.trim(),
        titleFontSize: title ? window.getComputedStyle(title).fontSize : null,
        ratingButtonsCount: buttons.length,
        ratingButtonSize: buttons[0] ? {
          width: buttons[0].getBoundingClientRect().width,
          height: buttons[0].getBoundingClientRect().height
        } : null,
        dialogPadding: dialog ? window.getComputedStyle(dialog.querySelector('.dialog-inner')).padding : null,
        dialogBorderRadius: dialog ? window.getComputedStyle(dialog).borderRadius : null
      };
    });
    
    console.log('Design Check:', designCheck);
    
    // Expected values based on unison design
    expect(designCheck.dialogExists).toBe(true);
    expect(designCheck.titleText).toBe('Share feedback');
    expect(designCheck.ratingButtonsCount).toBe(6);
    
    // Take comparison screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/feedback-widget-comparison.png',
      fullPage: false
    });
  });
});






