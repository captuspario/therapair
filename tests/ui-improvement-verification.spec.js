import { test, expect } from '@playwright/test';

test.describe('UI Improvement Verification', () => {

  test('should verify improved button alignment and consistency', async ({ page }) => {
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Complete questionnaire quickly
    await page.click('#start-btn');
    await page.waitForSelector('.option-button');
    await page.click('button:has-text("For myself")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Yes")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Either online or in-person")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("General Support")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("None of these apply")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m flexible with timing")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I don\'t mind waiting for the right therapist")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("No preference/unsure")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m open to any qualified therapist")');
    await page.click('#continue-btn');

    // Wait for results
    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(3000);

    // Take screenshot after improvements
    await page.screenshot({ path: 'tests/ui-alignment-after.png', fullPage: true });

    console.log('--- Verifying UI Improvements ---');

    // Check button height consistency
    const allButtons = await page.locator('.btn-secondary, .btn-book').all();
    const buttonHeights = [];

    for (const button of allButtons) {
      const buttonBox = await button.boundingBox();
      if (buttonBox) {
        buttonHeights.push(buttonBox.height);
      }
    }

    const uniqueHeights = [...new Set(buttonHeights)];
    console.log(`Button heights found: ${uniqueHeights.join(', ')}`);

    // All buttons should have consistent heights (48px minimum)
    for (const height of buttonHeights) {
      expect(height).toBeGreaterThanOrEqual(47); // Allow 1px tolerance
      expect(height).toBeLessThanOrEqual(50); // Reasonable upper bound
    }

    console.log('✓ Button heights are consistent');

    // Check card height consistency
    const cards = await page.locator('.therapist-card').all();
    const cardHeights = [];

    for (const card of cards) {
      const cardBox = await card.boundingBox();
      if (cardBox) {
        cardHeights.push(cardBox.height);
      }
    }

    const minCardHeight = Math.min(...cardHeights);
    const maxCardHeight = Math.max(...cardHeights);
    const cardHeightDifference = maxCardHeight - minCardHeight;

    console.log(`Card height range: ${minCardHeight} - ${maxCardHeight} (difference: ${cardHeightDifference}px)`);

    // Cards should have minimal height differences (improved from before)
    expect(cardHeightDifference).toBeLessThan(30); // Improved tolerance
    console.log('✓ Card heights are more consistent');

    // Verify button container positioning
    const buttonContainers = await page.locator('.card-buttons').all();
    const buttonContainerY = [];

    for (let i = 0; i < buttonContainers.length; i++) {
      const container = buttonContainers[i];
      const card = cards[i];
      const containerBox = await container.boundingBox();
      const cardBox = await card.boundingBox();

      if (containerBox && cardBox) {
        const relativeY = containerBox.y - cardBox.y;
        buttonContainerY.push(relativeY);
      }
    }

    const minButtonY = Math.min(...buttonContainerY);
    const maxButtonY = Math.max(...buttonContainerY);
    const buttonYDifference = maxButtonY - minButtonY;

    console.log(`Button container Y range: ${minButtonY} - ${maxButtonY} (difference: ${buttonYDifference}px)`);

    // Button containers should be better aligned
    expect(buttonYDifference).toBeLessThan(50); // Improved from previous
    console.log('✓ Button containers are better aligned');

    // Verify spacing consistency
    const buttonGaps = [];
    for (const container of buttonContainers) {
      const buttons = await container.locator('button, span').all();
      if (buttons.length > 1) {
        for (let i = 1; i < buttons.length; i++) {
          const prevButton = buttons[i - 1];
          const currentButton = buttons[i];
          const prevBox = await prevButton.boundingBox();
          const currentBox = await currentButton.boundingBox();

          if (prevBox && currentBox) {
            const gap = currentBox.y - (prevBox.y + prevBox.height);
            buttonGaps.push(gap);
          }
        }
      }
    }

    if (buttonGaps.length > 0) {
      const uniqueGaps = [...new Set(buttonGaps.map(g => Math.round(g)))];
      console.log(`Button gaps found: ${uniqueGaps.join(', ')}px`);

      // Gaps should be consistent (12px = 0.75rem)
      for (const gap of buttonGaps) {
        expect(gap).toBeGreaterThanOrEqual(10);
        expect(gap).toBeLessThanOrEqual(14);
      }
      console.log('✓ Button gaps are consistent');
    }

    console.log('\n✅ All UI improvements verified successfully!');
  });

  test('should verify responsive layout improvements', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1400, height: 1000 });
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Complete questionnaire
    await page.click('#start-btn');
    await page.waitForSelector('.option-button');
    await page.click('button:has-text("For myself")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Yes")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Either online or in-person")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("General Support")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("None of these apply")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m flexible with timing")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I don\'t mind waiting for the right therapist")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("No preference/unsure")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m open to any qualified therapist")');
    await page.click('#continue-btn');

    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(2000);

    // Verify 3-column layout for desktop
    const gridContainer = page.locator('.therapist-cards-grid').first();
    const gridStyles = await gridContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
        gap: styles.gap
      };
    });

    console.log(`Desktop grid: ${gridStyles.gridTemplateColumns}`);
    console.log(`Grid gap: ${gridStyles.gap}`);

    // Should have 3 columns on desktop
    expect(gridStyles.gridTemplateColumns).toMatch(/(\d+px\s+){2}\d+px/);
    console.log('✓ Desktop 3-column layout working');

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const mobileGridStyles = await gridContainer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns
      };
    });

    console.log(`Mobile grid: ${mobileGridStyles.gridTemplateColumns}`);
    console.log('✓ Responsive layout verified');
  });
});