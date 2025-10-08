import { test, expect } from '@playwright/test';

test.describe('Therapist Matching Algorithm', () => {
  test('Test 1: Gestalt therapy should match Nicki Nelis', async ({ page }) => {
    await page.goto('/therapair-standalone.html');

    // Start matching
    await page.click('#start-btn');

    // Who is seeking therapy?
    await page.click('text="For myself"');

    // Are you over 18?
    await page.click('text="Yes"');

    // Telehealth sessions
    await page.click('text="Either online or in-person"');

    // Funding
    await page.click('text="VOCAT or FAS"');

    // Timing
    await page.click('text="I\'m flexible with timing"');

    // Urgency
    await page.click('text="ASAP"');

    // Concerns - General Support
    await page.click('text="General Support"');

    // Approach - Select Gestalt specifically
    await page.click('text="Gestalt"');
    await page.click('#continue-btn');

    // Community
    await page.click('text="I\'m open to any qualified therapist"');

    // Wait for results
    await expect(page.locator('#results-section')).toBeVisible();

    // Check if Nicki Nelis appears in results (she has Gestalt in her approaches)
    const therapistCards = page.locator('.therapist-card');
    await expect(therapistCards).toHaveCount.greaterThan(0);

    // Get the text content of all therapist cards
    const cardTexts = await therapistCards.allTextContents();
    const hasNicki = cardTexts.some(text => text.includes('Nicki Nelis'));

    console.log('Therapist results for Gestalt selection:', cardTexts.map(text =>
      text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/)?.[1]
    ));

    expect(hasNicki).toBe(true);
  });

  test('Test 2: ENM relationship should match Adam Forman', async ({ page }) => {
    await page.goto('/therapair-standalone.html');

    await page.click('#start-btn');
    await page.click('text="For myself and my partner"');
    await page.click('text="Yes"');
    await page.click('text="Either online or in-person"');
    await page.click('text="VOCAT or FAS"');
    await page.click('text="I\'m flexible with timing"');
    await page.click('text="A few weeks is fine"');
    await page.click('text="Relationship Issues"');
    await page.click('text="Relationship Therapy"');
    await page.click('#continue-btn');
    await page.click('text="I\'m open to any qualified therapist"');

    await expect(page.locator('#results-section')).toBeVisible();

    const therapistCards = page.locator('.therapist-card');
    const cardTexts = await therapistCards.allTextContents();
    const hasAdam = cardTexts.some(text => text.includes('Adam Forman'));

    console.log('Therapist results for ENM/Relationship selection:', cardTexts.map(text =>
      text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/)?.[1]
    ));

    expect(hasAdam).toBe(true);
  });

  test('Test 3: Art therapy should match Meg', async ({ page }) => {
    await page.goto('/therapair-standalone.html');

    await page.click('#start-btn');
    await page.click('text="For myself"');
    await page.click('text="Yes"');
    await page.click('text="Either online or in-person"');
    await page.click('text="VOCAT or FAS"');
    await page.click('text="I\'m flexible with timing"');
    await page.click('text="ASAP"');
    await page.click('text="General Support"');
    await page.click('text="Art-based therapy"');
    await page.click('#continue-btn');
    await page.click('text="I\'m open to any qualified therapist"');

    await expect(page.locator('#results-section')).toBeVisible();

    const therapistCards = page.locator('.therapist-card');
    const cardTexts = await therapistCards.allTextContents();
    const hasMeg = cardTexts.some(text => text.includes('Meg'));

    console.log('Therapist results for Art therapy selection:', cardTexts.map(text =>
      text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/)?.[1]
    ));

    expect(hasMeg).toBe(true);
  });

  test('Test 4: Veterans support should match Emma', async ({ page }) => {
    await page.goto('/therapair-standalone.html');

    await page.click('#start-btn');
    await page.click('text="For myself"');
    await page.click('text="Yes"');
    await page.click('text="Either online or in-person"');
    await page.click('text="VOCAT or FAS"');
    await page.click('text="I\'m flexible with timing"');
    await page.click('text="ASAP"');
    await page.click('text="Other (disability, grief, etc.)"');
    await page.click('text="Trauma-specific approaches"');
    await page.click('#continue-btn');
    await page.click('text="I\'m open to any qualified therapist"');

    await expect(page.locator('#results-section')).toBeVisible();

    const therapistCards = page.locator('.therapist-card');
    const cardTexts = await therapistCards.allTextContents();
    const hasEmma = cardTexts.some(text => text.includes('Emma'));

    console.log('Therapist results for Trauma/Veterans selection:', cardTexts.map(text =>
      text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/)?.[1]
    ));

    expect(hasEmma).toBe(true);
  });

  test('Test 5: Check console logs for scoring', async ({ page }) => {
    // Listen to console logs to see scoring
    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    await page.goto('/therapair-standalone.html');

    await page.click('#start-btn');
    await page.click('text="For myself"');
    await page.click('text="Yes"');
    await page.click('text="Either online or in-person"');
    await page.click('text="VOCAT or FAS"');
    await page.click('text="I\'m flexible with timing"');
    await page.click('text="ASAP"');
    await page.click('text="General Support"');
    await page.click('text="Gestalt"');
    await page.click('#continue-btn');
    await page.click('text="I\'m open to any qualified therapist"');

    await expect(page.locator('#results-section')).toBeVisible();

    // Print console logs to see scoring process
    console.log('=== CONSOLE LOGS FROM SCORING ===');
    consoleLogs.forEach(log => {
      if (log.includes('Scoring') || log.includes('Final score') || log.includes('FINAL SCORING')) {
        console.log(log);
      }
    });
  });
});