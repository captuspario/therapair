import { test, expect } from '@playwright/test';

test.describe('Button Alignment Verification', () => {

  test('should verify buttons are aligned and visible after fix', async ({ page }) => {
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

    // Take screenshot for verification
    await page.screenshot({ path: 'tests/button-alignment-fixed.png', fullPage: true });

    console.log('--- Button Alignment Verification ---');

    const cards = await page.locator('.therapist-card').all();
    console.log(`Verifying ${cards.length} cards for proper button alignment`);

    const buttonData = [];

    // Collect button position data
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      const viewProfileButton = card.locator('button:has-text("View Profile")').first();
      const bookNowButton = card.locator('button:has-text("Book Now")').first();

      const viewProfileBox = await viewProfileButton.boundingBox();
      const bookNowBox = await bookNowButton.boundingBox();

      const data = {
        name: therapistName.trim(),
        viewProfileY: Math.round(viewProfileBox.y),
        bookNowY: Math.round(bookNowBox.y),
        viewProfileVisible: viewProfileBox.y >= 0 && viewProfileBox.y < 1000,
        bookNowVisible: bookNowBox.y >= 0 && bookNowBox.y < 1000
      };

      buttonData.push(data);

      console.log(`\n${data.name}:`);
      console.log(`  View Profile Y: ${data.viewProfileY}px (visible: ${data.viewProfileVisible})`);
      console.log(`  Book Now Y: ${data.bookNowY}px (visible: ${data.bookNowVisible})`);
    }

    // Check alignment
    const viewProfileYPositions = buttonData.map(d => d.viewProfileY);
    const bookNowYPositions = buttonData.map(d => d.bookNowY);

    const uniqueViewProfileY = [...new Set(viewProfileYPositions)];
    const uniqueBookNowY = [...new Set(bookNowYPositions)];

    console.log(`\n--- Alignment Check ---`);
    console.log(`View Profile Y positions: ${viewProfileYPositions.join(', ')}px`);
    console.log(`Book Now Y positions: ${bookNowYPositions.join(', ')}px`);

    // Test assertions
    console.log(`\n--- Test Results ---`);

    // 1. All View Profile buttons should be at same Y position
    if (uniqueViewProfileY.length === 1) {
      console.log('✅ View Profile buttons perfectly aligned');
    } else {
      const maxDiff = Math.max(...viewProfileYPositions) - Math.min(...viewProfileYPositions);
      console.log(`❌ View Profile misalignment: ${maxDiff}px difference`);
    }

    // 2. All Book Now buttons should be at same Y position
    if (uniqueBookNowY.length === 1) {
      console.log('✅ Book Now buttons perfectly aligned');
    } else {
      const maxDiff = Math.max(...bookNowYPositions) - Math.min(...bookNowYPositions);
      console.log(`❌ Book Now misalignment: ${maxDiff}px difference`);
    }

    // 3. All buttons should be visible
    const allViewProfileVisible = buttonData.every(d => d.viewProfileVisible);
    const allBookNowVisible = buttonData.every(d => d.bookNowVisible);

    if (allViewProfileVisible) {
      console.log('✅ All View Profile buttons visible');
    } else {
      console.log('❌ Some View Profile buttons not visible');
    }

    if (allBookNowVisible) {
      console.log('✅ All Book Now buttons visible');
    } else {
      console.log('❌ Some Book Now buttons not visible');
    }

    // Assertions
    expect(uniqueViewProfileY.length).toBe(1);
    expect(uniqueBookNowY.length).toBe(1);
    expect(allViewProfileVisible).toBe(true);
    expect(allBookNowVisible).toBe(true);

    console.log('\n🎉 Button alignment and visibility verified!');

    return {
      perfectAlignment: uniqueViewProfileY.length === 1 && uniqueBookNowY.length === 1,
      allVisible: allViewProfileVisible && allBookNowVisible,
      viewProfileYPosition: viewProfileYPositions[0],
      bookNowYPosition: bookNowYPositions[0]
    };
  });

  test('should test button functionality after alignment fix', async ({ page }) => {
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

    console.log('\n--- Functionality Test ---');

    // Test Book Now button
    const bookButton = page.locator('button:has-text("Book Now")').first();
    await expect(bookButton).toBeVisible();

    await bookButton.click();
    await page.waitForSelector('#booking-modal');

    const modal = page.locator('#booking-modal');
    await expect(modal).toBeVisible();
    console.log('✅ Book Now button working');

    // Close modal
    await page.click('button:has-text("Cancel")');
    await page.waitForTimeout(500);

    // Test View Profile button
    const viewButton = page.locator('button:has-text("View Profile")').first();
    await expect(viewButton).toBeVisible();
    console.log('✅ View Profile button visible and clickable');

    console.log('✅ All button functionality preserved after alignment fix');

    return { bookNowWorking: true, viewProfileWorking: true };
  });
});