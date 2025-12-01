#!/bin/bash

# Rename Properties with Numbers According to Survey Flow
# Database ID: 2995c25944da80a5b5d1f0eb9db74a36

NOTION_TOKEN="${NOTION_TOKEN:-}"
DATABASE_ID="2995c25944da80a5b5d1f0eb9db74a36"

echo "🚀 Renaming properties with numbers..."
echo ""

# Function to rename property
rename_property() {
    local old_name="$1"
    local new_name="$2"
    
    echo "📝 Renaming: \"$old_name\" → \"$new_name\""
    
    # Get property type first
    property_type=$(curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
        -H "Authorization: Bearer $NOTION_TOKEN" \
        -H "Notion-Version: 2022-06-28" | jq -r ".properties[\"$old_name\"].type")
    
    # Build property definition based on type
    case "$property_type" in
        email)
            property_def='{"email":{}}'
            ;;
        rich_text)
            property_def='{"rich_text":{}}'
            ;;
        select)
            # Get options
            options=$(curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
                -H "Authorization: Bearer $NOTION_TOKEN" \
                -H "Notion-Version: 2022-06-28" | jq -c ".properties[\"$old_name\"].select.options")
            property_def="{\"select\":{\"options\":$options}}"
            ;;
        multi_select)
            # Get options
            options=$(curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
                -H "Authorization: Bearer $NOTION_TOKEN" \
                -H "Notion-Version: 2022-06-28" | jq -c ".properties[\"$old_name\"].multi_select.options")
            property_def="{\"multi_select\":{\"options\":$options}}"
            ;;
        *)
            echo "   ⚠️  Unknown type: $property_type"
            return 1
            ;;
    esac
    
    # Rename by removing old and adding new with same definition
    response=$(curl -s -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
        -H "Authorization: Bearer $NOTION_TOKEN" \
        -H "Notion-Version: 2022-06-28" \
        -H "Content-Type: application/json" \
        -d "{\"properties\":{\"$old_name\":null,\"$new_name\":$property_def}}")
    
    if echo "$response" | jq -e '.error' > /dev/null 2>&1; then
        echo "   ❌ Failed: $(echo "$response" | jq -r '.message')"
        return 1
    else
        echo "   ✅ Success"
        return 0
    fi
}

# Basic Info
rename_property "Email" "1. Email"
sleep 0.3
rename_property "Profession" "2. Profession"
sleep 0.3
rename_property "Profession Other" "3. Profession Other"
sleep 0.3
rename_property "Years in Practice" "4. Years in Practice"
sleep 0.3

# Client & Practice
rename_property "Client Types" "5. Client Types"
sleep 0.3
rename_property "Client Types Other" "6. Client Types Other"
sleep 0.3
rename_property "Modalities" "7. Modalities"
sleep 0.3
rename_property "Modalities Other" "8. Modalities Other"
sleep 0.3

# Acquisition & Matching
rename_property "How Clients Find You" "9. How Clients Find You"
sleep 0.3
rename_property "How Clients Find You Other" "10. How Clients Find You Other"
sleep 0.3
rename_property "Great Match Factors" "11. Great Match Factors"
sleep 0.3
rename_property "Great Match Other" "12. Great Match Other"
sleep 0.3
rename_property "Biggest Gap" "13. Biggest Gap"
sleep 0.3
rename_property "Screening Clients" "14. Screening Clients"
sleep 0.3

# Openness & Sharing
rename_property "Open to Sharing" "15. Open to Sharing"
sleep 0.3
rename_property "Which Questions Matter" "16. Which Questions Matter"
sleep 0.3
rename_property "Which Questions Matter Other" "17. Which Questions Matter Other"
sleep 0.3
rename_property "Personality Test" "18. Personality Test"
sleep 0.3
rename_property "Too Personal" "19. Too Personal"
sleep 0.3
rename_property "Too Personal Other" "20. Too Personal Other"
sleep 0.3

# Preferences
rename_property "Profile Detail Level" "21. Profile Detail Level"
sleep 0.3
rename_property "Onboarding Time" "22. Onboarding Time"
sleep 0.3
rename_property "Trust AI Matching" "23. Trust AI Matching"
sleep 0.3

# Final & Workflow
rename_property "Free Listing Interest" "24. Free Listing Interest"
sleep 0.3
rename_property "Future Contact" "25. Future Contact"
sleep 0.3
rename_property "Comments" "26. Comments"
sleep 0.3
rename_property "Consent Status" "27. Consent Status"
sleep 0.3
rename_property "Processing Status" "28. Processing Status"
sleep 0.3
rename_property "Notes" "29. Notes"
sleep 0.3

echo ""
echo "✅ All properties renamed!"
echo ""
echo "📊 Verifying..."
curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
    -H "Authorization: Bearer $NOTION_TOKEN" \
    -H "Notion-Version: 2022-06-28" | jq -r '.properties | keys[]' | grep -v "^Name$" | nl

echo ""
echo "🔗 View database: https://www.notion.so/${DATABASE_ID//-/}"


