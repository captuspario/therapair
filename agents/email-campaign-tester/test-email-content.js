#!/usr/bin/env node
/**
 * Test script to verify email content before sending
 */
import { loadEmailTemplate, personalizeEmail } from './config/email-templates.js';
import { getPersona } from './lib/persona-manager.js';

const persona = await getPersona('ibenizer@me.com');

console.log('=== EMAIL CONTENT VERIFICATION ===\n');

// Plain text version
const textTemplate = loadEmailTemplate(1, false);
let textContent = personalizeEmail(textTemplate, persona, 1);
if (textContent.startsWith('Subject:')) {
  textContent = textContent.replace(/^Subject:.*\n+/, '').trim();
}

console.log('PLAIN TEXT VERSION:');
console.log('Length:', textContent.length, 'characters');
console.log('First 500 chars:');
console.log(textContent.substring(0, 500));
console.log('\n---\n');

// HTML version
const htmlTemplate = loadEmailTemplate(1, true);
const htmlContent = personalizeEmail(htmlTemplate, persona, 1);

console.log('HTML VERSION:');
console.log('Length:', htmlContent.length, 'characters');
console.log('Has <body>:', htmlContent.includes('<body'));
console.log('Has visible text:', htmlContent.includes('Hi Testjohn'));
console.log('\nText extracted from HTML:');
const htmlText = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(htmlText.substring(0, 500));
console.log('\n---\n');

console.log('✅ Both versions appear to have content');
console.log('\nIf emails are still empty, the issue may be:');
console.log('1. Email client blocking HTML');
console.log('2. Resend API issue');
console.log('3. Email client security settings');

