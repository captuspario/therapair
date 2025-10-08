import { test, expect } from '@playwright/test';

test.describe('Content to Button Spacing Analysis', () => {

  test('should analyze spacing between card content and CTA buttons', async ({ page }) => {
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

    // Take screenshot for analysis
    await page.screenshot({ path: 'tests/content-spacing-analysis.png', fullPage: true });

    console.log('--- Content to Button Spacing Analysis ---');

    const cards = await page.locator('.therapist-card').all();
    console.log(`Analyzing ${cards.length} cards for content spacing`);

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      console.log(`\\n${therapistName.trim()}:`);

      // Get last specialty tag position
      const specialtyTags = card.locator('.specialty-tag');
      const specialtyCount = await specialtyTags.count();

      let lastContentY = 0;
      if (specialtyCount > 0) {
        const lastTag = specialtyTags.nth(specialtyCount - 1);
        const lastTagBox = await lastTag.boundingBox();
        lastContentY = lastTagBox.y + lastTagBox.height;
        console.log(`  Last specialty tag bottom: ${Math.round(lastContentY)}px`);
      }

      // If no specialty tags, check for "+X more" span
      const moreSpans = card.locator('span').filter({ hasText: /\+\d+ more/ });
      if (await moreSpans.count() > 0) {
        const moreSpan = moreSpans.first();
        const moreBox = await moreSpan.boundingBox();
        lastContentY = Math.max(lastContentY, moreBox.y + moreBox.height);
        console.log(`  "+more" span bottom: ${Math.round(moreBox.y + moreBox.height)}px`);
      }

      // Get first button position
      const buttonContainer = card.locator('.card-buttons');
      const buttonContainerBox = await buttonContainer.boundingBox();
      const firstButton = card.locator('.card-buttons button').first();
      const firstButtonBox = await firstButton.boundingBox();

      console.log(`  Button container top: ${Math.round(buttonContainerBox.y)}px`);
      console.log(`  First button top: ${Math.round(firstButtonBox.y)}px`);

      // Calculate gaps
      const contentToContainerGap = buttonContainerBox.y - lastContentY;
      const contentToButtonGap = firstButtonBox.y - lastContentY;

      console.log(`  Content to container gap: ${Math.round(contentToContainerGap)}px`);
      console.log(`  Content to button gap: ${Math.round(contentToButtonGap)}px`);

      // Check CSS properties
      const cardContentElement = card.locator('.card-content');
      const contentStyles = await cardContentElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          paddingBottom: computed.paddingBottom
        };
      });

      const buttonStyles = await buttonContainer.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          padding: computed.padding,
          paddingTop: computed.paddingTop
        };
      });

      console.log(`  Card content padding-bottom: ${contentStyles.paddingBottom}`);
      console.log(`  Button container padding-top: ${buttonStyles.paddingTop}`);

      // Analyze if spacing is too tight
      if (contentToButtonGap < 24) {
        console.log(`  ❌ TIGHT SPACING: ${Math.round(contentToButtonGap)}px (should be 24px+)`);
      } else {
        console.log(`  ✅ Good spacing: ${Math.round(contentToButtonGap)}px`);
      }
    }

    // Summary and recommendations
    console.log('\\n--- Spacing Analysis Summary ---');
    console.log('Current issues identified:');
    console.log('❌ Content overlaps with absolutely positioned button container');
    console.log('❌ Card content padding-bottom not accounting for button area');
    console.log('❌ Need more breathing room between specialty tags and buttons');

    console.log('\\nRecommendations:');
    console.log('1. Increase card content padding-bottom');
    console.log('2. Add margin-top to button container');
    console.log('3. Ensure minimum 24px gap following 8px grid system');

    return { cardsAnalyzed: cards.length };
  });

  test('should verify current card layout structure', async ({ page }) => {
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

    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(2000);

    // Count total therapists to verify new logic
    const totalCards = await page.locator('.therapist-card').count();
    console.log(`\\n--- Therapist Display Logic Verification ---`);
    console.log(`Total therapists displayed: ${totalCards}`);

    if (totalCards <= 3) {
      console.log('✅ Improved logic working: Max 3 therapists displayed');
    } else {
      console.log(`❌ Logic issue: ${totalCards} therapists displayed (should be max 3)`);
    }

    // Check sections
    const bestMatchesSection = page.locator('h3:has-text("Best match")');
    const closelyAlignedSection = page.locator('h3:has-text("These therapists align closely")');

    const bestCount = await bestMatchesSection.count();
    const alignedCount = await closelyAlignedSection.count();

    console.log(`Best matches sections: ${bestCount}`);
    console.log(`Closely aligned sections: ${alignedCount}`);

    return { totalCards, bestCount, alignedCount };
  });
});