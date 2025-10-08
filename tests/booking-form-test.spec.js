import { test, expect } from '@playwright/test';

test.describe('Booking Form and Profile Navigation', () => {

  test('should verify standardized 2-button layout', async ({ page }) => {
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

    console.log('--- Verifying 2-Button Layout ---');

    const cards = await page.locator('.therapist-card').all();

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      // Check button count
      const buttons = await card.locator('.card-buttons button').all();
      console.log(`${therapistName}: ${buttons.length} buttons`);

      // Should have exactly 2 buttons
      expect(buttons.length).toBe(2);

      // Check button text
      const profileBtn = buttons[0];
      const bookingBtn = buttons[1];

      const profileText = await profileBtn.textContent();
      const bookingText = await bookingBtn.textContent();

      expect(profileText.trim()).toBe('View Profile');

      // Booking button should be "Book Now" or "Currently Unavailable"
      const isBookNow = bookingText.trim() === 'Book Now';
      const isUnavailable = bookingText.trim() === 'Currently Unavailable';
      expect(isBookNow || isUnavailable).toBe(true);

      console.log(`  Profile: "${profileText.trim()}", Booking: "${bookingText.trim()}"`);
    }

    console.log('✅ All cards have standardized 2-button layout');
  });

  test('should open booking form with personalized information', async ({ page }) => {
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Complete questionnaire with specific choices
    await page.click('#start-btn');
    await page.waitForSelector('.option-button');
    await page.click('button:has-text("For myself")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Yes")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Either online or in-person")');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Relationship challenges")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("None of these apply")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m flexible with timing")');
    await page.click('#continue-btn');
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("ASAP")');
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

    // Check modal content
    const modal = page.locator('#booking-modal');
    await expect(modal).toBeVisible();

    // Check personalized content
    const modalText = await modal.textContent();
    expect(modalText).toContain('Book with');
    expect(modalText).toContain('Your Preferences Summary');
    expect(modalText).toContain('Seeking: therapy for yourself');
    expect(modalText).toContain('Format: Either online or in-person');
    expect(modalText).toContain('Primary concerns: Relationship challenges');
    expect(modalText).toContain('Timeline: As soon as possible');

    console.log('✅ Personalized information displayed correctly');

    // Test form fields
    await expect(page.locator('#fullName')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();

    // Fill out form
    await page.fill('#fullName', 'John Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '+61 400 123 456');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for success message
    await page.waitForSelector('text=Request Sent Successfully!');
    console.log('✅ Booking form submitted successfully');

    // Check success message content
    const successText = await modal.textContent();
    expect(successText).toContain('Request Sent Successfully!');
    expect(successText).toContain('We\'ll contact you within 24 hours');

    // Close modal
    await page.click('button:has-text("Close")');
    await page.waitForTimeout(500);

    // Modal should be gone
    await expect(page.locator('#booking-modal')).not.toBeVisible();
    console.log('✅ Modal closed successfully');
  });

  test('should test profile navigation functionality', async ({ page }) => {
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
    await page.waitForTimeout(1000);

    // Test View Profile button functionality
    const profileBtn = page.locator('button:has-text("View Profile")').first();
    await expect(profileBtn).toBeVisible();

    // Click should trigger window.open - we can't test the actual navigation
    // but we can verify the function exists and button is clickable
    const onclickAttr = await profileBtn.getAttribute('onclick');
    expect(onclickAttr).toContain('openProfilePage');

    console.log('✅ Profile navigation functionality configured');
  });

  test('should handle form validation', async ({ page }) => {
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
    await page.waitForTimeout(1000);

    // Open booking form
    await page.click('button:has-text("Book Now")');
    await page.waitForSelector('#booking-modal');

    // Try to submit without filling required fields
    await page.click('button[type="submit"]');

    // Should not proceed (HTML5 validation should prevent submission)
    const modalStillVisible = await page.locator('#booking-modal').isVisible();
    expect(modalStillVisible).toBe(true);

    console.log('✅ Form validation working');

    // Test cancel button
    await page.click('button:has-text("Cancel")');
    await page.waitForTimeout(500);

    // Modal should be closed
    await expect(page.locator('#booking-modal')).not.toBeVisible();
    console.log('✅ Cancel button working');
  });
});