#!/usr/bin/env node
/**
 * Test script to verify token generation matches PHP verification
 * This helps debug "Invalid token signature" errors
 */

import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const secret = process.env.RESEARCH_TOKEN_SECRET || 'change-me-to-a-long-random-string';

console.log('🔍 Token Signature Verification Test\n');
console.log('Secret length:', secret.length);
console.log('Secret preview:', secret.substring(0, 20) + '...\n');

function base64urlEncode(data) {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf-8');
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64urlDecode(str) {
  // Add padding if needed
  let padded = str;
  const padding = 4 - (str.length % 4);
  if (padding < 4) {
    padded += '='.repeat(padding);
  }
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
}

// Generate a test token exactly like persona-manager does
const testPayload = {
  therapist_id: 'TEST-123456',
  therapist_name: 'Test User',
  first_name: 'Test',
  email: 'test@example.com',
  profession: 'Therapist',
  region: 'Victoria',
  test_persona: true,
  exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
};

console.log('📝 Test Payload:');
console.log(JSON.stringify(testPayload, null, 2));
console.log('');

// Generate token
const header = { alg: 'HS256', typ: 'JWT' };
const headerB64 = base64urlEncode(JSON.stringify(header));
const payloadB64 = base64urlEncode(JSON.stringify(testPayload));
const signedPortion = `${headerB64}.${payloadB64}`;

console.log('🔐 Generating signature...');
const signature = crypto.createHmac('sha256', secret).update(signedPortion).digest();
const signatureB64 = base64urlEncode(signature);

const token = `${signedPortion}.${signatureB64}`;

console.log('✅ Token generated');
console.log('Token length:', token.length);
console.log('Token parts:', token.split('.').length, '(should be 3)');
console.log('Token preview:', token.substring(0, 80) + '...\n');

// Now verify it the PHP way
console.log('🔍 Verifying token (PHP algorithm)...');
const parts = token.split('.');
if (parts.length !== 3) {
  console.error('❌ Token has wrong number of parts');
  process.exit(1);
}

const [headerB64Check, payloadB64Check, signatureB64Check] = parts;
const signedPortionCheck = `${headerB64Check}.${payloadB64Check}`;

// PHP: base64url_encode(hash_hmac('sha256', $signedPortion, $secret, true))
// The 'true' parameter means return raw binary
const expectedSignature = crypto.createHmac('sha256', secret).update(signedPortionCheck).digest();
const expectedSignatureB64 = base64urlEncode(expectedSignature);

console.log('Expected signature (first 40 chars):', expectedSignatureB64.substring(0, 40) + '...');
console.log('Actual signature (first 40 chars):  ', signatureB64Check.substring(0, 40) + '...');
console.log('');

if (expectedSignatureB64 === signatureB64Check) {
  console.log('✅ SIGNATURE MATCHES! Token should work with PHP verification.\n');
  
  // Decode and verify payload
  try {
    const payloadJson = base64urlDecode(payloadB64Check);
    const decodedPayload = JSON.parse(payloadJson);
    console.log('✅ Payload decoded successfully:');
    console.log('   Email:', decodedPayload.email);
    console.log('   Expires:', new Date(decodedPayload.exp * 1000).toISOString());
    console.log('   Valid:', decodedPayload.exp > Math.floor(Date.now() / 1000) ? 'Yes' : 'No (expired)');
  } catch (e) {
    console.error('❌ Failed to decode payload:', e.message);
  }
} else {
  console.error('❌ SIGNATURE MISMATCH! Token will fail PHP verification.');
  console.error('This means RESEARCH_TOKEN_SECRET might not match between Node.js and PHP.\n');
  console.error('Check:');
  console.error('  1. Node.js .env file: RESEARCH_TOKEN_SECRET=' + secret.substring(0, 20) + '...');
  console.error('  2. PHP config.php: define(\'RESEARCH_TOKEN_SECRET\', \'...\');');
  console.error('  3. They must be EXACTLY the same string.\n');
  process.exit(1);
}

