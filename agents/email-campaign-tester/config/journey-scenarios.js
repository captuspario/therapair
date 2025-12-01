/**
 * Predefined journey scenarios for email campaign testing
 * Each scenario defines which emails to send and what actions to simulate
 */

export const scenarios = {
  /**
   * Happy Path: User opens, clicks, and completes survey
   */
  'happy-path': {
    name: 'Happy Path',
    description: 'User opens Email 1, clicks survey link, completes survey',
    emails: [1, 5],
    actions: {
      1: ['open', 'click-survey', 'complete-survey'],
      5: ['open'] // Thank you email
    },
    expectedOutcome: 'Survey completed, thank you email sent'
  },

  /**
   * Non-Responder: User doesn't open Email 1, receives Email 2
   */
  'non-responder': {
    name: 'Non-Responder',
    description: 'User does not open Email 1, receives Email 2 follow-up',
    emails: [1, 2],
    actions: {
      1: [], // No action - email not opened
      2: ['open', 'click-survey']
    },
    expectedOutcome: 'Email 2 triggered, user engages'
  },

  /**
   * Clicker but Non-Completer: Opens and clicks but doesn't complete survey
   */
  'clicker-non-completer': {
    name: 'Clicker but Non-Completer',
    description: 'User opens Email 1, clicks survey link, but does not complete',
    emails: [1, 4],
    actions: {
      1: ['open', 'click-survey', 'start-survey'], // Starts but doesn't complete
      4: ['open', 'click-survey', 'complete-survey'] // Completion reminder works
    },
    expectedOutcome: 'Email 4 triggered for incomplete survey, user completes'
  },

  /**
   * Unsubscriber: User unsubscribes after Email 1
   */
  'unsubscriber': {
    name: 'Unsubscriber',
    description: 'User opens Email 1 and unsubscribes',
    emails: [1],
    actions: {
      1: ['open', 'unsubscribe']
    },
    expectedOutcome: 'No further emails sent, status updated to Unsubscribed'
  },

  /**
   * Multiple Clicks: User clicks multiple links in Email 1
   */
  'multiple-clicks': {
    name: 'Multiple Clicks',
    description: 'User opens Email 1 and clicks all links (survey, learn more)',
    emails: [1],
    actions: {
      1: ['open', 'click-survey', 'click-learn-more']
    },
    expectedOutcome: 'All clicks tracked with correct UTM parameters'
  },

  /**
   * No-Click Opener: User opens but doesn't click, receives Email 3
   */
  'no-click-opener': {
    name: 'No-Click Opener',
    description: 'User opens Email 1 but does not click, receives Email 3',
    emails: [1, 3],
    actions: {
      1: ['open'], // Opens but doesn't click
      3: ['open', 'click-survey']
    },
    expectedOutcome: 'Email 3 triggered for no-click, user engages'
  },

  /**
   * Sandbox Explorer: User clicks sandbox link (if available in email)
   */
  'sandbox-explorer': {
    name: 'Sandbox Explorer',
    description: 'User opens Email 1 and explores sandbox demo',
    emails: [1],
    actions: {
      1: ['open', 'click-sandbox', 'visit-sandbox']
    },
    expectedOutcome: 'Sandbox visit tracked, feedback widget interaction tracked'
  },

  /**
   * Complete Journey: All emails in sequence with various actions
   */
  'complete-journey': {
    name: 'Complete Journey',
    description: 'Full journey through all emails with realistic actions',
    emails: [1, 2, 3, 4, 5],
    actions: {
      1: ['open', 'click-survey', 'start-survey'],
      2: [], // Email 2 not needed (user already engaged)
      3: [], // Email 3 not needed
      4: ['open', 'click-survey', 'complete-survey'], // Completes after reminder
      5: ['open', 'click-sandbox'] // Explores sandbox after completion
    },
    expectedOutcome: 'Complete journey tested, all tracking verified'
  }
};

/**
 * Get scenario by name
 */
export function getScenario(name) {
  return scenarios[name];
}

/**
 * List all available scenarios
 */
export function listScenarios() {
  return Object.entries(scenarios).map(([key, scenario]) => ({
    key,
    ...scenario
  }));
}

