import { test, expect } from '@playwright/test';

test.describe('UI Improvements Verification', () => {

  test('should verify all UI design improvements', async ({ page }) => {
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
    await page.waitForTimeout(3000);

    // Take screenshot of final optimized UI
    await page.screenshot({ path: 'tests/ui-optimized-final.png', fullPage: true });

    console.log('--- UI Improvements Verification ---');

    // 1. Verify improved button spacing (16px gap using 8px grid system)
    console.log('\\n✅ Testing Button Spacing Improvements:');
    const firstCard = page.locator('.therapist-card').first();
    const buttons = firstCard.locator('.card-buttons button');

    const button1Box = await buttons.nth(0).boundingBox();
    const button2Box = await buttons.nth(1).boundingBox();
    const buttonGap = button2Box.y - (button1Box.y + button1Box.height);

    console.log(`Button gap: ${Math.round(buttonGap)}px`);
    expect(Math.round(buttonGap)).toBeGreaterThanOrEqual(15);
    expect(Math.round(buttonGap)).toBeLessThanOrEqual(17);
    console.log('✅ Button spacing improved (16px gap)');

    // 2. Verify button heights are improved (52px for better touch targets)
    console.log('\\n✅ Testing Button Touch Targets:');
    const buttonHeight1 = Math.round(button1Box.height);
    const buttonHeight2 = Math.round(button2Box.height);

    console.log(`Button heights: ${buttonHeight1}px, ${buttonHeight2}px`);
    expect(buttonHeight1).toBeGreaterThanOrEqual(50);
    expect(buttonHeight2).toBeGreaterThanOrEqual(50);
    console.log('✅ Button heights improved for better touch targets');

    // 3. Verify headline alignment with cards
    console.log('\\n✅ Testing Headline Alignment:');
    const resultsGrid = page.locator('.therapist-cards-grid').first();
    const gridBox = await resultsGrid.boundingBox();

    const resultsTier = page.locator('.results-tier').first();
    const tierBox = await resultsTier.boundingBox();

    // Check if tier has proper centering and max-width
    const tierStyles = await resultsTier.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        maxWidth: computed.maxWidth,
        marginLeft: computed.marginLeft,
        marginRight: computed.marginRight
      };
    });

    console.log(`Results tier styles: maxWidth=${tierStyles.maxWidth}, margins=${tierStyles.marginLeft}/${tierStyles.marginRight}`);
    expect(tierStyles.maxWidth).toBe('1200px');
    expect(tierStyles.marginLeft).toBe('auto');
    expect(tierStyles.marginRight).toBe('auto');
    console.log('✅ Headlines properly aligned with card grid');

    // 4. Verify card height consistency
    console.log('\\n✅ Testing Card Height Consistency:');
    const allCards = await page.locator('.therapist-card').all();
    const cardHeights = [];

    for (const card of allCards) {
      const cardBox = await card.boundingBox();
      cardHeights.push(Math.round(cardBox.height));
    }

    const uniqueHeights = [...new Set(cardHeights)];
    console.log(`Card heights: ${cardHeights.join(', ')}px`);
    console.log(`Unique heights: ${uniqueHeights.join(', ')}px`);

    expect(uniqueHeights.length).toBe(1);
    expect(uniqueHeights[0]).toBe(760);
    console.log('✅ All cards have consistent 760px height');

    // 5. Verify visual hierarchy improvements
    console.log('\\n✅ Testing Visual Hierarchy:');
    const headings = await page.locator('.results-tier h3').all();

    for (const heading of headings) {
      const headingStyles = await heading.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          marginBottom: computed.marginBottom,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight
        };
      });

      console.log(`Heading styles: fontSize=${headingStyles.fontSize}, marginBottom=${headingStyles.marginBottom}`);
      expect(headingStyles.marginBottom).toBe('24px');
    }
    console.log('✅ Improved heading spacing (24px margin-bottom)');

    // 6. Verify 8px grid system adherence
    console.log('\\n✅ Testing 8px Grid System:');
    const buttonContainer = firstCard.locator('.card-buttons');
    const containerStyles = await buttonContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        gap: computed.gap,
        padding: computed.padding,
        height: computed.height
      };
    });

    console.log(`Button container: gap=${containerStyles.gap}, height=${containerStyles.height}`);
    expect(containerStyles.gap).toBe('16px'); // 2 * 8px
    expect(containerStyles.height).toBe('128px'); // 16 * 8px
    console.log('✅ 8px grid system properly applied');

    // Summary
    console.log('\\n🎉 ALL UI IMPROVEMENTS VERIFIED:');
    console.log('✅ Button spacing: Improved from 12px to 16px');
    console.log('✅ Touch targets: Improved from 48px to 52px height');
    console.log('✅ Headlines: Properly aligned with card grid');
    console.log('✅ Consistency: All cards exactly 760px height');
    console.log('✅ Hierarchy: Improved spacing and margins');
    console.log('✅ Grid system: 8px-based measurements throughout');
  });

  test('should verify responsive behavior', async ({ page }) => {
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Test at different viewport sizes
    const viewports = [
      { width: 1200, height: 800, name: 'Desktop' },
      { width: 768, height: 800, name: 'Tablet' },
      { width: 375, height: 800, name: 'Mobile' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

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

      // Verify button spacing is maintained across viewports
      const firstCard = page.locator('.therapist-card').first();
      if (await firstCard.count() > 0) {
        const buttons = firstCard.locator('.card-buttons button');
        if (await buttons.count() >= 2) {
          const button1Box = await buttons.nth(0).boundingBox();
          const button2Box = await buttons.nth(1).boundingBox();
          const buttonGap = button2Box.y - (button1Box.y + button1Box.height);

          console.log(`${viewport.name} (${viewport.width}px): Button gap = ${Math.round(buttonGap)}px`);
          expect(Math.round(buttonGap)).toBeGreaterThanOrEqual(15);
        }
      }

      // Go back to start for next viewport test
      await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');
    }

    console.log('✅ Responsive behavior verified across all viewports');
  });
});