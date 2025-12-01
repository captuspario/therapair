#!/usr/bin/env node
/**
 * Test script for Resend webhook endpoint
 * Tests the email-event.php webhook handler
 */

import https from 'https';
import crypto from 'crypto';

const WEBHOOK_URL = 'https://therapair.com.au/api/research/resend-webhook.php';
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || 'test-secret';

console.log('🧪 Testing Resend Webhook Endpoint\n');
console.log('URL:', WEBHOOK_URL);
console.log('Secret configured:', WEBHOOK_SECRET !== 'test-secret' ? '✅ Yes' : '❌ No (using test secret)');
console.log('');

// Create a test payload (simulating Resend webhook)
const testPayload = {
  type: 'email.clicked',
  event: 'clicked',
  created_at: new Date().toISOString(),
  data: {
    email_id: 'test-email-id-123',
    from: 'contact@therapair.com.au',
    to: ['tinokuhn@gmail.com'],
    subject: 'Test Email',
    created_at: new Date().toISOString()
  },
  message: {
    email: 'tinokuhn@gmail.com',
    to: ['tinokuhn@gmail.com']
  },
  url: 'https://therapair.com.au/research/survey/index.html?token=test-token&utm_source=email&utm_medium=research&utm_campaign=therapist_research&utm_content=survey&utm_email=1'
};

const payloadString = JSON.stringify(testPayload);

// Generate signature (Resend webhook signature format)
const timestamp = Math.floor(Date.now() / 1000);
const signed = `${timestamp}.${payloadString}`;
const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(signed).digest('hex');
const signatureHeader = `t=${timestamp},v1=${signature}`;

console.log('📤 Sending test webhook event...');
console.log('Event type: email.clicked');
console.log('Email: tinokuhn@gmail.com');
console.log('URL:', testPayload.url);
console.log('');

// Make request
const url = new URL(WEBHOOK_URL);
const options = {
  hostname: url.hostname,
  port: url.port || 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payloadString),
    'Resend-Signature': signatureHeader,
    'User-Agent': 'Resend-Webhook-Test/1.0'
  }
};

const req = https.request(options, (res) => {
  let responseBody = '';
  
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  
  res.on('end', () => {
    console.log('📥 Response:');
    console.log('Status:', res.statusCode, res.statusMessage);
    console.log('Headers:', JSON.stringify(res.headers, null, 2));
    console.log('');
    console.log('Body:');
    try {
      const json = JSON.parse(responseBody);
      console.log(JSON.stringify(json, null, 2));
      
      if (res.statusCode === 200 && json.success) {
        console.log('\n✅ Webhook test PASSED!');
        console.log('The webhook endpoint is working correctly.');
      } else if (res.statusCode === 500 && json.error?.includes('not configured')) {
        console.log('\n⚠️  Webhook secret not configured');
        console.log('Add RESEND_WEBHOOK_SECRET to config.php');
      } else if (res.statusCode === 403) {
        console.log('\n❌ Webhook signature verification failed');
        console.log('Check that RESEND_WEBHOOK_SECRET matches Resend dashboard');
      } else {
        console.log('\n⚠️  Unexpected response');
      }
    } catch (e) {
      console.log(responseBody);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
  process.exit(1);
});

req.write(payloadString);
req.end();

