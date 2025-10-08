import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('TEAM-MEMBERS.md Links Validation', () => {

  test('should validate all markdown profile and booking links', async ({ page }) => {
    // Read the TEAM-MEMBERS.md file
    const mdPath = path.join(process.cwd(), 'TEAM-MEMBERS.md');
    const mdContent = fs.readFileSync(mdPath, 'utf8');

    console.log('Validating TEAM-MEMBERS.md links...\n');

    // Expected profile links
    const expectedProfileLinks = [
      'https://unisonmentalhealth.com/meet-our-team/#team-nicki',
      'https://unisonmentalhealth.com/meet-our-team/#team-adam',
      'https://unisonmentalhealth.com/meet-our-team/#team-natasha',
      'https://unisonmentalhealth.com/meet-our-team/#team-genevieve',
      'https://unisonmentalhealth.com/meet-our-team/#team-emma',
      'https://unisonmentalhealth.com/meet-our-team/#team-michael',
      'https://unisonmentalhealth.com/meet-our-team/#team-meg',
      'https://unisonmentalhealth.com/meet-our-team/#team-joe'
    ];

    // Expected booking links
    const expectedBookingLinks = [
      'https://www.halaxy.com/book/appointment/counsellor/ms-nicki-nelis/1546141/1011071/select-time',
      'mailto:contact@unisonmentalhealth.com',
      'https://www.halaxy.com/book/appointment/psychotherapist/ms-natasha-lama/1433041/1011071',
      'https://www.halaxy.com/book/appointment/psychotherapist/ms-natasha-lama/1433041/700941',
      'https://www.halaxy.com/book/appointment/psychotherapist/ms-genevieve-autret/1475001/700941',
      'https://www.halaxy.com/book/appointment/psychologist/ms-emma-steains/1269651/1167761/select-time',
      'https://www.halaxy.com/book/appointment/counsellor/meg-wilson/830931/1011071/select-time',
      'https://www.halaxy.com/book/appointment/counsellor/meg-wilson/830931/700941'
    ];

    // Validate profile links
    console.log('--- Validating Profile Links ---');
    for (const profileLink of expectedProfileLinks) {
      const isPresent = mdContent.includes(profileLink);
      expect(isPresent).toBe(true);
      console.log(`✓ Found profile link: ${profileLink}`);
    }

    // Validate booking links
    console.log('\n--- Validating Booking Links ---');
    for (const bookingLink of expectedBookingLinks) {
      const isPresent = mdContent.includes(bookingLink);
      expect(isPresent).toBe(true);
      console.log(`✓ Found booking link: ${bookingLink}`);
    }

    // Validate markdown structure
    console.log('\n--- Validating Markdown Structure ---');

    // Check for team member sections
    const teamMembers = [
      'Nicki Nelis', 'Adam Forman', 'Natasha Lama', 'Genevieve Autret',
      'Emma Steains', 'Michael Spurrier', 'Meg Wilson', 'Joe Stark'
    ];

    for (const member of teamMembers) {
      const sectionExists = mdContent.includes(`### ${member}`);
      expect(sectionExists).toBe(true);
      console.log(`✓ Found section for: ${member}`);
    }

    // Check for required sections
    const requiredSections = [
      '# Therapair Team Members',
      '## Team Directory',
      '## Quick Links',
      '## Contact Information'
    ];

    for (const section of requiredSections) {
      const sectionExists = mdContent.includes(section);
      expect(sectionExists).toBe(true);
      console.log(`✓ Found section: ${section}`);
    }

    // Validate link formats
    console.log('\n--- Validating Link Formats ---');

    // Check profile link format
    const profileLinkRegex = /\[View Profile\]\(https:\/\/unisonmentalhealth\.com\/meet-our-team\/#team-\w+\)/g;
    const profileMatches = mdContent.match(profileLinkRegex);
    expect(profileMatches).toBeTruthy();
    expect(profileMatches.length).toBe(8); // One for each team member
    console.log(`✓ Found ${profileMatches.length} correctly formatted profile links`);

    // Check booking link formats
    const halaxyBookingRegex = /\[Book.*\]\(https:\/\/www\.halaxy\.com\/book\/appointment\//g;
    const halaxyMatches = mdContent.match(halaxyBookingRegex);
    expect(halaxyMatches).toBeTruthy();
    console.log(`✓ Found ${halaxyMatches.length} Halaxy booking links`);

    // Check email link format
    const emailLinkRegex = /\[contact@unisonmentalhealth\.com\]\(mailto:contact@unisonmentalhealth\.com\)/;
    const emailMatches = mdContent.match(emailLinkRegex);
    expect(emailMatches).toBeTruthy();
    console.log(`✓ Found email contact link`);

    console.log('\n✅ All TEAM-MEMBERS.md links validated successfully!');
  });

  test('should verify link accessibility in markdown', async ({ page }) => {
    // Convert markdown to HTML for testing (basic test)
    const mdPath = path.join(process.cwd(), 'TEAM-MEMBERS.md');
    const mdContent = fs.readFileSync(mdPath, 'utf8');

    // Create a simple HTML version for testing links
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Team Members Test</title>
    </head>
    <body>
        <div id="content">
            ${mdContent.replace(/### (.*)/g, '<h3>$1</h3>')
                      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/- (.*)/g, '<li>$1</li>')
                      .replace(/\n/g, '<br>')}
        </div>
    </body>
    </html>`;

    // Create temporary HTML file
    const tempHtmlPath = path.join(process.cwd(), 'temp-team-members.html');
    fs.writeFileSync(tempHtmlPath, htmlContent);

    try {
      // Navigate to the temporary HTML file
      await page.goto(`file://${tempHtmlPath}`);

      // Check that all links are present and have href attributes
      const allLinks = await page.locator('a').all();
      console.log(`Found ${allLinks.length} links in markdown`);

      for (const link of allLinks) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();

        expect(href).toBeTruthy();
        console.log(`✓ Link "${text}" has href: ${href}`);

        // Validate link format
        const isValidLink = href.startsWith('http') || href.startsWith('mailto:');
        expect(isValidLink).toBe(true);
      }

      console.log('\n✅ All markdown links have valid href attributes!');

    } finally {
      // Clean up temporary file
      if (fs.existsSync(tempHtmlPath)) {
        fs.unlinkSync(tempHtmlPath);
      }
    }
  });
});