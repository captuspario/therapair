import { getEnv, log, getFirstName } from './utils.js';
import { loadEmailTemplate, personalizeEmail, getEmailSubject } from '../config/email-templates.js';
import { Resend } from 'resend';
import { createPersona, getPersona } from './persona-manager.js';

const RESEND_API_KEY = getEnv('RESEND_API_KEY');
// Use verified domain with sender name
const FROM_EMAIL = getEnv('FROM_EMAIL', 'Therapair User Research <user-research@therapair.com.au>');

/**
 * Send email via Resend MCP (mock mode)
 */
async function sendEmailMock(persona, emailNumber, personalizedContent) {
  const subject = getEmailSubject(emailNumber);
  
  log(`[MOCK] Would send email ${emailNumber} to ${persona.email}`, 'info');
  log(`[MOCK] Subject: ${subject}`, 'debug');
  log(`[MOCK] Content length: ${personalizedContent.length} characters`, 'debug');

  return {
    id: `mock-${Date.now()}`,
    to: persona.email,
    from: FROM_EMAIL,
    subject,
    sentAt: new Date(),
    mock: true
  };
}

/**
 * Send email via Resend SDK (real mode)
 * Uses Resend SDK directly (same as Resend MCP server uses)
 */
async function sendEmailReal(persona, emailNumber, personalizedContent, htmlContent = null) {
  // Try to get API key from environment
  const apiKey = RESEND_API_KEY || process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured. Use --mock flag for testing or set RESEND_API_KEY in .env');
  }

  const subject = getEmailSubject(emailNumber);
  
  // Clean up the content - remove "Subject:" line if present (it's already in the subject field)
  let emailBody = personalizedContent;
  if (emailBody.startsWith('Subject:')) {
    // Remove "Subject: ..." line and the following blank lines
    emailBody = emailBody.replace(/^Subject:.*\n+/, '').trim();
  }
  
  log(`Sending email ${emailNumber} to ${persona.email} via Resend SDK...`, 'info');

  // Use Resend SDK (same as Resend MCP server uses)
  try {
    const resend = new Resend(apiKey);
    
    // Always send both HTML and text for maximum compatibility
    const emailPayload = {
      from: FROM_EMAIL,
      to: persona.email,
      subject,
      text: emailBody,  // Plain text fallback (always included)
    };
    
    if (htmlContent) {
      // Ensure HTML is properly formatted for email clients
      emailPayload.html = htmlContent;
      log(`Including HTML content (${htmlContent.length} chars) and text fallback (${emailBody.length} chars)`, 'debug');
    } else {
      log(`Sending plain text only (${emailBody.length} chars)`, 'debug');
    }
    
    log(`Email payload: from=${FROM_EMAIL}, to=${persona.email}, subject=${subject}, hasHtml=${!!emailPayload.html}, hasText=${!!emailPayload.text}`, 'debug');
    
    const result = await resend.emails.send(emailPayload);

    if (result.error) {
      throw new Error(`Resend API error: ${JSON.stringify(result.error)}`);
    }

    log(`Email sent successfully: ${result.data?.id}`, 'success');

    return {
      id: result.data?.id || `resend-${Date.now()}`,
      to: persona.email,
      from: FROM_EMAIL,
      subject,
      sentAt: new Date(),
      mock: false
    };
  } catch (error) {
    log(`Failed to send email: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Send email to persona or email address
 * If an email string is provided instead of a persona object, automatically creates a tester entry
 */
export async function sendEmail(personaOrEmail, emailNumber, mockMode = false) {
  try {
    let persona = personaOrEmail;
    
    // If email string provided, automatically create/find persona
    if (typeof personaOrEmail === 'string' && personaOrEmail.includes('@')) {
      log(`Email address provided: ${personaOrEmail}. Checking for existing tester...`, 'info');
      
      // Try to find existing persona
      persona = await getPersona(personaOrEmail);
      
      if (!persona) {
        // Auto-create tester entry with default values
        log(`No tester found. Creating new tester entry for ${personaOrEmail}...`, 'info');
        
        // Extract name from email if possible, or use default
        const emailName = personaOrEmail.split('@')[0];
        const defaultName = emailName.split(/[._-]/).map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ') || 'Test User';
        
        persona = await createPersona({
          name: defaultName,
          email: personaOrEmail,
          profession: 'Therapist',
          region: 'Victoria'
        });
        
        log(`✅ Tester entry created: ${persona.name} (${persona.email})`, 'success');
        log(`Token generated: ${persona.token.substring(0, 50)}...`, 'info');
      } else {
        log(`✅ Using existing tester: ${persona.name} (${persona.email})`, 'info');
      }
    }
    
    // Validate persona object
    if (!persona || !persona.email) {
      throw new Error('Invalid persona: must have email address');
    }
    
    // Load and personalize email template
    const template = loadEmailTemplate(emailNumber);
    const personalizedContent = personalizeEmail(template, persona, emailNumber);
    const subject = getEmailSubject(emailNumber);

    if (mockMode) {
      return await sendEmailMock(persona, emailNumber, personalizedContent);
    } else {
      // For real emails, also prepare HTML content if available
      let htmlContent = null;
      try {
        const htmlTemplate = loadEmailTemplate(emailNumber, true);
        if (htmlTemplate) {
          htmlContent = personalizeEmail(htmlTemplate, persona, emailNumber);
          log(`HTML template loaded and personalized (${htmlContent.length} chars)`, 'debug');
        }
      } catch (error) {
        // HTML template not available, use plain text only
        log(`HTML template not available: ${error.message}`, 'debug');
      }
      return await sendEmailReal(persona, emailNumber, personalizedContent, htmlContent);
    }
  } catch (error) {
    log(`Error sending email ${emailNumber}: ${error.message}`, 'error');
    throw error;
  }
}

/**
 * Get email content (for testing/verification)
 * If email string provided, automatically gets/creates persona
 */
export async function getEmailContent(personaOrEmail, emailNumber) {
  let persona = personaOrEmail;
  
  // If email string provided, get or create persona
  if (typeof personaOrEmail === 'string' && personaOrEmail.includes('@')) {
    persona = await getPersona(personaOrEmail);
    if (!persona) {
      // Auto-create if not found
      const emailName = personaOrEmail.split('@')[0];
      const defaultName = emailName.split(/[._-]/).map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ') || 'Test User';
      
      persona = await createPersona({
        name: defaultName,
        email: personaOrEmail,
        profession: 'Therapist',
        region: 'Victoria'
      });
    }
  }
  
  if (!persona || !persona.email) {
    throw new Error('Invalid persona: must have email address');
  }
  
  const template = loadEmailTemplate(emailNumber);
  const personalizedContent = personalizeEmail(template, persona, emailNumber);
  const subject = getEmailSubject(emailNumber);

  return {
    subject,
    content: personalizedContent,
    to: persona.email,
    from: FROM_EMAIL
  };
}

