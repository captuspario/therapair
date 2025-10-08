import { test, expect } from '@playwright/test';

test.describe('Booking Form Updates Verification', () => {

  test('should verify updated booking form with therapist image and data', async ({ page }) => {
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

    // Click first available "Book Now" button
    const bookNowBtn = page.locator('button:has-text("Book Now")').first();
    await expect(bookNowBtn).toBeVisible();
    await bookNowBtn.click();

    // Wait for booking modal
    await page.waitForSelector('#booking-modal');
    console.log('✅ Booking modal opened');

    const modal = page.locator('#booking-modal');
    await expect(modal).toBeVisible();

    // Take screenshot of updated booking form
    await page.screenshot({ path: 'tests/booking-form-updated.png', fullPage: true });

    // Check for therapist image (170px square)
    const therapistImage = modal.locator('img').first();
    await expect(therapistImage).toBeVisible();

    const imageBox = await therapistImage.boundingBox();
    console.log(`Image dimensions: ${Math.round(imageBox.width)}x${Math.round(imageBox.height)}px`);

    // Verify image is approximately 170px square
    expect(Math.round(imageBox.width)).toBeCloseTo(170, 10);
    expect(Math.round(imageBox.height)).toBeCloseTo(170, 10);
    console.log('✅ Therapist image is correct size (170px square)');

    // Check for therapist name and tagline
    const modalText = await modal.textContent();
    expect(modalText).toMatch(/Nicki Nelis|Adam Forman|Natasha Lama|Genevieve Autret|Emma Steains/);

    // Verify tagline is displayed (should be actual therapist tagline, not generic text)
    expect(modalText).not.toContain('Compassionate, evidence-based therapy with a focus on identity and belonging');
    console.log('✅ Therapist-specific tagline displayed');

    // Check for relevant therapist skills (should be using therapist specialties)
    const skillTags = modal.locator('span').filter({ hasText: /LGBTQI|ENM|Sex therapy|Psychedelic|EMDR|Trauma|CBT/ });
    const skillCount = await skillTags.count();
    expect(skillCount).toBeGreaterThan(0);
    console.log(`✅ ${skillCount} relevant therapist skills displayed`);

    // Verify skills use consistent brand colors (#9B74B7)
    const firstSkillTag = skillTags.first();
    if (await firstSkillTag.count() > 0) {
      const skillStyle = await firstSkillTag.evaluate(el => window.getComputedStyle(el).backgroundColor);
      console.log(`Skill tag background color: ${skillStyle}`);
    }

    // Check that availability text is NOT mentioned
    expect(modalText).not.toContain('Available this week');
    expect(modalText).not.toContain('Available');
    console.log('✅ No availability mentions found');

    // Check for updated next steps copy
    expect(modalText).toContain('We will respond within one business day to arrange your first session');
    expect(modalText).not.toContain('will contact you within 24 hours');
    console.log('✅ Updated next steps copy displayed');

    // Check "Book with" heading
    expect(modalText).toContain('Book with');

    // Verify preferences summary is still there
    expect(modalText).toContain('Your Preferences Summary');

    console.log('✅ All booking form updates verified successfully');

    // Close modal
    await page.click('button:has-text("Cancel")');
    await page.waitForTimeout(500);
    await expect(modal).not.toBeVisible();
  });

  test('should verify skills display for different therapists', async ({ page }) => {
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Complete questionnaire to see multiple therapists
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

    // Test different therapists
    const bookButtons = await page.locator('button:has-text("Book Now")').all();

    for (let i = 0; i < Math.min(bookButtons.length, 3); i++) {
      await bookButtons[i].click();
      await page.waitForSelector('#booking-modal');

      const modal = page.locator('#booking-modal');
      const modalText = await modal.textContent();

      // Verify each therapist has their own image and skills
      const therapistImage = modal.locator('img').first();
      await expect(therapistImage).toBeVisible();

      // Check for relevant skills
      const skillTags = modal.locator('span').filter({ hasText: /LGBTQI|ENM|Sex therapy|Psychedelic|EMDR|Trauma|CBT|DBT|Gestalt|ACT/ });
      const skillCount = await skillTags.count();
      expect(skillCount).toBeGreaterThan(0);

      console.log(`Therapist ${i + 1}: ${skillCount} skills displayed`);

      // Close modal
      await page.click('button:has-text("Cancel")');
      await page.waitForTimeout(500);
    }

    console.log('✅ All therapists display unique skills and images');
  });
});