import { test, expect } from '@playwright/test';

test.describe('Button Spacing Analysis', () => {

  test('should analyze and measure button spacing issues', async ({ page }) => {
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

    // Wait for results
    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(3000);

    // Take detailed screenshot
    await page.screenshot({ path: 'tests/button-spacing-analysis.png', fullPage: true });

    console.log('--- Detailed Button Spacing Analysis ---');

    const cards = await page.locator('.therapist-card').all();
    console.log(`Found ${cards.length} cards to analyze`);

    const cardAnalysis = [];

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Get card dimensions
      const cardBox = await card.boundingBox();

      // Get button container
      const buttonContainer = card.locator('.card-buttons');
      const buttonContainerBox = await buttonContainer.boundingBox();

      // Get all buttons
      const buttons = await card.locator('.card-buttons button, .card-buttons span').all();
      const buttonDetails = [];

      for (let j = 0; j < buttons.length; j++) {
        const button = buttons[j];
        const buttonBox = await button.boundingBox();
        const buttonText = await button.textContent();

        if (buttonBox && buttonContainerBox) {
          buttonDetails.push({
            text: buttonText.trim(),
            y: buttonBox.y,
            height: buttonBox.height,
            relativeY: buttonBox.y - buttonContainerBox.y
          });
        }
      }

      // Calculate gaps between buttons
      const gaps = [];
      for (let j = 1; j < buttonDetails.length; j++) {
        const prevButton = buttonDetails[j - 1];
        const currentButton = buttonDetails[j];
        const gap = currentButton.y - (prevButton.y + prevButton.height);
        gaps.push(gap);
      }

      // Calculate button container position relative to card bottom
      const cardBottomDistance = cardBox ? (cardBox.y + cardBox.height) - (buttonContainerBox.y + buttonContainerBox.height) : 0;

      const analysis = {
        name: therapistName,
        cardHeight: cardBox ? cardBox.height : 0,
        buttonCount: buttons.length,
        buttonDetails,
        gaps,
        averageGap: gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0,
        buttonContainerHeight: buttonContainerBox ? buttonContainerBox.height : 0,
        cardBottomDistance
      };

      cardAnalysis.push(analysis);

      console.log(`\n${therapistName}:`);
      console.log(`  Card height: ${analysis.cardHeight}px`);
      console.log(`  Buttons: ${analysis.buttonCount}`);
      console.log(`  Button gaps: ${gaps.map(g => Math.round(g)).join(', ')}px`);
      console.log(`  Avg gap: ${Math.round(analysis.averageGap)}px`);
      console.log(`  Bottom distance: ${Math.round(cardBottomDistance)}px`);
      console.log(`  Container height: ${Math.round(analysis.buttonContainerHeight)}px`);
    }

    // Find issues
    console.log('\n--- Issue Analysis ---');

    // Check gap consistency
    const allGaps = cardAnalysis.flatMap(c => c.gaps);
    const uniqueGaps = [...new Set(allGaps.map(g => Math.round(g)))];
    console.log(`Unique gap sizes: ${uniqueGaps.join(', ')}px`);

    if (uniqueGaps.length > 2) {
      console.log('❌ Inconsistent button gaps detected');
    }

    // Check card height differences
    const cardHeights = cardAnalysis.map(c => c.cardHeight);
    const minHeight = Math.min(...cardHeights);
    const maxHeight = Math.max(...cardHeights);
    const heightDiff = maxHeight - minHeight;

    console.log(`Card height range: ${minHeight} - ${maxHeight} (diff: ${heightDiff}px)`);

    if (heightDiff > 50) {
      console.log('❌ Significant card height differences detected');
    }

    // Check button container positioning
    const bottomDistances = cardAnalysis.map(c => c.cardBottomDistance);
    const minBottomDist = Math.min(...bottomDistances);
    const maxBottomDist = Math.max(...bottomDistances);
    const bottomDistDiff = maxBottomDist - minBottomDist;

    console.log(`Bottom distance range: ${minBottomDist} - ${maxBottomDist} (diff: ${bottomDistDiff}px)`);

    if (bottomDistDiff > 5) {
      console.log('❌ Button containers not consistently positioned at bottom');
    }

    return { cardAnalysis, issues: { uniqueGaps, heightDiff, bottomDistDiff } };
  });

  test('should measure current padding and margins', async ({ page }) => {
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

    // Measure CSS properties
    const buttonContainer = page.locator('.card-buttons').first();
    const styles = await buttonContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        gap: computed.gap,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        marginTop: computed.marginTop,
        marginBottom: computed.marginBottom
      };
    });

    console.log('Button container styles:', styles);

    const cardContent = page.locator('.card-content').first();
    const contentStyles = await cardContent.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        padding: computed.padding,
        paddingBottom: computed.paddingBottom,
        minHeight: computed.minHeight
      };
    });

    console.log('Card content styles:', contentStyles);

    const card = page.locator('.therapist-card').first();
    const cardStyles = await card.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        minHeight: computed.minHeight,
        height: computed.height,
        display: computed.display,
        flexDirection: computed.flexDirection
      };
    });

    console.log('Card styles:', cardStyles);
  });
});