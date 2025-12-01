#!/bin/bash

# Add Research Tracking Properties to VIC Therapists Database
# Database ID: 28c5c25944da80a48d85fd43119f4ec1

##############################################################################
# CONFIGURATION
##############################################################################

NOTION_TOKEN="${NOTION_TOKEN:-}"
DATABASE_ID="28c5c25944da80a48d85fd43119f4ec1"

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
# ADD RESEARCH TRACKING PROPERTIES
##############################################################################

echo "🚀 Adding research tracking properties to VIC Therapists database..."
echo "Database ID: $DATABASE_ID"
echo ""

# Property 1: Research Status (Select)
# Tracks email engagement: "Opened (email 1)", "Clicked (email 1)", "Unsubscribed", etc.
add_properties '{
    "Research Status":{
        "select":{
            "options":[
                {"name":"Not Contacted"},
                {"name":"Opened (email 1)"},
                {"name":"Clicked (email 1)"},
                {"name":"Opened (email 2)"},
                {"name":"Clicked (email 2)"},
                {"name":"Opened (email 3)"},
                {"name":"Clicked (email 3)"},
                {"name":"Opened (email 4)"},
                {"name":"Clicked (email 4)"},
                {"name":"Survey Started"},
                {"name":"Survey Completed"},
                {"name":"Unsubscribed"}
            ]
        }
    }
}' "Research Status (Select)"

sleep 0.5

# Property 2: Latest Survey Date (Date)
# Last survey completion or engagement timestamp
add_properties '{
    "Latest Survey Date":{
        "date":{}
    }
}' "Latest Survey Date (Date)"

sleep 0.5

# Property 3: Research Follow-up (Rich Text)
# Engagement notes and follow-up information
add_properties '{
    "Research Follow-up":{
        "rich_text":{}
    }
}' "Research Follow-up (Rich Text)"

sleep 0.5

# Property 4: Research Source Notes (Rich Text) - Optional but useful
# UTM tracking data and source information
add_properties '{
    "Research Source Notes":{
        "rich_text":{}
    }
}' "Research Source Notes (Rich Text)"

echo ""
echo "✅ Done! All research tracking properties have been added."
echo ""
echo "📋 Properties added:"
echo "   1. Research Status (Select) - Tracks email engagement"
echo "   2. Latest Survey Date (Date) - Last engagement timestamp"
echo "   3. Research Follow-up (Rich Text) - Engagement notes"
echo "   4. Research Source Notes (Rich Text) - UTM tracking data"
echo ""
echo "🔍 Verify by checking the database in Notion or running:"
echo "   curl -s \"https://api.notion.com/v1/databases/$DATABASE_ID\" \\"
echo "     -H \"Authorization: Bearer $NOTION_TOKEN\" \\"
echo "     -H \"Notion-Version: 2022-06-28\" | jq '.properties | keys'"

