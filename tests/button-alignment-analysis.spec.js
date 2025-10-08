import { test, expect } from '@playwright/test';

test.describe('Button Alignment Analysis', () => {

  test('should analyze button misalignment and missing booking buttons', async ({ page }) => {
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
    await page.screenshot({ path: 'tests/button-alignment-analysis.png', fullPage: true });

    console.log('--- Button Alignment Analysis ---');

    const cards = await page.locator('.therapist-card').all();
    console.log(`Analyzing ${cards.length} cards for button alignment`);

    // Check card heights and button positions
    const cardData = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Get card dimensions
      const cardBox = await card.boundingBox();

      // Check for buttons
      const viewProfileButtons = card.locator('button:has-text("View Profile")');
      const bookNowButtons = card.locator('button:has-text("Book Now")');

      const viewProfileCount = await viewProfileButtons.count();
      const bookNowCount = await bookNowButtons.count();

      let viewProfileY = null;
      let bookNowY = null;

      if (viewProfileCount > 0) {
        const viewProfileBox = await viewProfileButtons.first().boundingBox();
        viewProfileY = Math.round(viewProfileBox.y);
      }

      if (bookNowCount > 0) {
        const bookNowBox = await bookNowButtons.first().boundingBox();
        bookNowY = Math.round(bookNowBox.y);
      }

      // Get button container
      const buttonContainer = card.locator('.card-buttons');
      const buttonContainerBox = await buttonContainer.boundingBox();

      const data = {
        name: therapistName.trim(),
        cardHeight: Math.round(cardBox.height),
        viewProfileCount,
        bookNowCount,
        viewProfileY,
        bookNowY,
        buttonContainerY: Math.round(buttonContainerBox.y),
        buttonContainerHeight: Math.round(buttonContainerBox.height)
      };

      cardData.push(data);

      console.log(`\n${data.name}:`);
      console.log(`  Card height: ${data.cardHeight}px`);
      console.log(`  View Profile buttons: ${data.viewProfileCount}`);
      console.log(`  Book Now buttons: ${data.bookNowCount}`);
      console.log(`  Button container Y: ${data.buttonContainerY}px`);
      console.log(`  Button container height: ${data.buttonContainerHeight}px`);

      if (data.viewProfileY) {
        console.log(`  View Profile Y position: ${data.viewProfileY}px`);
      }
      if (data.bookNowY) {
        console.log(`  Book Now Y position: ${data.bookNowY}px`);
      }
    }

    // Analyze alignment issues
    console.log('\n--- Alignment Analysis ---');

    const cardHeights = cardData.map(d => d.cardHeight);
    const uniqueHeights = [...new Set(cardHeights)];
    const viewProfileYPositions = cardData.map(d => d.viewProfileY).filter(y => y !== null);
    const uniqueViewProfileY = [...new Set(viewProfileYPositions)];

    console.log(`Card heights: ${cardHeights.join(', ')}px`);
    console.log(`Unique card heights: ${uniqueHeights.length} (${uniqueHeights.join(', ')}px)`);
    console.log(`View Profile Y positions: ${viewProfileYPositions.join(', ')}px`);
    console.log(`Unique View Profile Y positions: ${uniqueViewProfileY.length}`);

    // Check missing buttons
    const missingBookNow = cardData.filter(d => d.bookNowCount === 0);
    console.log(`\nMissing Book Now buttons: ${missingBookNow.length} cards`);
    missingBookNow.forEach(d => console.log(`  - ${d.name}`));

    // Alignment issues
    if (uniqueHeights.length > 1) {
      console.log('\n❌ ISSUE: Inconsistent card heights causing button misalignment');
      const heightDiff = Math.max(...cardHeights) - Math.min(...cardHeights);
      console.log(`   Height difference: ${heightDiff}px`);
    }

    if (uniqueViewProfileY.length > 1) {
      console.log('\n❌ ISSUE: View Profile buttons at different Y positions');
      const yDiff = Math.max(...viewProfileYPositions) - Math.min(...viewProfileYPositions);
      console.log(`   Y position difference: ${yDiff}px`);
    }

    if (missingBookNow.length > 0) {
      console.log('\n❌ ISSUE: Book Now buttons missing from some cards');
    }

    // Check if buttons are cut off
    const windowHeight = await page.evaluate(() => window.innerHeight);
    const cutOffButtons = cardData.filter(d => d.viewProfileY && d.viewProfileY > windowHeight);

    if (cutOffButtons.length > 0) {
      console.log('\n❌ ISSUE: Some buttons may be cut off below viewport');
      cutOffButtons.forEach(d => console.log(`  - ${d.name}: button at ${d.viewProfileY}px, viewport ${windowHeight}px`));
    }

    return {
      totalCards: cards.length,
      cardHeights: cardHeights,
      uniqueHeights: uniqueHeights.length,
      missingBookNow: missingBookNow.length,
      alignmentIssues: uniqueViewProfileY.length > 1,
      cutOffButtons: cutOffButtons.length
    };
  });

  test('should check button container structure and CSS', async ({ page }) => {
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

    console.log('\n--- CSS Structure Analysis ---');

    const firstCard = page.locator('.therapist-card').first();

    // Check button container CSS
    const buttonContainer = firstCard.locator('.card-buttons');
    const containerStyles = await buttonContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        flexDirection: computed.flexDirection,
        gap: computed.gap,
        height: computed.height,
        padding: computed.padding,
        marginTop: computed.marginTop,
        position: computed.position,
        bottom: computed.bottom
      };
    });

    console.log('Button container styles:');
    Object.entries(containerStyles).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Check card styles
    const cardStyles = await firstCard.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        flexDirection: computed.flexDirection,
        height: computed.height,
        minHeight: computed.minHeight,
        maxHeight: computed.maxHeight
      };
    });

    console.log('\nCard styles:');
    Object.entries(cardStyles).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    return { containerStyles, cardStyles };
  });
});