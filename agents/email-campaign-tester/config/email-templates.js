import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load email templates from campaign files
 */
// Go up from lib/config to project root, then to campaigns
const templatesDir = path.join(__dirname, '../../../campaigns/email-campaign');

export function loadEmailTemplate(emailNumber, html = false) {
  const templateFiles = {
    1: html ? 'EMAIL-1-RESEARCH-INVITATION.html' : 'EMAIL-1-RESEARCH-INVITATION-PLAIN.txt',
    2: html ? 'EMAIL-2-FOLLOWUP-NONRESPONDER.html' : 'EMAIL-2-FOLLOWUP-NONRESPONDER-PLAIN.txt',
    3: html ? 'EMAIL-3-FOLLOWUP-NOCLICK.html' : 'EMAIL-3-FOLLOWUP-NOCLICK-PLAIN.txt',
    4: html ? 'EMAIL-4-FOLLOWUP-INCOMPLETE.html' : 'EMAIL-4-FOLLOWUP-INCOMPLETE-PLAIN.txt',
    5: html ? 'EMAIL-5-THANKYOU-SURVEY-COMPLETE.html' : 'EMAIL-5-THANKYOU-SURVEY-COMPLETE-PLAIN.txt'
  };

  const filename = templateFiles[emailNumber];
  if (!filename) {
    throw new Error(`No template found for email ${emailNumber}`);
  }

  const filePath = path.join(templatesDir, filename);
  if (!fs.existsSync(filePath)) {
    if (html) {
      // HTML not available, return null
      return null;
    }
    throw new Error(`Template file not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Personalize email template with persona data
 */
export function personalizeEmail(template, persona, emailNumber) {
  let personalized = template;

  // Replace basic variables
  // If no name available, use generic greeting instead of email address
  const firstName = persona.firstName || (persona.name && persona.name.includes('@') ? null : persona.name?.split(' ')[0]);
  const greeting = firstName || 'there';
  personalized = personalized.replace(/\{\{first_name\}\}/g, greeting);
  personalized = personalized.replace(/\{\{profession\}\}/g, persona.profession || 'therapist');
  personalized = personalized.replace(/\{\{region\}\}/g, persona.region || 'Victoria');

  // Replace token with actual survey token
  if (persona.token) {
    personalized = personalized.replace(/\{\{token\}\}/g, persona.token);
  }

  // Replace unsubscribe link
  const unsubscribeUrl = `https://therapair.com.au/api/research/unsubscribe.php?email=${encodeURIComponent(persona.email)}`;
  personalized = personalized.replace(/\{\{unsubscribe\}\}/g, unsubscribeUrl);

  // Ensure all links have UTM parameters
  personalized = addUtmParameters(personalized, emailNumber);

  return personalized;
}

/**
 * Add UTM parameters to all links in email
 */
function addUtmParameters(emailContent, emailNumber) {
  const baseUtm = `utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_email=${emailNumber}`;

  // Replace survey links (check if UTM params already exist)
  emailContent = emailContent.replace(
    /(https:\/\/therapair\.com\.au\/research\/survey\/index\.html\?token=[^"'\s<>]+)/g,
    (match) => {
      const cleanMatch = match.split('"')[0].split("'")[0].split('>')[0].split('<')[0];
      try {
        const url = new URL(cleanMatch);
        // If UTM params already exist, replace them
        if (url.searchParams.has('utm_source')) {
          url.searchParams.set('utm_source', 'email');
          url.searchParams.set('utm_medium', 'research');
          url.searchParams.set('utm_campaign', 'therapist_research');
          url.searchParams.set('utm_content', 'survey');
          url.searchParams.set('utm_email', emailNumber.toString());
          return url.toString();
        } else {
          // Add UTM params if they don't exist
          url.searchParams.set('utm_source', 'email');
          url.searchParams.set('utm_medium', 'research');
          url.searchParams.set('utm_campaign', 'therapist_research');
          url.searchParams.set('utm_content', 'survey');
          url.searchParams.set('utm_email', emailNumber.toString());
          return url.toString();
        }
      } catch (e) {
        // Fallback to old method if URL parsing fails
        const separator = cleanMatch.includes('?') ? '&' : '?';
        return `${cleanMatch}${separator}${baseUtm}&utm_content=survey`;
      }
    }
  );

  // Replace sandbox links
  emailContent = emailContent.replace(
    /(https:\/\/therapair\.com\.au\/sandbox[^?\s]+)/g,
    (match) => {
      const separator = match.includes('?') ? '&' : '?';
      return `${match}${separator}${baseUtm}&utm_content=sandbox`;
    }
  );

  // Replace learn more/documentation links (fix duplicate UTM params)
  emailContent = emailContent.replace(
    /(https:\/\/therapair\.com\.au\/documentation[^"'\s<>]+)/g,
    (match) => {
      // Remove existing UTM params if present
      const url = new URL(match.split('"')[0].split("'")[0].split('>')[0].split('<')[0]);
      url.searchParams.delete('utm_source');
      url.searchParams.delete('utm_medium');
      url.searchParams.delete('utm_campaign');
      url.searchParams.delete('utm_content');
      url.searchParams.delete('utm_email');
      
      // Add clean UTM params
      url.searchParams.set('utm_source', 'email');
      url.searchParams.set('utm_medium', 'research');
      url.searchParams.set('utm_campaign', 'therapist_research');
      url.searchParams.set('utm_content', 'learn_more');
      url.searchParams.set('utm_email', emailNumber.toString());
      
      return url.toString();
    }
  );

  // Replace homepage links
  emailContent = emailContent.replace(
    /(https:\/\/therapair\.com\.au[^"'\s<>?&]*)(?:\?[^"'\s<>]*)?(?=&utm_|["'\s<>]|$)/g,
    (match) => {
      // Only process if it's the root/homepage (no path or just /)
      const cleanMatch = match.replace(/["'<>]/g, '').trim();
      if (cleanMatch === 'https://therapair.com.au' || cleanMatch === 'https://therapair.com.au/') {
        const url = new URL(cleanMatch);
        url.searchParams.set('utm_source', 'email');
        url.searchParams.set('utm_medium', 'research');
        url.searchParams.set('utm_campaign', 'therapist_research');
        url.searchParams.set('utm_content', 'homepage');
        url.searchParams.set('utm_email', emailNumber.toString());
        return url.toString();
      }
      return match;
    }
  );

  return emailContent;
}

/**
 * Extract all links from email content
 */
export function extractLinks(emailContent) {
  const linkRegex = /https?:\/\/[^\s\)]+/g;
  const links = emailContent.match(linkRegex) || [];
  
  return links.map(url => {
    try {
      const urlObj = new URL(url);
      const params = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      
      return {
        url,
        domain: urlObj.hostname,
        path: urlObj.pathname,
        params,
        hasUtm: 'utm_source' in params || 'utm_medium' in params
      };
    } catch (e) {
      return {
        url,
        error: e.message
      };
    }
  });
}

/**
 * Get email subject line
 */
export function getEmailSubject(emailNumber) {
  // Basic subjects (Variant A)
  const baseSubjects = {
    1: 'Help us build a better therapist-matching system (invitation inside)',
    2: 'Quick reminder: Share your insights on therapist matching',
    3: 'Don\'t miss this opportunity to shape the future',
    4: 'Complete your contribution (2 minutes left)',
    5: 'Thank you for helping shape Therapair + next steps'
  };

  // Simple A/B test for Email 1 subject line
  if (emailNumber === 1) {
    const variants = [
      'Help us build a better therapist-matching system (invitation inside)', // A
      'What questions really matter for therapist–client matching?' // B
    ];
    // Pseudo-random split; subject line itself will indicate variant in analytics
    const index = Math.random() < 0.5 ? 0 : 1;
    return variants[index];
  }

  return baseSubjects[emailNumber] || `Therapair Research - Email ${emailNumber}`;
}

