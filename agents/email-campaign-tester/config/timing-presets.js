/**
 * Timing presets for email journey execution
 * Values are in minutes (for accelerated) or days (for realistic)
 */

export const timingPresets = {
  /**
   * Realistic timing - matches actual campaign schedule
   */
  realistic: {
    1: 0,      // Day 0 - Email 1 sent immediately
    2: 3,      // Day 3 - Email 2 sent 3 days after Email 1
    3: 7,      // Day 7 - Email 3 sent 7 days after Email 1
    4: 14,     // Day 14 - Email 4 sent 14 days after Email 1
    5: 0       // Immediate - Email 5 sent immediately after survey completion
  },

  /**
   * Accelerated timing - minutes instead of days for faster testing
   */
  accelerated: {
    1: 0,      // 0 minutes - Email 1 sent immediately
    2: 3,      // 3 minutes - Email 2 sent 3 minutes after Email 1
    3: 7,      // 7 minutes - Email 3 sent 7 minutes after Email 1
    4: 14,     // 14 minutes - Email 4 sent 14 minutes after Email 1
    5: 0       // Immediate - Email 5 sent immediately after survey completion
  },

  /**
   * Instant timing - all emails sent immediately (for link testing)
   */
  instant: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  },

  /**
   * Manual timing - wait for approval between emails
   */
  manual: {
    1: 0,      // Email 1 sent immediately
    2: null,   // Wait for manual approval
    3: null,   // Wait for manual approval
    4: null,   // Wait for manual approval
    5: null    // Wait for manual approval
  }
};

/**
 * Convert timing preset to milliseconds
 */
export function getTimingInMs(preset, emailNumber, isRealistic = false) {
  const timing = timingPresets[preset]?.[emailNumber];
  if (timing === null || timing === undefined) {
    return null; // Manual approval needed
  }
  
  if (isRealistic && preset === 'realistic') {
    // Convert days to milliseconds
    return timing * 24 * 60 * 60 * 1000;
  } else {
    // Convert minutes to milliseconds
    return timing * 60 * 1000;
  }
}

