#!/usr/bin/env node
/**
 * Send test email with new design system template
 * Usage: node send-test-email.mjs [RESEND_API_KEY] [RECIPIENT_EMAIL]
 */

import { Resend } from 'resend';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get API key from command line or environment variable
const apiKey = process.argv[2] || process.env.RESEND_API_KEY;
const recipientEmail = process.argv[3] || 'tinoman@me.com';

if (!apiKey) {
  console.error('❌ Error: Resend API key required');
  console.error('Usage: node send-test-email.mjs YOUR_API_KEY [recipient@email.com]');
  console.error('Or set RESEND_API_KEY environment variable');
  process.exit(1);
}

const resend = new Resend(apiKey);

// Read the new EMAIL-1 template
const emailHtmlPath = path.join(__dirname, 'EMAIL-1-RESEARCH-INVITATION.html');
let emailHtml = fs.readFileSync(emailHtmlPath, 'utf-8');

// Replace template variables with test data
emailHtml = emailHtml.replace(/\{\{first_name\}\}/g, 'Tino');
emailHtml = emailHtml.replace(/\{\{token\}\}/g, 'test-token-12345');
emailHtml = emailHtml.replace(/\{\{unsubscribe\}\}/g, 'https://therapair.com.au/email-preferences.html?unsubscribe=test');

// Plain text version
const plainText = `Help us build a better therapist-matching system

Hi Tino,

We found your contact information in the publicly available VIC therapists register and thought you might be interested in helping shape a new approach to therapist-client matching.

As practitioners, we know that the right fit between therapist and client can change everything. Therapair is a small, non-profit initiative from Unison Mental Health that's building a new way to match people with the therapists who truly fit them—by values, lived experience, and communication style.

We have created a basic sandbox demo with placeholder therapist profiles to show the concept. However, we know the current questions are just a starting point—we need to make them much more sophisticated to create truly personalised connections between therapists and clients. That's why we are doing this research survey.

We need your help to shape the future:
• Share your insights in a short 5-7 minute research survey about what questions matter most and how many you'd be willing to answer
• If you'd like to be included when we launch, we're offering a one-year free listing (using your existing public profile)

This research is crucial—we need to understand which questions create the deepest personalisation, how many questions people will actually answer, and what options resonate most with both therapists and clients.

Your perspective as a practitioner is invaluable in shaping a platform that truly serves both therapists and clients.

JOIN THE RESEARCH SURVEY:
https://therapair.com.au/research/survey/index.html?token=test-token-12345&utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=survey&utm_email=1

Visit our homepage: https://therapair.com.au?utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=homepage&utm_email=1
Learn more about Therapair: https://therapair.com.au/documentation.html?utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=learn_more&utm_email=1

Participation is optional and non-commercial. All information is used solely for improving therapist-client matching research. Thank you for contributing your perspective to a more inclusive future of care.

Warm regards,
The Therapair Team
Unison Mental Health

---
You received this email from Therapair, a not-for-profit research initiative under Unison Mental Health.

Unsubscribe: https://therapair.com.au/email-preferences.html?unsubscribe=test
Privacy Policy: https://therapair.com.au/legal/privacy-policy.html
Consent & Removal: https://therapair.com.au/legal/consent-removal.html
Contact Us: contact@therapair.com.au
`;

async function sendEmail() {
  console.log('\n📧 Sending Test Email with New Design System');
  console.log('='.repeat(60));
  console.log(`To: ${recipientEmail}`);
  console.log('Subject: Help us build a better therapist-matching system');
  console.log('Template: EMAIL-1-RESEARCH-INVITATION.html (New Dark Navy Design)');
  console.log('='.repeat(60));

  try {
    const result = await resend.emails.send({
      from: 'Therapair Research <onboarding@resend.dev>', // Change to contact@therapair.com.au once domain is verified
      to: recipientEmail,
      subject: 'Help us build a better therapist-matching system',
      html: emailHtml,
      text: plainText,
      reply_to: 'contact@therapair.com.au',
    });

    if (result.error) {
      console.error('\n❌ Error sending email:');
      console.error(result.error);
      process.exit(1);
    }

    console.log('\n✅ Email sent successfully!');
    console.log(`📬 Message ID: ${result.data?.id || 'unknown'}`);
    console.log('\n🎨 New Design System Features:');
    console.log('   • Dark Navy (#0F1E4B) header with new logo');
    console.log('   • Inter typography (Bold wordmark, Regular tagline)');
    console.log('   • Warm Beige (#FAF8F5) background');
    console.log('   • Updated color palette throughout');
    console.log('\n💡 Next Steps:');
    console.log('   1. Check your inbox (and spam folder)');
    console.log('   2. Verify the new logo and colors display correctly');
    console.log('   3. Test all links in the email');
    console.log('   4. Check email rendering in different clients\n');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

sendEmail();

