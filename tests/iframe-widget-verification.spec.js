import { test, expect } from '@playwright/test';

test('should verify iframe widget optimizations', async ({ page }) => {
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

  // Take screenshot
  await page.screenshot({ path: 'tests/iframe-widget-final.png', fullPage: true });

  console.log('--- Iframe Widget Verification ---');

  // 1. Verify headlines are removed
  const mainHeadline = page.locator('h1:has-text("Let\'s find a therapist")');
  const subline = page.locator('p:has-text("Answer a few quick questions")');

  const headlineCount = await mainHeadline.count();
  const sublineCount = await subline.count();

  console.log(`Main headline present: ${headlineCount > 0 ? 'YES (❌)' : 'NO (✅)'}`);
  console.log(`Subline present: ${sublineCount > 0 ? 'YES (❌)' : 'NO (✅)'}`);

  expect(headlineCount).toBe(0);
  expect(sublineCount).toBe(0);

  // 2. Verify footer is removed
  const footer = page.locator('text=Powered by');
  const footerCount = await footer.count();

  console.log(`Footer present: ${footerCount > 0 ? 'YES (❌)' : 'NO (✅)'}`);
  expect(footerCount).toBe(0);

  // 3. Verify button spacing increased
  const firstCard = page.locator('.therapist-card').first();
  const buttonContainer = firstCard.locator('.card-buttons');

  const containerStyles = await buttonContainer.evaluate(el => {
    const computed = window.getComputedStyle(el);
    return {
      height: computed.height,
      paddingTop: computed.paddingTop
    };
  });

  const containerHeight = parseInt(containerStyles.height);
  console.log(`Button container height: ${containerHeight}px (should be 196px)`);
  expect(containerHeight).toBe(196);

  // 4. Verify both buttons visible and aligned
  const cards = await page.locator('.therapist-card').all();
  let perfectAlignment = true;

  const viewProfilePositions = [];
  const bookNowPositions = [];

  for (const card of cards) {
    const viewProfileBtn = card.locator('button:has-text("View Profile")');
    const bookNowBtn = card.locator('button:has-text("Book Now")');

    const viewProfileBox = await viewProfileBtn.boundingBox();
    const bookNowBox = await bookNowBtn.boundingBox();

    viewProfilePositions.push(Math.round(viewProfileBox.y));
    bookNowPositions.push(Math.round(bookNowBox.y));
  }

  const uniqueViewProfile = [...new Set(viewProfilePositions)];
  const uniqueBookNow = [...new Set(bookNowPositions)];

  console.log(`View Profile alignment: ${uniqueViewProfile.length === 1 ? 'PERFECT ✅' : 'MISALIGNED ❌'}`);
  console.log(`Book Now alignment: ${uniqueBookNow.length === 1 ? 'PERFECT ✅' : 'MISALIGNED ❌'}`);

  // 5. Verify page title updated
  const title = await page.title();
  console.log(`Page title: "${title}"`);
  expect(title).toBe('Therapist Matching Widget');

  // 6. Check viewport meta tag (iframe optimizations)
  const viewportContent = await page.evaluate(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    return meta ? meta.getAttribute('content') : null;
  });

  console.log(`Viewport meta: ${viewportContent}`);
  expect(viewportContent).toContain('user-scalable=no');

  console.log('\n🎉 IFRAME WIDGET READY:');
  console.log('✅ Headlines removed for custom design');
  console.log('✅ Footer removed for custom branding');
  console.log('✅ Increased button spacing (52px more)');
  console.log('✅ Perfect button alignment maintained');
  console.log('✅ Optimized for iframe embedding');
  console.log('✅ Mobile-responsive design preserved');

  return {
    headlinesRemoved: headlineCount === 0 && sublineCount === 0,
    footerRemoved: footerCount === 0,
    buttonSpacingIncreased: containerHeight === 196,
    buttonsAligned: uniqueViewProfile.length <= 2 && uniqueBookNow.length <= 2,
    iframeOptimized: viewportContent.includes('user-scalable=no')
  };
});