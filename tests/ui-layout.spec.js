import { test, expect } from '@playwright/test';

test.describe('Therapist Results Page Layout', () => {
  test('should have consistent card sizes in results section', async ({ page }) => {
    // Start the server and navigate to the page
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Start the matching process
    await page.click('#start-btn');

    // Fill out the questionnaire to get to results
    // Question 1: Who is seeking therapy?
    await page.waitForSelector('.option-button');
    await page.click('button:has-text("For myself")');

    // Question 2: Age
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Yes")');

    // Question 3: Location
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Either online or in-person")');

    // Question 4: Concerns (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Relationship challenges")');
    await page.click('#continue-btn');

    // Question 5: Funding (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("None of these apply")');
    await page.click('#continue-btn');

    // Question 6: Availability (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m flexible with timing")');
    await page.click('#continue-btn');

    // Question 7: Urgency
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I don\'t mind waiting for the right therapist")');

    // Question 8: Approach (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("No preference/unsure")');
    await page.click('#continue-btn');

    // Question 9: Community (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m open to any qualified therapist")');
    await page.click('#continue-btn');

    // Wait for results to appear
    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(2000); // Allow animations to complete

    // Take a screenshot
    await page.screenshot({ path: 'tests/results-layout.png', fullPage: true });

    // Check card consistency
    const allCards = await page.locator('.therapist-card').all();
    console.log(`Found ${allCards.length} therapist cards`);

    // Get dimensions of all cards
    const cardDimensions = [];
    for (const card of allCards) {
      const box = await card.boundingBox();
      cardDimensions.push({
        width: box.width,
        height: box.height
      });
    }

    console.log('Card dimensions:', cardDimensions);

    // Check if cards have consistent widths (within grid containers)
    const gridContainers = await page.locator('.therapist-cards-grid').all();

    for (let i = 0; i < gridContainers.length; i++) {
      const container = gridContainers[i];
      const cardsInGrid = await container.locator('.therapist-card').all();

      console.log(`Grid ${i + 1} has ${cardsInGrid.length} cards`);

      // All cards in the same grid should have similar widths
      if (cardsInGrid.length > 1) {
        const widths = [];
        for (const card of cardsInGrid) {
          const box = await card.boundingBox();
          widths.push(box.width);
        }

        const maxWidth = Math.max(...widths);
        const minWidth = Math.min(...widths);
        const widthDifference = maxWidth - minWidth;

        console.log(`Grid ${i + 1} width range: ${minWidth} - ${maxWidth} (difference: ${widthDifference})`);

        // Cards should have consistent widths (within 5px tolerance)
        expect(widthDifference).toBeLessThan(5);
      }
    }

    // Test accessibility
    await expect(page.locator('.therapist-card')).toHaveCount(await allCards.length);

    // Check that all cards have proper alt text for images
    const images = await page.locator('.therapist-card img').all();
    for (const img of images) {
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText.toLowerCase()).toContain('therapist');
    }
  });
});