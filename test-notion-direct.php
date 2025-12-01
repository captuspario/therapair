<?php
/**
 * Direct test of Notion API - Send a test feedback entry
 */

require_once __DIR__ . '/products/landing-page/config.php';

$rating = 6;
$comment = 'Test entry from direct PHP script - ' . date('Y-m-d H:i:s');

// Prepare Notion properties
$properties = [];

// Title (required)
$properties['Name'] = [
    'title' => [
        [
            'text' => [
                'content' => sprintf('Test Feedback - %d⭐ - %s', $rating, date('Y-m-d H:i:s'))
            ]
        ]
    ]
];

// Rating
$properties['Rating'] = [
    'number' => $rating
];

// Feedback (rich text) - Note: property name is "Feedback" not "Comment"
$properties['Feedback'] = [
    'rich_text' => [
        [
            'text' => [
                'content' => $comment
            ]
        ]
    ]
];

// Submission Date
$properties['Submission Date'] = [
    'date' => [
        'start' => date('c')
    ]
];

// Submission Status
$properties['Submission Status'] = [
    'select' => [
        'name' => 'New'
    ]
];

// Audience Type
$properties['Audience Type'] = [
    'select' => [
        'name' => 'Individual'
    ]
];

// Prepare Notion API request
$notionPayload = [
    'parent' => [
        'database_id' => NOTION_DB_SANDBOX
    ],
    'properties' => $properties
];

echo "Sending test entry to Notion...\n";
echo "Database ID: " . NOTION_DB_SANDBOX . "\n";
echo "Token: " . substr(NOTION_TOKEN, 0, 20) . "...\n\n";

// Call Notion API
$ch = curl_init('https://api.notion.com/v1/pages');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . NOTION_TOKEN,
    'Content-Type: application/json',
    'Notion-Version: 2022-06-28'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($notionPayload));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
if ($error) {
    echo "cURL Error: $error\n";
}

if ($httpCode === 200) {
    $result = json_decode($response, true);
    echo "✅ SUCCESS!\n";
    echo "Page ID: " . ($result['id'] ?? 'N/A') . "\n";
    echo "URL: " . ($result['url'] ?? 'N/A') . "\n";
    echo "\nEntry should now appear in Notion database.\n";
} else {
    echo "❌ FAILED\n";
    echo "Response: " . substr($response, 0, 500) . "\n";
    if (strlen($response) > 500) {
        echo "... (truncated)\n";
    }
}

