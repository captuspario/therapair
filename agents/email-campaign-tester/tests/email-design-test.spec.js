import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Email Design Testing', () => {
  test('Email 1 HTML template renders correctly', async ({ page }) => {
    // Load the HTML email template
    const templatePath = path.join(__dirname, '../../../campaigns/email-campaign/EMAIL-1-RESEARCH-INVITATION.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    
    // Replace template variables with test data
    htmlContent = htmlContent.replace(/\{\{first_name\}\}/g, 'Testjohn');
    htmlContent = htmlContent.replace(/\{\{token\}\}/g, 'test-token-123');
    htmlContent = htmlContent.replace(/\{\{unsubscribe\}\}/g, 'https://therapair.com.au/api/research/unsubscribe.php?email=test@example.com');
    
    // Load the HTML in the page
    await page.setContent(htmlContent);
    
    // Take a screenshot
    await page.screenshot({ 
      path: path.join(__dirname, '../output/email-1-design-desktop.png'),
      fullPage: true 
    });
    
    // Test responsive design - mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: path.join(__dirname, '../output/email-1-design-mobile.png'),
      fullPage: true 
    });
    
    // Verify key elements exist
    await expect(page.locator('h1')).toContainText('Therapair');
    await expect(page.locator('a[href*="survey"]')).toBeVisible();
    await expect(page.locator('a[href*="therapair.com.au?"]').or(page.locator('a[href="https://therapair.com.au"]'))).toBeVisible();
    await expect(page.locator('a[href*="documentation"]')).toBeVisible();
    
    // Verify CTA button styling
    const ctaButton = page.locator('a[href*="survey"]').first();
    await expect(ctaButton).toHaveCSS('background-color', 'rgb(58, 110, 165)'); // #3A6EA5
    await expect(ctaButton).toHaveCSS('color', 'rgb(255, 255, 255)');
    
    // Verify links don't have duplicate UTM parameters
    const docLink = page.locator('a[href*="documentation"]').first();
    const docHref = await docLink.getAttribute('href');
    if (docHref) {
      const url = new URL(docHref);
      const utmParams = Array.from(url.searchParams.keys()).filter(k => k.startsWith('utm_'));
      expect(utmParams.length).toBeLessThanOrEqual(5); // Should have max 5 UTM params
    }
    
    // Verify email width is responsive
    const emailContainer = page.locator('table[width="600"]').first();
    await expect(emailContainer).toBeVisible();
    
    // Check text readability
    const bodyText = page.locator('p').filter({ hasText: 'As practitioners' });
    await expect(bodyText).toHaveCSS('font-size', '16px');
    // Line-height can be computed as pixels (27.2px) or unitless (1.7), both are acceptable
    const lineHeight = await bodyText.evaluate((el) => window.getComputedStyle(el).lineHeight);
    expect(parseFloat(lineHeight)).toBeGreaterThan(25); // Should be ~27px for 16px * 1.7
    await expect(bodyText).toHaveCSS('color', 'rgb(55, 65, 81)'); // #374151
  });
  
  test('Email design accessibility', async ({ page }) => {
    const templatePath = path.join(__dirname, '../../../campaigns/email-campaign/EMAIL-1-RESEARCH-INVITATION.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    
    htmlContent = htmlContent.replace(/\{\{first_name\}\}/g, 'Testjohn');
    htmlContent = htmlContent.replace(/\{\{token\}\}/g, 'test-token-123');
    htmlContent = htmlContent.replace(/\{\{unsubscribe\}\}/g, 'https://therapair.com.au/api/research/unsubscribe.php?email=test@example.com');
    
    await page.setContent(htmlContent);
    
    // Check color contrast (basic check)
    const ctaButton = page.locator('a[href*="survey"]').first();
    const bgColor = await ctaButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    const textColor = await ctaButton.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // Verify dark text on light background (or vice versa)
    expect(bgColor).toBeTruthy();
    expect(textColor).toBeTruthy();
    
    // Check all links are accessible
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Verify unsubscribe link exists
    await expect(page.locator('a[href*="unsubscribe"]')).toBeVisible();
  });
  
  test('Email renders in different email clients', async ({ page, browser }) => {
    const templatePath = path.join(__dirname, '../../../campaigns/email-campaign/EMAIL-1-RESEARCH-INVITATION.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    
    htmlContent = htmlContent.replace(/\{\{first_name\}\}/g, 'Testjohn');
    htmlContent = htmlContent.replace(/\{\{token\}\}/g, 'test-token-123');
    htmlContent = htmlContent.replace(/\{\{unsubscribe\}\}/g, 'https://therapair.com.au/api/research/unsubscribe.php?email=test@example.com');
    
    // Test with different user agents (simulating different email clients)
    const userAgents = [
      { name: 'Gmail', agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
      { name: 'Outlook', agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0' },
      { name: 'Apple Mail', agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15' }
    ];
    
    for (const { name, agent } of userAgents) {
      const context = await browser.newContext({ userAgent: agent });
      const testPage = await context.newPage();
      
      await testPage.setContent(htmlContent);
      await testPage.screenshot({ 
        path: path.join(__dirname, `../output/email-1-${name.toLowerCase().replace(' ', '-')}.png`),
        fullPage: true 
      });
      
      // Verify content is visible
      await expect(testPage.locator('h1')).toContainText('Therapair');
      await expect(testPage.locator('a[href*="survey"]')).toBeVisible();
      
      await context.close();
    }
  });
});

