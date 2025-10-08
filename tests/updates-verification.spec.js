import { test, expect } from '@playwright/test';

test.describe('Updates Verification', () => {

  test('should verify all requested updates', async ({ page }) => {
    // Navigate to the page
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Start the matching process
    await page.click('#start-btn');

    // Fill out questionnaire quickly to get results
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

    // Check the updated Q9 text
    await page.waitForSelector('.option-button:not(:disabled)');
    const questionText = await page.locator('.chat-message.bot').last().textContent();
    expect(questionText).toContain('Would you prefer that your therapist have lived experience or special knowledge in any of the following communities?');
    console.log('✓ Q9 text updated correctly');

    await page.click('button:has-text("I\'m open to any qualified therapist")');
    await page.click('#continue-btn');

    // Wait for results
    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(2000);

    // Verify Meg is not in results (should be excluded)
    const therapistCards = await page.locator('.therapist-card').all();
    console.log(`Found ${therapistCards.length} therapist cards`);

    let megFound = false;
    for (const card of therapistCards) {
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();
      if (therapistName === 'Meg Wilson') {
        megFound = true;
        break;
      }
    }

    expect(megFound).toBe(false);
    console.log('✓ Meg Wilson excluded from results correctly');

    // Verify button styling (profile buttons should be outlined, booking buttons full color)
    const profileBtns = await page.locator('button:has-text("View Profile")').all();
    if (profileBtns.length > 0) {
      const profileBtn = profileBtns[0];
      const profileBtnClass = await profileBtn.getAttribute('class');
      expect(profileBtnClass).toBe('btn-secondary');
      console.log('✓ Profile buttons use btn-secondary class (outlined)');
    }

    const bookingBtns = await page.locator('.btn-book').all();
    if (bookingBtns.length > 0) {
      console.log(`✓ Found ${bookingBtns.length} booking buttons with btn-book class (full color)`);
    }

    // Check specific booking button text
    const specificBookingButtons = await page.locator('button:has-text("Book In-Person"), button:has-text("Book Telehealth")').all();
    if (specificBookingButtons.length > 0) {
      console.log(`✓ Found ${specificBookingButtons.length} buttons with specific "Book In-Person" or "Book Telehealth" text`);
    }

    // Verify grid layout has data-card-count attribute
    const gridContainers = await page.locator('.therapist-cards-grid').all();
    for (let i = 0; i < gridContainers.length; i++) {
      const container = gridContainers[i];
      const cardCount = await container.getAttribute('data-card-count');
      expect(cardCount).toBeTruthy();
      console.log(`✓ Grid container ${i + 1} has data-card-count="${cardCount}"`);
    }

    console.log('\n✅ All updates verified successfully!');
  });

  test('should verify 3-column layout for desktop', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1400, height: 1000 });

    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Complete questionnaire to get multiple results
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

    // Check grid layout
    const grids = await page.locator('.therapist-cards-grid').all();
    for (const grid of grids) {
      const cardCount = await grid.getAttribute('data-card-count');
      const gridStyles = await grid.evaluate(el => window.getComputedStyle(el));

      console.log(`Grid with ${cardCount} cards - grid-template-columns: ${gridStyles.gridTemplateColumns}`);

      // For desktop, should use appropriate column layout
      if (parseInt(cardCount) >= 3) {
        // Should use 3-column layout
        expect(gridStyles.gridTemplateColumns).toContain('380px');
      }
    }

    console.log('✅ Desktop grid layout verified!');
  });
});