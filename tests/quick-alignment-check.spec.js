import { test, expect } from '@playwright/test';

test('should verify button alignment fix', async ({ page }) => {
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

  // Take screenshot
  await page.screenshot({ path: 'tests/alignment-verification.png', fullPage: true });

  console.log('--- Quick Alignment Check ---');

  // Check View Profile button positions
  const cards = await page.locator('.therapist-card').all();
  const viewProfileButtons = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const nameElement = await card.locator('h3').first();
    const therapistName = await nameElement.textContent();

    const viewProfileButton = card.locator('button:has-text("View Profile")');
    const buttonBox = await viewProfileButton.boundingBox();

    viewProfileButtons.push({
      name: therapistName.trim(),
      y: Math.round(buttonBox.y)
    });

    console.log(`${therapistName.trim()}: View Profile at Y=${Math.round(buttonBox.y)}px`);
  }

  // Check if all buttons are aligned
  const yPositions = viewProfileButtons.map(b => b.y);
  const uniqueYPositions = [...new Set(yPositions)];

  console.log(`\nAlignment result: ${uniqueYPositions.length === 1 ? 'PERFECT' : 'MISALIGNED'}`);
  console.log(`Y positions: ${yPositions.join(', ')}px`);

  if (uniqueYPositions.length === 1) {
    console.log('✅ All View Profile buttons perfectly aligned!');
  } else {
    const maxDiff = Math.max(...yPositions) - Math.min(...yPositions);
    console.log(`❌ Misalignment: ${maxDiff}px difference`);
  }

  // Check if buttons are visible (within reasonable viewport)
  const allVisible = yPositions.every(y => y < 800);
  console.log(`Button visibility: ${allVisible ? 'ALL VISIBLE' : 'SOME HIDDEN'}`);

  expect(uniqueYPositions.length).toBe(1);
  expect(allVisible).toBe(true);
});