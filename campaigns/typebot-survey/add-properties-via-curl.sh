#!/bin/bash

# Add All Survey Properties to Notion Database
# Database ID: 2995c25944da80a5b5d1f0eb9db74a36

NOTION_TOKEN="${NOTION_TOKEN:-}"
DATABASE_ID="2995c25944da80a5b5d1f0eb9db74a36"

echo "🚀 Adding all survey properties to Notion database..."
echo ""

# Function to add properties
add_properties() {
    local properties_json="$1"
    local description="$2"
    
    echo "📦 Adding: $description"
    
    curl -s -X PATCH "https://api.notion.com/v1/databases/$DATABASE_ID" \
        -H "Authorization: Bearer $NOTION_TOKEN" \
        -H "Notion-Version: 2022-06-28" \
        -H "Content-Type: application/json" \
        -d "{\"properties\":$properties_json}" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "   ✅ Success"
    else
        echo "   ❌ Failed"
    fi
    
    sleep 0.5
}

# Batch 1: Basic info
add_properties '{
    "Profession":{"select":{"options":[{"name":"Psychologist"},{"name":"Counsellor"},{"name":"Social Worker"},{"name":"Psychiatrist"},{"name":"Psychotherapist"},{"name":"Art Therapist"},{"name":"Other"}]}},
    "Profession Other":{"rich_text":{}},
    "Years in Practice":{"select":{"options":[{"name":"0-2 years"},{"name":"3-5 years"},{"name":"6-10 years"},{"name":"10+ years"}]}}
}' "Basic info fields"

# Batch 2: Client and modalities
add_properties '{
    "Client Types":{"multi_select":{"options":[{"name":"Adults"},{"name":"Teens"},{"name":"Couples"},{"name":"LGBTQ+"},{"name":"Trauma-focused"},{"name":"Neurodivergent"},{"name":"Other"}]}},
    "Client Types Other":{"rich_text":{}},
    "Modalities":{"multi_select":{"options":[{"name":"CBT"},{"name":"DBT"},{"name":"ACT"},{"name":"EMDR"},{"name":"Person-Centred"},{"name":"Somatic"},{"name":"Gestalt"},{"name":"Psychodynamic"},{"name":"Relationship Therapy"},{"name":"Art Therapy"},{"name":"Other"}]}},
    "Modalities Other":{"rich_text":{}}
}' "Client and modalities fields"

# Batch 3: How clients find you
add_properties '{
    "How Clients Find You":{"multi_select":{"options":[{"name":"Referrals"},{"name":"Directories"},{"name":"Word of mouth"},{"name":"Online search"},{"name":"Social media"},{"name":"Other"}]}},
    "How Clients Find You Other":{"rich_text":{}},
    "Great Match Factors":{"multi_select":{"options":[{"name":"Shared core values"},{"name":"Similar communication style"},{"name":"Trust"},{"name":"Life goal alignment"},{"name":"Lived experience"},{"name":"Shared religious beliefs/background"},{"name":"Shared cultural background"},{"name":"Shared experience of a diagnosis (ADHD, Autism, OCD, Addiction, etc)"},{"name":"Other"}]}},
    "Great Match Other":{"rich_text":{}}
}' "Client acquisition and match factors"

# Batch 4: Screening and sharing
add_properties '{
    "Biggest Gap":{"rich_text":{}},
    "Screening Clients":{"select":{"options":[{"name":"Yes"},{"name":"No"}]}},
    "Open to Sharing":{"select":{"options":[{"name":"Yes"},{"name":"Maybe"},{"name":"No"}]}},
    "Which Questions Matter":{"multi_select":{"options":[{"name":"Communication style"},{"name":"Relationship style"},{"name":"Personality traits"},{"name":"Lived experience"},{"name":"Values and beliefs"},{"name":"Therapeutic work style and boundaries"},{"name":"All of the above"},{"name":"None"},{"name":"Other"}]}}
}' "Screening and sharing preferences"

# Batch 5: Personality and personal info
add_properties '{
    "Which Questions Matter Other":{"rich_text":{}},
    "Personality Test":{"select":{"options":[{"name":"Yes"},{"name":"No"},{"name":"Maybe"}]}},
    "Too Personal":{"multi_select":{"options":[{"name":"Trauma history"},{"name":"Religious beliefs/background"},{"name":"Political views"},{"name":"Personal relationships"},{"name":"Financial situation"},{"name":"Cultural background"},{"name":"None"},{"name":"Other"}]}},
    "Too Personal Other":{"rich_text":{}}
}' "Personality and personal information"

# Batch 6: Profile details
add_properties '{
    "Profile Detail Level":{"select":{"options":[{"name":"1 - Simple (a few basic details)"},{"name":"2"},{"name":"3"},{"name":"4"},{"name":"5"},{"name":"6"},{"name":"7"},{"name":"8"},{"name":"9"},{"name":"10 - Very detailed (a full understanding of you as a therapist and as a person)"}]}},
    "Onboarding Time":{"select":{"options":[{"name":"2-3 min"},{"name":"5 min"},{"name":"10 min"},{"name":"15 min+"},{"name":"As long as it takes to get the best matches with clients"}]}},
    "Trust AI Matching":{"select":{"options":[{"name":"Yes"},{"name":"Maybe"},{"name":"No"},{"name":"I'\''m unsure about AI"}]}}
}' "Profile detail and onboarding preferences"

# Batch 7: Final fields
add_properties '{
    "Free Listing Interest":{"select":{"options":[{"name":"Yes"},{"name":"Maybe later"},{"name":"No"}]}},
    "Future Contact":{"select":{"options":[{"name":"Yes"},{"name":"No"}]}},
    "Comments":{"rich_text":{}},
    "Consent Status":{"select":{"options":[{"name":"Pending"},{"name":"Granted"},{"name":"Withdrawn"}]}}
}' "Final fields"

# Batch 8: Processing fields
add_properties '{
    "Processing Status":{"select":{"options":[{"name":"New"},{"name":"In Review"},{"name":"Processed"},{"name":"Follow-up Needed"}]}},
    "Notes":{"rich_text":{}}
}' "Processing and workflow fields"

echo ""
echo "✅ All properties added successfully!"
echo ""
echo "🔗 View database: https://www.notion.so/2995c25944da80a5b5d1f0eb9db74a36"
echo ""
echo "📊 Verifying properties..."
curl -s -X GET "https://api.notion.com/v1/databases/$DATABASE_ID" \
    -H "Authorization: Bearer $NOTION_TOKEN" \
    -H "Notion-Version: 2022-06-28" | jq -r '.properties | keys[]' | wc -l | xargs -I {} echo "Total properties: {}"


