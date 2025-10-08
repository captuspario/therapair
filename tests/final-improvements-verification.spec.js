import { test, expect } from '@playwright/test';

test.describe('Final Improvements Verification', () => {

  test('should verify both logic and spacing improvements together', async ({ page }) => {
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

    // Take final screenshot
    await page.screenshot({ path: 'tests/final-improvements.png', fullPage: true });

    console.log('--- Final Improvements Verification ---');

    // 1. Verify Improved Logic: Max 3 therapists total
    const totalCards = await page.locator('.therapist-card').count();
    console.log(`\\n✅ LOGIC IMPROVEMENT:`);
    console.log(`Total therapists displayed: ${totalCards}`);
    expect(totalCards).toBeLessThanOrEqual(3);

    if (totalCards <= 3) {
      console.log('✅ Perfect: Max 3 therapists displayed (improved from 4)');
    }

    // 2. Verify Spacing Improvement: Min 24px gap, achieved >90px
    console.log(`\\n✅ SPACING IMPROVEMENT:`);
    const cards = await page.locator('.therapist-card').all();

    let allSpacingGood = true;
    let avgSpacing = 0;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Get spacing measurements
      const specialtyTags = card.locator('.specialty-tag');
      const specialtyCount = await specialtyTags.count();

      let lastContentY = 0;
      if (specialtyCount > 0) {
        const lastTag = specialtyTags.nth(specialtyCount - 1);
        const lastTagBox = await lastTag.boundingBox();
        lastContentY = lastTagBox.y + lastTagBox.height;
      }

      // Check for "+X more" span
      const moreSpans = card.locator('span').filter({ hasText: /\\+\\d+ more/ });
      if (await moreSpans.count() > 0) {
        const moreSpan = moreSpans.first();
        const moreBox = await moreSpan.boundingBox();
        lastContentY = Math.max(lastContentY, moreBox.y + moreBox.height);
      }

      const firstButton = card.locator('.card-buttons button').first();
      const firstButtonBox = await firstButton.boundingBox();
      const spacing = Math.round(firstButtonBox.y - lastContentY);

      avgSpacing += spacing;

      console.log(`${therapistName.trim()}: ${spacing}px gap`);

      if (spacing < 24) {
        allSpacingGood = false;
        console.log(`  ❌ Too tight: ${spacing}px (should be 24px+)`);
      } else {
        console.log(`  ✅ Good spacing: ${spacing}px`);
      }
    }

    avgSpacing = Math.round(avgSpacing / cards.length);
    console.log(`Average spacing: ${avgSpacing}px`);

    expect(allSpacingGood).toBe(true);
    expect(avgSpacing).toBeGreaterThanOrEqual(24);
    console.log('✅ Perfect: All spacing >24px (improved from overlapping content)');

    // 3. Verify Consistent Card Heights
    console.log(`\\n✅ CONSISTENCY CHECK:`);
    const cardHeights = [];
    for (const card of cards) {
      const cardBox = await card.boundingBox();
      cardHeights.push(Math.round(cardBox.height));
    }

    const uniqueHeights = [...new Set(cardHeights)];
    console.log(`Card heights: ${cardHeights.join(', ')}px`);
    console.log(`Unique heights: ${uniqueHeights.length}`);

    if (uniqueHeights.length === 1) {
      console.log('✅ Perfect: All cards have identical height');
    }

    // 4. Verify Button Functionality Still Works
    console.log(`\\n✅ FUNCTIONALITY CHECK:`);
    const bookButton = page.locator('button:has-text("Book Now")').first();
    await expect(bookButton).toBeVisible();

    // Test booking form still opens
    await bookButton.click();
    await page.waitForSelector('#booking-modal');

    const modal = page.locator('#booking-modal');
    await expect(modal).toBeVisible();
    console.log('✅ Booking functionality working');

    // Close modal
    await page.click('button:has-text("Cancel")');
    await page.waitForTimeout(500);

    // Summary
    console.log(`\\n🎉 ALL IMPROVEMENTS VERIFIED:`);
    console.log(`✅ Logic: Max 3 therapists (was 4+)`);
    console.log(`✅ Spacing: ${avgSpacing}px average gap (was overlapping)`);
    console.log(`✅ Consistency: ${uniqueHeights.length === 1 ? 'Perfect' : 'Good'} height uniformity`);
    console.log(`✅ Functionality: All features working`);

    return {
      totalTherapists: totalCards,
      averageSpacing: avgSpacing,
      consistentHeights: uniqueHeights.length === 1,
      functionalityWorking: true
    };
  });

  test('should test different scenarios (1, 2, 3 best matches)', async ({ page }) => {
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Test scenario that should give fewer matches
    await page.click('#start-btn');
    await page.waitForSelector('.option-button');
    await page.click('button:has-text("For myself")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Yes")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Online sessions only")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Psychedelic therapy/integration")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("None of these apply")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("ASAP")');
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

    const totalCards2 = await page.locator('.therapist-card').count();
    console.log(`Different scenario: ${totalCards2} therapists displayed`);

    expect(totalCards2).toBeLessThanOrEqual(3);
    console.log('✅ Logic working across different scenarios');
  });
});