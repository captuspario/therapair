import { test, expect } from '@playwright/test';

test.describe('UI Optimization Analysis', () => {

  test('should analyze button alignment and whitespace issues', async ({ page }) => {
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

    // Take screenshot for analysis
    await page.screenshot({ path: 'tests/ui-analysis-before.png', fullPage: true });

    console.log('--- Detailed UI Analysis ---');

    const cards = await page.locator('.therapist-card').all();
    const cardAnalysis = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Get card dimensions
      const cardBox = await card.boundingBox();

      // Get image dimensions
      const imageElement = card.locator('img').first();
      const imageBox = await imageElement.boundingBox();

      // Get card content area
      const cardContent = card.locator('.card-content');
      const contentBox = await cardContent.boundingBox();

      // Get last specialty tag to measure gap to buttons
      const lastSpecialtyTag = card.locator('.specialty-tag').last();
      const specialtyBox = await lastSpecialtyTag.boundingBox();

      // Get button container
      const buttonContainer = card.locator('.card-buttons');
      const buttonContainerBox = await buttonContainer.boundingBox();

      // Calculate spaces
      const imageToContentGap = contentBox.y - (imageBox.y + imageBox.height);
      const specialtyToButtonGap = buttonContainerBox.y - (specialtyBox.y + specialtyBox.height);
      const buttonToCardBottomGap = (cardBox.y + cardBox.height) - (buttonContainerBox.y + buttonContainerBox.height);

      const analysis = {
        name: therapistName,
        cardHeight: Math.round(cardBox.height),
        imageHeight: Math.round(imageBox.height),
        contentHeight: Math.round(contentBox.height),
        specialtyHeight: Math.round(specialtyBox.height),
        buttonContainerHeight: Math.round(buttonContainerBox.height),
        imageToContentGap: Math.round(imageToContentGap),
        specialtyToButtonGap: Math.round(specialtyToButtonGap),
        buttonToCardBottomGap: Math.round(buttonToCardBottomGap),
        buttonContainerY: Math.round(buttonContainerBox.y),
        cardBottomY: Math.round(cardBox.y + cardBox.height)
      };

      cardAnalysis.push(analysis);

      console.log(`\n${therapistName}:`);
      console.log(`  Card: ${analysis.cardHeight}px | Image: ${analysis.imageHeight}px | Content: ${analysis.contentHeight}px`);
      console.log(`  Specialty→Button gap: ${analysis.specialtyToButtonGap}px`);
      console.log(`  Button→Bottom gap: ${analysis.buttonToCardBottomGap}px`);
      console.log(`  Button Y position: ${analysis.buttonContainerY}px`);
    }

    // Analyze alignment issues
    console.log('\n--- Alignment Analysis ---');

    const buttonYPositions = cardAnalysis.map(c => c.buttonContainerY);
    const minButtonY = Math.min(...buttonYPositions);
    const maxButtonY = Math.max(...buttonYPositions);
    const buttonYDiff = maxButtonY - minButtonY;

    console.log(`Button Y positions: ${buttonYPositions.join(', ')}`);
    console.log(`Button Y difference: ${buttonYDiff}px`);

    const specialtyToButtonGaps = cardAnalysis.map(c => c.specialtyToButtonGap);
    const minGap = Math.min(...specialtyToButtonGaps);
    const maxGap = Math.max(...specialtyToButtonGaps);
    const gapDiff = maxGap - minGap;

    console.log(`Specialty→Button gaps: ${specialtyToButtonGaps.join(', ')}px`);
    console.log(`Gap difference: ${gapDiff}px`);

    // Analyze whitespace
    console.log('\n--- Whitespace Analysis ---');
    const avgSpecialtyToButtonGap = specialtyToButtonGaps.reduce((a, b) => a + b, 0) / specialtyToButtonGaps.length;
    console.log(`Average specialty→button gap: ${Math.round(avgSpecialtyToButtonGap)}px`);

    if (avgSpecialtyToButtonGap > 100) {
      console.log('❌ Excessive whitespace detected between specialty tags and buttons');
    }

    if (buttonYDiff > 20) {
      console.log('❌ Significant button misalignment detected');
    }

    return { cardAnalysis, issues: { buttonYDiff, gapDiff, avgSpecialtyToButtonGap } };
  });

  test('should measure current CSS properties', async ({ page }) => {
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

    // Measure current CSS properties
    const card = page.locator('.therapist-card').first();
    const cardStyles = await card.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        height: computed.height,
        minHeight: computed.minHeight,
        display: computed.display,
        flexDirection: computed.flexDirection
      };
    });

    const cardContent = page.locator('.card-content').first();
    const contentStyles = await cardContent.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        padding: computed.padding,
        flex: computed.flex,
        display: computed.display,
        flexDirection: computed.flexDirection
      };
    });

    const buttonContainer = page.locator('.card-buttons').first();
    const buttonStyles = await buttonContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        marginTop: computed.marginTop,
        padding: computed.padding,
        gap: computed.gap,
        flexShrink: computed.flexShrink
      };
    });

    console.log('Current CSS Properties:');
    console.log('Card:', cardStyles);
    console.log('Content:', contentStyles);
    console.log('Buttons:', buttonStyles);
  });
});