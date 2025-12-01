import { extractLinks } from '../config/email-templates.js';
import { log } from './utils.js';

/**
 * Test a single link
 */
export async function testLink(url, expectedUtmParams = {}) {
  try {
    log(`Testing link: ${url}`, 'debug');

    // Make HTTP request
    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD to avoid downloading full content
      redirect: 'follow',
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    const status = response.status;
    const finalUrl = response.url; // After redirects

    // Parse URL to check UTM parameters
    const urlObj = new URL(finalUrl);
    const actualParams = {};
    urlObj.searchParams.forEach((value, key) => {
      actualParams[key] = value;
    });

    // Verify expected UTM parameters
    const utmCheck = {};
    const requiredUtm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_email'];
    
    for (const param of requiredUtm) {
      if (expectedUtmParams[param]) {
        utmCheck[param] = actualParams[param] === expectedUtmParams[param];
      } else {
        utmCheck[param] = param in actualParams;
      }
    }

    const allUtmPresent = requiredUtm.every(p => p in actualParams);
    const utmCorrect = Object.values(utmCheck).every(v => v === true);

    const result = {
      url,
      finalUrl,
      status,
      working: status >= 200 && status < 400,
      hasUtm: allUtmPresent,
      utmCorrect,
      utmParams: actualParams,
      testedAt: new Date()
    };

    if (result.working && result.hasUtm && result.utmCorrect) {
      log(`✅ Link working: ${url}`, 'success');
    } else {
      log(`⚠️ Link issues: ${url} (status: ${status}, UTM: ${allUtmPresent ? 'present' : 'missing'})`, 'warning');
    }

    return result;
  } catch (error) {
    log(`❌ Link test failed: ${url} - ${error.message}`, 'error');
    return {
      url,
      working: false,
      error: error.message,
      testedAt: new Date()
    };
  }
}

/**
 * Test all links in an email
 */
export async function testEmailLinks(emailContent, emailNumber) {
  const links = extractLinks(emailContent);
  log(`Found ${links.length} links in email ${emailNumber}`, 'info');

  const expectedUtmParams = {
    utm_source: 'email',
    utm_medium: 'research',
    utm_campaign: 'therapist_research',
    utm_email: String(emailNumber)
  };

  const results = [];

  for (const linkInfo of links) {
    if (linkInfo.error) {
      results.push({
        ...linkInfo,
        working: false
      });
      continue;
    }

    // Determine expected UTM content based on URL
    let expectedContent = 'unknown';
    if (linkInfo.url.includes('/survey')) {
      expectedContent = 'survey';
    } else if (linkInfo.url.includes('/sandbox')) {
      expectedContent = 'sandbox';
    } else if (linkInfo.url.includes('/documentation')) {
      expectedContent = 'learn_more';
    }

    const expectedParams = {
      ...expectedUtmParams,
      utm_content: expectedContent
    };

    const result = await testLink(linkInfo.url, expectedParams);
    results.push({
      ...linkInfo,
      ...result,
      expectedContent
    });

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const working = results.filter(r => r.working).length;
  const withUtm = results.filter(r => r.hasUtm).length;
  
  log(`Link testing complete: ${working}/${results.length} working, ${withUtm}/${results.length} with UTM`, 'info');

  return {
    total: results.length,
    working,
    withUtm,
    results
  };
}

/**
 * Test links for a specific persona and email
 */
export async function testPersonaEmailLinks(persona, emailNumber) {
  const { getEmailContent } = await import('./email-sender.js');
  const emailContent = await getEmailContent(persona, emailNumber);
  
  return await testEmailLinks(emailContent.content, emailNumber);
}

