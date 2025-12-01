#!/usr/bin/env node
/**
 * Convenience function to send a test email to an email address
 * Automatically creates tester entry if needed
 */

import { sendEmail } from './email-sender.js';
import { log } from './utils.js';

/**
 * Send a test email to an email address
 * Automatically creates a tester entry in the database if one doesn't exist
 * 
 * @param {string} email - Email address to send to
 * @param {number} emailNumber - Email number (1-5)
 * @param {object} options - Optional persona attributes (name, profession, region)
 * @param {boolean} mockMode - Whether to use mock mode
 * @returns {Promise<object>} Email sending result
 */
export async function sendTestEmail(email, emailNumber = 1, options = {}, mockMode = false) {
  try {
    log(`Preparing to send email ${emailNumber} to ${email}...`, 'info');
    
    // sendEmail will automatically create persona if email string is provided
    const result = await sendEmail(email, emailNumber, mockMode);
    
    log(`✅ Test email sent successfully!`, 'success');
    log(`Email ID: ${result.id}`, 'info');
    log(`Recipient: ${result.to}`, 'info');
    
    return result;
  } catch (error) {
    log(`Failed to send test email: ${error.message}`, 'error');
    throw error;
  }
}

