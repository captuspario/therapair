import { test, expect } from '@playwright/test';

const SANDBOX_URL = process.env.SANDBOX_URL || 'https://therapair.com.au/sandbox/sandbox-demo.html';

test.describe('Sandbox Feedback CTA Position', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SANDBOX_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Wait for widget to initialize
  });

  test('CTA button is positioned on lower right side', async ({ page }) => {
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await expect(ctaButton).toBeVisible({ timeout: 5000 });
    
    // Get button position
    const position = await ctaButton.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        bottom: window.innerHeight - rect.bottom,
        right: window.innerWidth - rect.right,
        left: rect.left
      };
    });
    
    console.log('CTA Position:', position);
    
    // Should be on the right side (right margin < 50px)
    expect(position.right).toBeLessThan(50);
    expect(position.right).toBeGreaterThan(15); // Should have some margin
    
    // Should be at bottom (bottom margin < 50px)
    expect(position.bottom).toBeLessThan(50);
    expect(position.bottom).toBeGreaterThan(15); // Should have some margin
    
    // Should NOT be on left side (left should be > 50% of screen)
    expect(position.left).toBeGreaterThan(window.innerWidth * 0.5);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/sandbox-cta-right-position.png',
      fullPage: true
    });
  });

  test('CTA button is floating (not touching edges)', async ({ page }) => {
    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await expect(ctaButton).toBeVisible({ timeout: 5000 });
    
    const margins = await page.evaluate(() => {
      const button = document.getElementById('sandbox-feedback-toggle-btn');
      if (!button) return null;
      const rect = button.getBoundingClientRect();
      return {
        bottomMargin: window.innerHeight - rect.bottom,
        rightMargin: window.innerWidth - rect.right
      };
    });
    
    expect(margins).not.toBeNull();
    // Should have margins (not touching edges)
    expect(margins.bottomMargin).toBeGreaterThan(15);
    expect(margins.rightMargin).toBeGreaterThan(15);
    
    console.log('CTA Margins:', margins);
  });

  test('CTA matches unison widget style', async ({ page }) => {
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await expect(ctaButton).toBeVisible({ timeout: 5000 });
    
    const styles = await ctaButton.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        borderRadius: computed.borderRadius,
        display: computed.display,
        alignItems: computed.alignItems
      };
    });
    
    // Should match unison style
    expect(styles.position).toBe('static'); // Inside fixed container
    expect(styles.borderRadius).toContain('30'); // Rounded corners
    expect(styles.display).toBe('flex');
    expect(styles.alignItems).toBe('center');
    
    console.log('CTA Styles:', styles);
  });

  test('modal opens above button', async ({ page }) => {
    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await expect(ctaButton).toBeVisible({ timeout: 5000 });
    await ctaButton.click();
    await page.waitForTimeout(500);
    
    const modal = page.locator('#sandbox-feedback-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });
    
    // Get positions
    const positions = await page.evaluate(() => {
      const button = document.getElementById('sandbox-feedback-toggle-btn');
      const modal = document.getElementById('sandbox-feedback-modal');
      if (!button || !modal) return null;
      
      const buttonRect = button.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();
      
      return {
        buttonBottom: buttonRect.bottom,
        modalBottom: modalRect.bottom,
        buttonRight: buttonRect.right,
        modalRight: modalRect.right,
        modalDisplay: window.getComputedStyle(modal).display
      };
    });
    
    expect(positions).not.toBeNull();
    expect(positions.modalDisplay).toBe('block');
    
    // Modal should be above button
    expect(positions.modalBottom).toBeLessThan(positions.buttonBottom);
    
    // Modal should align with button on right (within 100px is acceptable)
    const rightDiff = Math.abs(positions.modalRight - positions.buttonRight);
    expect(rightDiff).toBeLessThan(100); // More lenient for responsive layouts
    
    await page.screenshot({ 
      path: 'playwright-screenshots/sandbox-modal-position.png',
      fullPage: false
    });
  });
});

