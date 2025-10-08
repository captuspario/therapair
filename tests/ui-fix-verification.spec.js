import { test, expect } from '@playwright/test';

test('should verify UI optimizations and button alignment', async ({ page }) => {
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

  // Take screenshot after optimizations
  await page.screenshot({ path: 'tests/ui-optimized.png', fullPage: true });

  console.log('--- UI Optimization Verification ---');

  const cards = await page.locator('.therapist-card').all();
  const measurements = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    // Get therapist name
    const nameElement = await card.locator('h3').first();
    const therapistName = await nameElement.textContent();

    // Get card dimensions
    const cardBox = await card.boundingBox();

    // Get button container position relative to card
    const buttonContainer = card.locator('.card-buttons');
    const buttonContainerBox = await buttonContainer.boundingBox();

    // Calculate button position relative to card bottom
    const buttonToCardBottom = (cardBox.y + cardBox.height) - (buttonContainerBox.y + buttonContainerBox.height);

    // Get specialty tag position
    const lastSpecialty = card.locator('.specialty-tag').last();
    const specialtyBox = await lastSpecialty.boundingBox();
    const specialtyToButtonGap = buttonContainerBox.y - (specialtyBox.y + specialtyBox.height);

    measurements.push({
      name: therapistName.trim(),
      cardHeight: Math.round(cardBox.height),
      cardY: Math.round(cardBox.y),
      buttonContainerY: Math.round(buttonContainerBox.y),
      buttonToCardBottom: Math.round(buttonToCardBottom),
      specialtyToButtonGap: Math.round(specialtyToButtonGap),
      relativeButtonY: Math.round(buttonContainerBox.y - cardBox.y) // Position within card
    });

    console.log(`${therapistName.trim()}:`);
    console.log(`  Card: ${Math.round(cardBox.height)}px at Y=${Math.round(cardBox.y)}`);
    console.log(`  Button relative Y: ${Math.round(buttonContainerBox.y - cardBox.y)}px (within card)`);
    console.log(`  Button to bottom: ${Math.round(buttonToCardBottom)}px`);
    console.log(`  Specialty gap: ${Math.round(specialtyToButtonGap)}px`);
  }

  console.log('\\n--- Analysis Results ---');

  // Check card height consistency
  const heights = measurements.map(m => m.cardHeight);
  const uniqueHeights = [...new Set(heights)];
  console.log(`Card heights: ${uniqueHeights.join(', ')}px`);

  if (uniqueHeights.length === 1) {
    console.log('✅ Perfect card height consistency');
  }

  // Check button positioning within cards (this should be consistent)
  const relativeButtonPositions = measurements.map(m => m.relativeButtonY);
  const uniqueRelativePositions = [...new Set(relativeButtonPositions)];
  const maxRelativeDiff = Math.max(...relativeButtonPositions) - Math.min(...relativeButtonPositions);

  console.log(`Button positions within cards: ${relativeButtonPositions.join(', ')}px`);
  console.log(`Max relative difference: ${maxRelativeDiff}px`);

  if (maxRelativeDiff < 5) {
    console.log('✅ Perfect button alignment within cards');
  } else {
    console.log('⚠️ Button alignment could be improved');
  }

  // Check specialty to button gaps
  const gaps = measurements.map(m => m.specialtyToButtonGap);
  const uniqueGaps = [...new Set(gaps)];
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;

  console.log(`Specialty to button gaps: ${gaps.join(', ')}px`);
  console.log(`Average gap: ${Math.round(avgGap)}px`);

  if (avgGap < 50) {
    console.log('✅ Reduced whitespace achieved');
  } else {
    console.log('⚠️ Still some excessive whitespace');
  }

  // Overall assessment
  if (uniqueHeights.length === 1 && maxRelativeDiff < 5 && avgGap < 50) {
    console.log('\\n🎉 UI optimization successful!');
  } else {
    console.log('\\n⚠️ Further optimization needed');
  }
});