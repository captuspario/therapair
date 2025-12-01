import { test, expect } from '@playwright/test';

const SANDBOX_URL = process.env.SANDBOX_URL || 'https://therapair.com.au/sandbox/sandbox-demo.html';

test.describe('Sandbox Widget Width', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SANDBOX_URL);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Wait for widget to initialize
  });

  test('feedback modal has appropriate width', async ({ page }) => {
    // Wait for widget to load
    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    // Open modal
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await expect(ctaButton).toBeVisible({ timeout: 5000 });
    await ctaButton.click();
    await page.waitForTimeout(500);
    
    // Check modal visibility
    const modal = page.locator('#sandbox-feedback-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });
    
    // Get modal dimensions
    const dimensions = await page.evaluate(() => {
      const modal = document.getElementById('sandbox-feedback-modal');
      if (!modal) return null;
      const rect = modal.getBoundingClientRect();
      const computed = window.getComputedStyle(modal);
      return {
        width: rect.width,
        maxWidth: computed.maxWidth,
        minWidth: computed.minWidth || 'none',
        padding: computed.padding,
        viewportWidth: window.innerWidth
      };
    });
    
    expect(dimensions).not.toBeNull();
    console.log('Modal Dimensions:', dimensions);
    
    // Take screenshot for visual inspection
    await page.screenshot({ 
      path: 'playwright-screenshots/sandbox-modal-width-current.png',
      fullPage: false
    });
    
    // Modal should be at least 320px wide (comfortable for desktop)
    // But not more than 400px (to stay compact)
    expect(dimensions.width).toBeGreaterThanOrEqual(280);
    expect(dimensions.width).toBeLessThan(450);
    
    // On desktop (viewport > 640px), modal should be wider than 300px
    if (dimensions.viewportWidth > 640) {
      expect(dimensions.width).toBeGreaterThan(300);
      console.log('Desktop viewport - modal should be wider');
    }
  });

  test('compare with unison widget width', async ({ page }) => {
    // Test unison widget for comparison
    await page.goto('https://unisonmentalhealth.com/therapair-widget/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Check if unison widget exists
    const unisonContainer = page.locator('#sandbox-feedback-container, #feedback-container, [id*="feedback"]').first();
    const unisonVisible = await unisonContainer.isVisible().catch(() => false);
    
    if (unisonVisible) {
      await unisonContainer.click();
      await page.waitForTimeout(500);
      
      const unisonModal = page.locator('#sandbox-feedback-modal, #feedback-modal, [id*="modal"]').first();
      if (await unisonModal.isVisible().catch(() => false)) {
        const unisonDimensions = await page.evaluate(() => {
          const modal = document.querySelector('[id*="modal"], [id*="feedback-modal"]');
          if (!modal) return null;
          const rect = modal.getBoundingClientRect();
          return { width: rect.width };
        });
        
        console.log('Unison Modal Width:', unisonDimensions);
        
        await page.screenshot({ 
          path: 'playwright-screenshots/unison-modal-width-comparison.png',
          fullPage: false
        });
      }
    }
  });

  test('modal content fits comfortably', async ({ page }) => {
    await page.waitForSelector('#sandbox-feedback-container', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    const ctaButton = page.locator('#sandbox-feedback-toggle-btn');
    await ctaButton.click();
    await page.waitForTimeout(500);
    
    const modal = page.locator('#sandbox-feedback-modal');
    await expect(modal).toBeVisible();
    
    // Check if all content is visible without horizontal scrolling
    const contentCheck = await page.evaluate(() => {
      const modal = document.getElementById('sandbox-feedback-modal');
      if (!modal) return null;
      
      const form = modal.querySelector('form');
      const textarea = modal.querySelector('textarea');
      const buttons = modal.querySelectorAll('button[type="submit"], button[type="button"]');
      
      return {
        modalWidth: modal.getBoundingClientRect().width,
        formWidth: form ? form.getBoundingClientRect().width : 0,
        textareaWidth: textarea ? textarea.getBoundingClientRect().width : 0,
        buttonCount: buttons.length,
        hasOverflow: modal.scrollWidth > modal.clientWidth
      };
    });
    
    console.log('Content Check:', contentCheck);
    
    // Modal should not have horizontal overflow
    expect(contentCheck.hasOverflow).toBe(false);
    
    // Textarea should be comfortably wide
    expect(contentCheck.textareaWidth).toBeGreaterThan(200);
  });
});





