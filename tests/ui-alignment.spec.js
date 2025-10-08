import { test, expect } from '@playwright/test';

test.describe('UI Alignment Optimization', () => {

  test('should measure and analyze button alignment issues', async ({ page }) => {
    // Navigate to the page and complete questionnaire
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    await page.click('#start-btn');
    await page.waitForSelector('.option-button');

    // Quick questionnaire completion
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
    await page.waitForTimeout(3000); // Allow all animations to complete

    // Take a screenshot for reference
    await page.screenshot({ path: 'tests/ui-alignment-before.png', fullPage: true });

    console.log('--- Analyzing Card Alignment Issues ---');

    // Get all therapist cards
    const cards = await page.locator('.therapist-card').all();
    console.log(`Found ${cards.length} therapist cards to analyze`);

    const cardMetrics = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardBox = await card.boundingBox();

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Measure button container
      const buttonContainer = card.locator('.card-buttons');
      const buttonContainerBox = await buttonContainer.boundingBox();

      // Get all buttons in this card
      const allButtons = await card.locator('.card-buttons button, .card-buttons span').all();
      const buttonHeights = [];
      const buttonWidths = [];

      for (const button of allButtons) {
        const buttonBox = await button.boundingBox();
        if (buttonBox) {
          buttonHeights.push(buttonBox.height);
          buttonWidths.push(buttonBox.width);
        }
      }

      // Measure specialty tags area
      const specialtyTags = await card.locator('.specialty-tag').all();
      const tagsAreaHeight = specialtyTags.length > 0 ?
        await card.locator('div:has(.specialty-tag)').boundingBox() : null;

      const metrics = {
        name: therapistName,
        cardHeight: cardBox.height,
        cardWidth: cardBox.width,
        buttonContainerY: buttonContainerBox ? buttonContainerBox.y - cardBox.y : 0,
        buttonCount: allButtons.length,
        buttonHeights,
        buttonWidths,
        specialtyTagsCount: specialtyTags.length,
        tagsAreaHeight: tagsAreaHeight ? tagsAreaHeight.height : 0
      };

      cardMetrics.push(metrics);

      console.log(`\n${therapistName}:`);
      console.log(`  Card size: ${cardBox.width}x${cardBox.height}`);
      console.log(`  Button container Y: ${metrics.buttonContainerY}`);
      console.log(`  Buttons: ${buttonHeights.length} (heights: ${buttonHeights.join(', ')})`);
      console.log(`  Specialty tags: ${specialtyTags.length}`);
    }

    // Analyze alignment issues
    console.log('\n--- Alignment Analysis ---');

    // Check card height consistency
    const cardHeights = cardMetrics.map(m => m.cardHeight);
    const minHeight = Math.min(...cardHeights);
    const maxHeight = Math.max(...cardHeights);
    const heightDifference = maxHeight - minHeight;

    console.log(`Card height range: ${minHeight} - ${maxHeight} (difference: ${heightDifference}px)`);

    // Check button container positioning
    const buttonPositions = cardMetrics.map(m => m.buttonContainerY);
    const minButtonY = Math.min(...buttonPositions);
    const maxButtonY = Math.max(...buttonPositions);
    const buttonYDifference = maxButtonY - minButtonY;

    console.log(`Button container Y range: ${minButtonY} - ${maxButtonY} (difference: ${buttonYDifference}px)`);

    // Check button consistency
    const allButtonHeights = cardMetrics.flatMap(m => m.buttonHeights);
    const uniqueButtonHeights = [...new Set(allButtonHeights)];
    console.log(`Button heights found: ${uniqueButtonHeights.join(', ')}`);

    // Check button width consistency
    const allButtonWidths = cardMetrics.flatMap(m => m.buttonWidths);
    const uniqueButtonWidths = [...new Set(allButtonWidths)];
    console.log(`Button widths found: ${uniqueButtonWidths.join(', ')}`);

    // Identify issues
    const issues = [];

    if (heightDifference > 20) {
      issues.push(`Card height inconsistency: ${heightDifference}px difference`);
    }

    if (buttonYDifference > 10) {
      issues.push(`Button alignment inconsistency: ${buttonYDifference}px difference`);
    }

    if (uniqueButtonHeights.length > 2) {
      issues.push(`Inconsistent button heights: ${uniqueButtonHeights.length} different heights`);
    }

    if (issues.length > 0) {
      console.log('\n❌ Issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n✅ No major alignment issues detected');
    }

    return { cardMetrics, issues };
  });

  test('should verify grid layout spacing', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 1000 });
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

    // Measure grid spacing
    const gridContainer = page.locator('.therapist-cards-grid').first();
    const cards = await page.locator('.therapist-card').all();

    if (cards.length >= 2) {
      const card1Box = await cards[0].boundingBox();
      const card2Box = await cards[1].boundingBox();

      const horizontalGap = card2Box.x - (card1Box.x + card1Box.width);
      console.log(`Horizontal gap between cards: ${horizontalGap}px`);

      // Check if gap is consistent
      if (cards.length >= 3) {
        const card3Box = await cards[2].boundingBox();
        const secondGap = card3Box.x - (card2Box.x + card2Box.width);
        console.log(`Second horizontal gap: ${secondGap}px`);

        const gapDifference = Math.abs(horizontalGap - secondGap);
        if (gapDifference > 2) {
          console.log(`❌ Inconsistent grid gaps: ${gapDifference}px difference`);
        } else {
          console.log(`✅ Consistent grid gaps`);
        }
      }
    }
  });
});