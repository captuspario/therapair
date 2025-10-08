import { test, expect } from '@playwright/test';

test.describe('Profile and Booking Links Validation', () => {

  test('should validate all profile and booking links', async ({ page, context }) => {
    // Start the server and navigate to the page
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Start the matching process
    await page.click('#start-btn');

    // Fill out the questionnaire to get to results with all therapists
    // Question 1: Who is seeking therapy?
    await page.waitForSelector('.option-button');
    await page.click('button:has-text("For myself")');

    // Question 2: Age
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Yes")');

    // Question 3: Location
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("Either online or in-person")');

    // Question 4: Concerns (multiple choice) - select broad concerns to get more therapists
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("General Support")');
    await page.click('#continue-btn');

    // Question 5: Funding (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("None of these apply")');
    await page.click('#continue-btn');

    // Question 6: Availability (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m flexible with timing")');
    await page.click('#continue-btn');

    // Question 7: Urgency
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I don\'t mind waiting for the right therapist")');

    // Question 8: Approach (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("No preference/unsure")');
    await page.click('#continue-btn');

    // Question 9: Community (multiple choice)
    await page.waitForSelector('.option-button:not(:disabled)');
    await page.click('button:has-text("I\'m open to any qualified therapist")');
    await page.click('#continue-btn');

    // Wait for results to appear
    await page.waitForSelector('#results-section:not(.hidden)');
    await page.waitForTimeout(2000); // Allow animations to complete

    // Get all therapist cards
    const therapistCards = await page.locator('.therapist-card').all();
    console.log(`Found ${therapistCards.length} therapist cards to test`);

    // Expected profile links mapping
    const expectedProfileLinks = {
      'Nicki Nelis': 'https://unisonmentalhealth.com/meet-our-team/#team-nicki',
      'Adam Forman': 'https://unisonmentalhealth.com/meet-our-team/#team-adam',
      'Natasha Lama': 'https://unisonmentalhealth.com/meet-our-team/#team-natasha',
      'Genevieve Autret': 'https://unisonmentalhealth.com/meet-our-team/#team-genevieve',
      'Emma Steains': 'https://unisonmentalhealth.com/meet-our-team/#team-emma',
      'Michael Spurrier': 'https://unisonmentalhealth.com/meet-our-team/#team-michael',
      'Meg Wilson': 'https://unisonmentalhealth.com/meet-our-team/#team-meg',
      'Joe Stark': 'https://unisonmentalhealth.com/meet-our-team/#team-joe'
    };

    // Expected booking links mapping
    const expectedBookingInfo = {
      'Nicki Nelis': {
        type: 'single',
        url: 'https://www.halaxy.com/book/appointment/counsellor/ms-nicki-nelis/1546141/1011071/select-time'
      },
      'Adam Forman': {
        type: 'email',
        email: 'contact@unisonmentalhealth.com'
      },
      'Natasha Lama': {
        type: 'dual',
        inPerson: 'https://www.halaxy.com/book/appointment/psychotherapist/ms-natasha-lama/1433041/1011071',
        telehealth: 'https://www.halaxy.com/book/appointment/psychotherapist/ms-natasha-lama/1433041/700941'
      },
      'Genevieve Autret': {
        type: 'single',
        url: 'https://www.halaxy.com/book/appointment/psychotherapist/ms-genevieve-autret/1475001/700941'
      },
      'Emma Steains': {
        type: 'single',
        url: 'https://www.halaxy.com/book/appointment/psychologist/ms-emma-steains/1269651/1167761/select-time'
      },
      'Meg Wilson': {
        type: 'dual',
        inPerson: 'https://www.halaxy.com/book/appointment/counsellor/meg-wilson/830931/1011071/select-time',
        telehealth: 'https://www.halaxy.com/book/appointment/counsellor/meg-wilson/830931/700941'
      },
      'Joe Stark': {
        type: 'unavailable'
      }
    };

    // Test each therapist card
    for (let i = 0; i < therapistCards.length; i++) {
      const card = therapistCards[i];

      // Get therapist name
      const nameElement = await card.locator('h3').first();
      const therapistName = await nameElement.textContent();

      console.log(`\nTesting card for: ${therapistName}`);

      // Test Profile Link
      const profileBtn = card.locator('button:has-text("View Profile")');
      await expect(profileBtn).toBeVisible();

      // Get the onclick attribute to check the URL
      const onclickAttr = await profileBtn.getAttribute('onclick');
      const expectedProfileUrl = expectedProfileLinks[therapistName];

      if (expectedProfileUrl) {
        expect(onclickAttr).toContain(expectedProfileUrl);
        console.log(`✓ Profile link verified for ${therapistName}: ${expectedProfileUrl}`);
      } else {
        console.log(`⚠ No expected profile link defined for ${therapistName}`);
      }

      // Test Booking Links/Buttons
      const bookingInfo = expectedBookingInfo[therapistName];

      if (bookingInfo) {
        switch (bookingInfo.type) {
          case 'single':
            const singleBookBtn = card.locator('button:has-text("Book Now")');
            await expect(singleBookBtn).toBeVisible();
            const singleOnclick = await singleBookBtn.getAttribute('onclick');
            expect(singleOnclick).toContain(bookingInfo.url);
            console.log(`✓ Single booking link verified for ${therapistName}`);
            break;

          case 'email':
            const emailBtn = card.locator('button:has-text("Contact via Email")');
            await expect(emailBtn).toBeVisible();
            const emailOnclick = await emailBtn.getAttribute('onclick');
            expect(emailOnclick).toContain(`mailto:${bookingInfo.email}`);
            console.log(`✓ Email contact verified for ${therapistName}: ${bookingInfo.email}`);
            break;

          case 'dual':
            const inPersonBtn = card.locator('button:has-text("Book In-Person")');
            const telehealthBtn = card.locator('button:has-text("Book Telehealth")');

            await expect(inPersonBtn).toBeVisible();
            await expect(telehealthBtn).toBeVisible();

            const inPersonOnclick = await inPersonBtn.getAttribute('onclick');
            const telehealthOnclick = await telehealthBtn.getAttribute('onclick');

            expect(inPersonOnclick).toContain(bookingInfo.inPerson);
            expect(telehealthOnclick).toContain(bookingInfo.telehealth);

            console.log(`✓ Dual booking links verified for ${therapistName}`);
            break;

          case 'unavailable':
            const unavailableText = card.locator('span:has-text("Currently Unavailable")');
            await expect(unavailableText).toBeVisible();
            console.log(`✓ Unavailable status verified for ${therapistName}`);
            break;

          default:
            console.log(`⚠ Unknown booking type for ${therapistName}`);
        }
      } else {
        console.log(`⚠ No expected booking info defined for ${therapistName}`);
      }
    }

    // Test that profile links have correct structure and are accessible
    console.log('\n--- Testing Profile Link Accessibility ---');
    const allProfileBtns = await page.locator('button:has-text("View Profile")').all();

    for (const btn of allProfileBtns) {
      // Check aria-label exists
      const ariaLabel = await btn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('View full profile for');

      // Check button is focusable
      await btn.focus();
      const isFocused = await btn.evaluate(el => document.activeElement === el);
      expect(isFocused).toBe(true);
    }

    // Test that booking buttons have proper accessibility
    console.log('\n--- Testing Booking Button Accessibility ---');
    const allBookingBtns = await page.locator('.btn-book, button:has-text("Contact via Email")').all();

    for (const btn of allBookingBtns) {
      // Check aria-label exists
      const ariaLabel = await btn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();

      // Check button is focusable
      await btn.focus();
      const isFocused = await btn.evaluate(el => document.activeElement === el);
      expect(isFocused).toBe(true);
    }

    console.log('\n✅ All profile and booking links validated successfully!');
  });

  test('should validate external link behavior', async ({ page, context }) => {
    // Navigate to the page
    await page.goto('file:///Users/tino/Projects/therapair-website/therapair-standalone.html');

    // Complete questionnaire quickly to get results
    await page.click('#start-btn');
    await page.waitForSelector('.option-button');

    // Fill out minimal questionnaire
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
    await page.waitForTimeout(1000);

    // Test that clicking a profile button would open in new tab
    const firstProfileBtn = page.locator('button:has-text("View Profile")').first();
    await expect(firstProfileBtn).toBeVisible();

    // Check the onclick attribute contains window.open with _blank
    const onclick = await firstProfileBtn.getAttribute('onclick');
    expect(onclick).toContain("window.open");
    expect(onclick).toContain("_blank");

    console.log('✓ Profile links configured to open in new tabs');

    // Test booking button behavior
    const bookingBtns = await page.locator('.btn-book').all();
    if (bookingBtns.length > 0) {
      const firstBookingBtn = bookingBtns[0];
      const bookingOnclick = await firstBookingBtn.getAttribute('onclick');

      // Should either be window.open for Halaxy links or window.location.href for email
      const isValidBookingAction = bookingOnclick.includes('window.open') ||
                                   bookingOnclick.includes('window.location.href') ||
                                   bookingOnclick.includes('mailto:');

      expect(isValidBookingAction).toBe(true);
      console.log('✓ Booking buttons have valid actions');
    }

    console.log('✅ External link behavior validated successfully!');
  });
});