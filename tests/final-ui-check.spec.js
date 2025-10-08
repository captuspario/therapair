import { test, expect } from '@playwright/test';

test('should verify final UI improvements', async ({ page }) => {
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
  await page.waitForTimeout(3000);

  // Take final screenshot
  await page.screenshot({ path: 'tests/final-ui-optimized.png', fullPage: true });

  console.log('--- Final UI Check ---');

  const cards = await page.locator('.therapist-card').all();
  const measurements = [];

  for (const card of cards) {
    const nameElement = await card.locator('h3').first();
    const name = await nameElement.textContent();

    const cardBox = await card.boundingBox();
    const buttonContainer = card.locator('.card-buttons');
    const buttonContainerBox = await buttonContainer.boundingBox();

    const bottomDistance = cardBox ? (cardBox.y + cardBox.height) - (buttonContainerBox.y + buttonContainerBox.height) : 0;

    measurements.push({
      name: name.trim(),
      height: Math.round(cardBox.height),
      bottomDistance: Math.round(bottomDistance)
    });
  }

  measurements.forEach(m => {
    console.log(`${m.name}: ${m.height}px height, ${m.bottomDistance}px bottom`);
  });

  const bottomDistances = measurements.map(m => m.bottomDistance);
  const maxBottomDiff = Math.max(...bottomDistances) - Math.min(...bottomDistances);

  console.log(`\nBottom distance range: ${Math.min(...bottomDistances)} - ${Math.max(...bottomDistances)}px`);
  console.log(`Improvement: Bottom distance difference = ${maxBottomDiff}px`);

  // This should be much improved
  if (maxBottomDiff < 30) {
    console.log('✅ Significant improvement in button alignment!');
  } else {
    console.log('⚠️ Still room for improvement');
  }

  // Button heights should be perfect
  const allButtons = await page.locator('.btn-secondary, .btn-book').all();
  const heights = [];
  for (const btn of allButtons) {
    const box = await btn.boundingBox();
    if (box) heights.push(Math.round(box.height));
  }

  const uniqueHeights = [...new Set(heights)];
  console.log(`Button heights: ${uniqueHeights.join(', ')}px`);

  if (uniqueHeights.length === 1 && uniqueHeights[0] === 48) {
    console.log('✅ Perfect button height consistency!');
  }
});