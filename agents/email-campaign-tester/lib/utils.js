import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../.env') });

/**
 * Get environment variable with fallback
 */
export function getEnv(key, defaultValue = null) {
  return process.env[key] || defaultValue;
}

/**
 * Generate secure JWT token for survey links
 * Must match PHP's hash_hmac verification exactly
 */
export function generateToken(payload, secret = null) {
  const tokenSecret = secret || getEnv('RESEARCH_TOKEN_SECRET', 'change-me-to-a-long-random-string');
  
  function base64urlEncode(data) {
    // Handle both Buffer and string input
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf-8');
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const headerB64 = base64urlEncode(JSON.stringify(header));
  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const signedPortion = `${headerB64}.${payloadB64}`;
  
  // Generate signature - digest() returns raw binary Buffer
  // This must match PHP's hash_hmac(..., true) which returns raw binary
  const signature = crypto
    .createHmac('sha256', tokenSecret)
    .update(signedPortion)
    .digest(); // Returns Buffer of raw binary bytes
  
  // Encode the raw binary Buffer directly (matches PHP's base64url_encode of raw binary)
  const signatureB64 = base64urlEncode(signature);
  return `${signedPortion}.${signatureB64}`;
}

/**
 * Sleep/delay function
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format timestamp
 */
export function formatTimestamp(date = new Date()) {
  return date.toISOString();
}

/**
 * Extract first name from full name
 */
export function getFirstName(fullName) {
  if (!fullName) return '';
  return fullName.split(' ')[0];
}

/**
 * Log with timestamp
 */
export function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    debug: '🔍'
  }[type] || 'ℹ️';

  console.log(`[${timestamp}] ${prefix} ${message}`);
}

/**
 * Parse command line arguments
 */
export function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    command: args[0],
    flags: {},
    options: {}
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];
      
      if (nextArg && !nextArg.startsWith('--')) {
        parsed.options[key] = nextArg;
        i++;
      } else {
        parsed.flags[key] = true;
      }
    }
  }

  return parsed;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'journey') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

