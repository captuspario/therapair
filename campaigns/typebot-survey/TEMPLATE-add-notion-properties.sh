#!/bin/bash

# TEMPLATE: Add Properties to Notion Database
# Copy this file and modify for your specific use case

##############################################################################
# CONFIGURATION - Update these values
##############################################################################

NOTION_TOKEN="your_notion_token_here"
DATABASE_ID="your_database_id_here"

##############################################################################
# HELPER FUNCTION
##############################################################################

add_properties() {
    local properties_json="$1"
    local description="$2"
    
    echo "📦 Adding: $description"
    
    response=$(curl -s -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
        -H "Authorization: Bearer $NOTION_TOKEN" \
        -H "Notion-Version: 2022-06-28" \
        -H "Content-Type: application/json" \
        -d "{\"properties\":$properties_json}")
    
    # Check for errors
    if echo "$response" | jq -e '.error' > /dev/null 2>&1; then
        echo "   ❌ Failed: $(echo "$response" | jq -r '.message')"
        return 1
    else
        echo "   ✅ Success"
        return 0
    fi
}

##############################################################################
# ADD YOUR PROPERTIES BELOW
##############################################################################

echo "🚀 Adding properties to Notion database..."
echo ""

# Example: Batch 1 - Basic Info
add_properties '{
    "Email":{"email":{}},
    "Name":{"rich_text":{}}
}' "Basic info fields"

sleep 0.5

# Example: Batch 2 - Select Field
add_properties '{
    "Status":{
        "select":{
            "options":[
                {"name":"Active"},
                {"name":"Inactive"},
                {"name":"Pending"}
            ]
        }
    }
}' "Status field"

sleep 0.5

# Example: Batch 3 - Multi-select Field
add_properties '{
    "Tags":{
        "multi_select":{
            "options":[
                {"name":"Tag1"},
                {"name":"Tag2"},
                {"name":"Tag3"}
            ]
        }
    }
}' "Tags field"

sleep 0.5

##############################################################################
# VERIFICATION
##############################################################################

echo ""
echo "✅ Done adding properties!"
echo ""
echo "📊 Verifying properties..."

total=$(curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
    -H "Authorization: Bearer $NOTION_TOKEN" \
    -H "Notion-Version: 2022-06-28" | jq '.properties | keys | length')

echo "Total properties: $total"
echo ""
echo "Properties list:"
curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
    -H "Authorization: Bearer $NOTION_TOKEN" \
    -H "Notion-Version: 2022-06-28" | jq -r '.properties | keys[]' | nl

echo ""
echo "🔗 View database: https://www.notion.so/${DATABASE_ID//-/}"

##############################################################################
# NOTES
##############################################################################

# Common property types:
# - rich_text: {}
# - email: {}
# - number: {}
# - date: {}
# - checkbox: {}
# - select: { "options": [{"name": "Option1"}, {"name": "Option2"}] }
# - multi_select: { "options": [{"name": "Option1"}, {"name": "Option2"}] }

# IMPORTANT: 
# - NO COMMAS in multi-select option names
# - Add delays between batches (sleep 0.5)
# - Keep batches small (3-5 properties)
# - Always verify with GET request


