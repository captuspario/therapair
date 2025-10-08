import { test, expect } from '@playwright/test';

test.describe('Therapair Widget', () => {
  test('loads the homepage correctly', async ({ page }) => {
    await page.goto('/therapair-standalone.html');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText("Let's find a therapist who's right for you");
    
    // Check start button
    await expect(page.locator('#start-btn')).toContainText('Start Matching');
  });

  test('starts the matching process', async ({ page }) => {
    await page.goto('/therapair-standalone.html');
    
    // Click start button
    await page.click('#start-btn');
    
    // Should show the first question
    await expect(page.locator('#chat-interface')).toBeVisible();
    await expect(page.locator('.chat-message')).toContainText('Who is seeking therapy?');
  });

  test('completes the questionnaire flow', async ({ page }) => {
    await page.goto('/therapair-standalone.html');
    
    // Start matching
    await page.click('#start-btn');
    
    // Answer first question: Who is seeking therapy?
    await page.click('text="For myself"');
    
    // Wait for next question and answer
    await expect(page.locator('.chat-message')).toContainText('over 18');
    await page.click('text="Yes"');
    
    // Continue through a few more questions...
    await expect(page.locator('.chat-message')).toContainText('telehealth sessions');
    await page.click('text="Either online or in-person"');
    
    // Should eventually reach results
    // Note: This test can be extended to go through the full flow
  });

  test('displays therapist results', async ({ page }) => {
    await page.goto('/therapair-standalone.html');
    
    // Complete questionnaire quickly (you might want to create a helper function)
    await page.click('#start-btn');
    
    // Fast-track through questions for testing
    const questions = [
      'For myself',
      'Yes', 
      'Either online or in-person',
      'VOCAT or FAS',
      'I\'m flexible with timing',
      'ASAP',
      'General Support',
      'No preference/unsure',
      'I\'m open to any qualified therapist'
    ];
    
    for (const answer of questions) {
      await page.click(`text="${answer}"`);
      await page.waitForTimeout(500); // Wait between clicks
    }
    
    // Should see results
    await expect(page.locator('#results-section')).toBeVisible();
    await expect(page.locator('h2')).toContainText('These therapists matching most of your preferences');
    
    // Check that therapist cards are displayed
    await expect(page.locator('.therapist-card')).toHaveCount.greaterThan(0);
  });

  test('therapist images load correctly', async ({ page }) => {
    await page.goto('/therapair-standalone.html');
    
    // Complete flow to results (using helper or direct navigation)
    // ... complete questionnaire ...
    
    // Check that images load
    const images = page.locator('.therapist-card img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // Check that image src contains resized folder
      const src = await img.getAttribute('src');
      expect(src).toContain('images/resized/');
    }
  });

  test('view profile buttons work', async ({ page }) => {
    await page.goto('/therapair-standalone.html');
    
    // Complete flow to results
    // ... 
    
    // Check view profile button
    const viewProfileBtn = page.locator('text="View Profile"').first();
    await expect(viewProfileBtn).toBeVisible();
    
    // Test that it opens the correct URL
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      viewProfileBtn.click()
    ]);
    
    expect(newPage.url()).toContain('unisonmentalhealth.com/meet-our-team');
  });
});
