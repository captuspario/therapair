import { test, expect } from '@playwright/test';

test.describe('Button Spacing Verification', () => {

  test('should verify improved button spacing and alignment', async ({ page }) => {
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

    // Wait for results
    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(3000);

    // Take screenshot after improvements
    await page.screenshot({ path: 'tests/button-spacing-fixed.png', fullPage: true });

    console.log('--- Verifying Button Spacing Improvements ---');

    const cards = await page.locator('.therapist-card').all();
    console.log(`Testing ${cards.length} cards`);

    const measurements = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Get card and button container measurements
      const cardBox = await card.boundingBox();
      const buttonContainer = card.locator('.card-buttons');
      const buttonContainerBox = await buttonContainer.boundingBox();

      // Calculate bottom distance
      const bottomDistance = cardBox ? (cardBox.y + cardBox.height) - (buttonContainerBox.y + buttonContainerBox.height) : 0;

      // Get button gaps
      const buttons = await card.locator('.card-buttons button, .card-buttons span').all();
      const gaps = [];

      for (let j = 1; j < buttons.length; j++) {
        const prevButton = buttons[j - 1];
        const currentButton = buttons[j];
        const prevBox = await prevButton.boundingBox();
        const currentBox = await currentButton.boundingBox();

        if (prevBox && currentBox) {
          const gap = currentBox.y - (prevBox.y + prevBox.height);
          gaps.push(gap);
        }
      }

      measurements.push({
        name: therapistName,
        cardHeight: cardBox ? cardBox.height : 0,
        bottomDistance: Math.round(bottomDistance),
        gaps: gaps.map(g => Math.round(g)),
        buttonCount: buttons.length
      });

      console.log(`${therapistName}: Height=${Math.round(cardBox.height)}px, Bottom=${Math.round(bottomDistance)}px, Gaps=[${gaps.map(g => Math.round(g)).join(',')}]px`);
    }

    // Verify improvements
    console.log('\n--- Verification Results ---');

    // Check bottom distance consistency
    const bottomDistances = measurements.map(m => m.bottomDistance);
    const uniqueBottomDistances = [...new Set(bottomDistances)];
    const maxBottomDiff = Math.max(...bottomDistances) - Math.min(...bottomDistances);

    console.log(`Bottom distances: ${bottomDistances.join(', ')}px`);
    console.log(`Bottom distance difference: ${maxBottomDiff}px`);

    // Should be much more consistent now
    expect(maxBottomDiff).toBeLessThan(10); // Improved from 68px to <10px
    console.log('✓ Button containers consistently positioned at bottom');

    // Check gap consistency
    const allGaps = measurements.flatMap(m => m.gaps);
    const uniqueGaps = [...new Set(allGaps)];

    console.log(`Button gaps: ${uniqueGaps.join(', ')}px`);

    // All gaps should be 12px (0.75rem)
    for (const gap of allGaps) {
      expect(gap).toBeGreaterThanOrEqual(11);
      expect(gap).toBeLessThanOrEqual(13);
    }
    console.log('✓ Button gaps are consistent (12px)');

    // Check card height consistency
    const cardHeights = measurements.map(m => m.cardHeight);
    const heightDiff = Math.max(...cardHeights) - Math.min(...cardHeights);

    console.log(`Card height difference: ${Math.round(heightDiff)}px`);

    // Should be better than before
    expect(heightDiff).toBeLessThan(60); // Reasonable tolerance
    console.log('✓ Card heights are reasonably consistent');

    console.log('\n✅ All button spacing improvements verified!');
  });

  test('should verify button styling consistency', async ({ page }) => {
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

    // Check button height consistency
    const allButtons = await page.locator('.btn-secondary, .btn-book').all();
    const buttonHeights = [];

    for (const button of allButtons) {
      const buttonBox = await button.boundingBox();
      if (buttonBox) {
        buttonHeights.push(buttonBox.height);
      }
    }

    const uniqueHeights = [...new Set(buttonHeights.map(h => Math.round(h)))];
    console.log(`Button heights: ${uniqueHeights.join(', ')}px`);

    // All buttons should be 48px
    expect(uniqueHeights.length).toBe(1);
    expect(uniqueHeights[0]).toBe(48);

    console.log('✓ All buttons have consistent 48px height');

    // Check button container padding
    const buttonContainer = page.locator('.card-buttons').first();
    const containerStyles = await buttonContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        paddingBottom: computed.paddingBottom,
        gap: computed.gap
      };
    });

    console.log(`Container styles: gap=${containerStyles.gap}, paddingBottom=${containerStyles.paddingBottom}`);

    expect(containerStyles.gap).toBe('12px');
    expect(containerStyles.paddingBottom).toBe('24px');

    console.log('✓ Button container has correct padding and gap');
  });
});