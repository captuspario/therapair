// Test script to examine matching algorithm with different response combinations
console.log('=== THERAPIST MATCHING ALGORITHM TEST ===\n');

// Simulate different user responses to test matching variety
const testCases = [
    {
        name: "Gestalt Therapy Focus",
        responses: {
            who: "myself",
            age: "yes",
            location: "either",
            funding: "vocat_fas",
            timing: "flexible",
            urgency: "asap",
            concerns: ["general"],
            approach: ["gestalt"],
            community: ["open"]
        }
    },
    {
        name: "LGBTQ+ Trauma Support",
        responses: {
            who: "myself",
            age: "yes",
            location: "online",
            funding: "vocat_fas",
            timing: "flexible",
            urgency: "asap",
            concerns: ["trauma", "identity"],
            approach: ["trauma"],
            community: ["lgbtq"]
        }
    },
    {
        name: "ENM Relationship Support",
        responses: {
            who: "myself_partner",
            age: "yes",
            location: "either",
            funding: "vocat_fas",
            timing: "flexible",
            urgency: "few_weeks",
            concerns: ["relationship"],
            approach: ["relationship"],
            community: ["open"]
        }
    },
    {
        name: "Art Therapy & Mood",
        responses: {
            who: "myself",
            age: "yes",
            location: "online",
            funding: "vocat_fas",
            timing: "flexible",
            urgency: "asap",
            concerns: ["mood"],
            approach: ["art"],
            community: ["open"]
        }
    },
    {
        name: "Psychedelic Integration",
        responses: {
            who: "myself",
            age: "yes",
            location: "online",
            funding: "vocat_fas",
            timing: "flexible",
            urgency: "wait_for_right",
            concerns: ["psychedelic"],
            approach: ["mindfulness"],
            community: ["open"]
        }
    }
];

// Load and run the matching algorithm for each test case
console.log('Running matching tests...\n');