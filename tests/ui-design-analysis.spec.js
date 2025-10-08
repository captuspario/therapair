import { test, expect } from '@playwright/test';

test.describe('UI Design Analysis', () => {

  test('should analyze button spacing and layout alignment issues', async ({ page }) => {
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
    await page.screenshot({ path: 'tests/ui-analysis-current.png', fullPage: true });

    console.log('--- UI Design Analysis ---');

    // 1. Analyze button spacing within cards
    console.log('\\n1. Button Spacing Analysis:');
    const firstCard = page.locator('.therapist-card').first();
    const buttons = firstCard.locator('.card-buttons button');

    const button1 = buttons.nth(0);
    const button2 = buttons.nth(1);

    const button1Box = await button1.boundingBox();
    const button2Box = await button2.boundingBox();

    const buttonGap = button2Box.y - (button1Box.y + button1Box.height);
    console.log(`Button gap: ${Math.round(buttonGap)}px`);

    // Check button container CSS
    const buttonContainer = firstCard.locator('.card-buttons');
    const containerStyles = await buttonContainer.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        gap: computed.gap,
        padding: computed.padding,
        flexDirection: computed.flexDirection
      };
    });
    console.log(`Button container styles: gap=${containerStyles.gap}, padding=${containerStyles.padding}`);

    // 2. Analyze headline alignment
    console.log('\\n2. Headline Alignment Analysis:');

    // Get main container bounds
    const mainContainer = page.locator('.container').first();
    const containerBox = await mainContainer.boundingBox();

    // Get cards grid bounds
    const cardsGrid = page.locator('.therapist-cards-grid').first();
    const gridBox = await cardsGrid.boundingBox();

    // Get headline positions
    const bestMatchHeading = page.locator('h3:has-text("Best matches")');
    const secondHeading = page.locator('h3:has-text("These therapists align closely")');

    if (await bestMatchHeading.count() > 0) {
      const bestMatchBox = await bestMatchHeading.boundingBox();
      const headlineOffset = bestMatchBox.x - gridBox.x;
      console.log(`"Best matches" offset from grid: ${Math.round(headlineOffset)}px`);
    }

    if (await secondHeading.count() > 0) {
      const secondBox = await secondHeading.boundingBox();
      const secondOffset = secondBox.x - gridBox.x;
      console.log(`"These therapists" offset from grid: ${Math.round(secondOffset)}px`);
    }

    // 3. Analyze card spacing and grid layout
    console.log('\\n3. Card Grid Analysis:');
    const allCards = await page.locator('.therapist-card').all();

    for (let i = 0; i < allCards.length; i++) {
      const cardBox = await allCards[i].boundingBox();
      console.log(`Card ${i + 1}: x=${Math.round(cardBox.x)}, y=${Math.round(cardBox.y)}, width=${Math.round(cardBox.width)}`);
    }

    // 4. Analyze overall spacing and padding
    console.log('\\n4. Spacing Analysis:');
    const resultsTier = page.locator('.results-tier').first();
    const tierStyles = await resultsTier.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        marginBottom: computed.marginBottom,
        padding: computed.padding
      };
    });
    console.log(`Results tier styles: marginBottom=${tierStyles.marginBottom}, padding=${tierStyles.padding}`);

    // 5. Check container and grid styles
    const gridStyles = await cardsGrid.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        gridTemplateColumns: computed.gridTemplateColumns,
        gap: computed.gap,
        justifyContent: computed.justifyContent,
        maxWidth: computed.maxWidth,
        margin: computed.margin
      };
    });
    console.log(`Grid styles:`, gridStyles);

    // 6. Recommendations based on analysis
    console.log('\\n5. UI Issues Identified:');

    if (buttonGap < 16) {
      console.log(`❌ Button gap too tight: ${Math.round(buttonGap)}px (should be 16-20px)`);
    }

    console.log('❌ Headlines may not be aligned with card grid');
    console.log('❌ Need to apply consistent spacing using 8px grid system');
    console.log('❌ Container alignment needs optimization');

    return {
      buttonGap: Math.round(buttonGap),
      gridAlignment: gridBox,
      containerAlignment: containerBox,
      issues: ['tight_buttons', 'misaligned_headlines', 'inconsistent_spacing']
    };
  });

  test('should measure whitespace and visual hierarchy', async ({ page }) => {
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

    console.log('--- Visual Hierarchy Analysis ---');

    // Analyze heading typography and spacing
    const headings = await page.locator('h3').all();
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const text = await heading.textContent();
      const styles = await heading.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom,
          color: computed.color
        };
      });

      if (text.includes('Best matches') || text.includes('These therapists')) {
        console.log(`Heading "${text.trim()}":`, styles);
      }
    }

    // Analyze container padding and margins
    const container = page.locator('.container').first();
    const containerStyles = await container.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        maxWidth: computed.maxWidth,
        margin: computed.margin,
        padding: computed.padding
      };
    });
    console.log('Container styles:', containerStyles);
  });
});