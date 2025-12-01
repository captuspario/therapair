/**
 * Add Unison Therapists to Existing Notion Database
 * Uses the correct database ID and compatible API methods
 */

import { Client } from '@notionhq/client';

// Configuration - CORRECTED DATABASE ID
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const notion = new Client({ auth: NOTION_TOKEN });

// Unison therapists data
const therapists = [
    {
        name: "Nicki Nelis",
        email: "nicki@unisonmentalhealth.com",
        profession: "Gestalt Therapist",
        specialties: "LGBTQI+ affirming, Trauma survivors, Kink community, ENM relationships, Sexual assault survivors",
        location: "Windsor, VIC",
        organisation: "Unison Mental Health"
    },
    {
        name: "Adam Forman", 
        email: "adam@unisonmentalhealth.com",
        profession: "Counsellor & Mediator",
        specialties: "ENM relationships, Opening relationships, Relationship dynamics, Attachment healing, Mediation",
        location: "Fitzroy North, VIC",
        organisation: "Unison Mental Health"
    },
    {
        name: "Natasha Lama",
        email: "natasha@unisonmentalhealth.com", 
        profession: "Counsellor & Sex Therapist",
        specialties: "Sex therapy, Cultural sensitivity, Sexual health, Cultural identity, CBT, Mindfulness",
        location: "Windsor, VIC",
        organisation: "Unison Mental Health"
    },
    {
        name: "Genevieve Autret",
        email: "genevieve@unisonmentalhealth.com",
        profession: "Psychotherapist", 
        specialties: "Psychedelic integration, Trauma therapy, DBT, Art therapy, Harm reduction, Couples therapy",
        location: "Online only",
        organisation: "Unison Mental Health"
    },
    {
        name: "Emma Steains",
        email: "emma@unisonmentalhealth.com",
        profession: "Clinical Psychologist",
        specialties: "EMDR, ACT, CBT, Veteran support, ADF families, Trauma recovery, Internal Family Systems", 
        location: "Online only",
        organisation: "Unison Mental Health"
    },
    {
        name: "Michael Spurrier",
        email: "michael@unisonmentalhealth.com",
        profession: "Clinical Psychologist",
        specialties: "Trauma therapy, Relationship work, Neurodivergent support, Mood disorders, Addiction, Schema therapy",
        location: "Online only", 
        organisation: "Unison Mental Health"
    },
    {
        name: "Meg Wilson",
        email: "meg@unisonmentalhealth.com",
        profession: "Founder & Psychotherapist",
        specialties: "Art psychotherapy, DBT, Mindfulness, Relationship therapy, Non-traditional relationships",
        location: "Windsor, VIC",
        organisation: "Unison Mental Health"
    },
    {
        name: "Joe Stark",
        email: "joe@unisonmentalhealth.com",
        profession: "Psychiatrist & Psychotherapist", 
        specialties: "Psychiatry, Psychedelic therapy, Mindfulness, Chronic pain, Trauma, Anxiety",
        location: "Melbourne, VIC",
        organisation: "Unison Mental Health"
    }
];

async function addTherapist(therapist) {
    try {
        // Try with common property names first
        const response = await notion.pages.create({
            parent: {
                database_id: DATABASE_ID
            },
            properties: {
                "Name": {
                    "title": [
                        {
                            "text": {
                                "content": therapist.name
                            }
                        }
                    ]
                },
                "Email": {
                    "email": therapist.email
                },
                "Profession": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.profession
                            }
                        }
                    ]
                },
                "Specialisations": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.specialties
                            }
                        }
                    ]
                },
                "Location": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.location
                            }
                        }
                    ]
                },
                "Organisation": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.organisation
                            }
                        }
                    ]
                }
            }
        });
        
        console.log(`✅ Added: ${therapist.name}`);
        return response;
    } catch (error) {
        console.error(`❌ Failed to add ${therapist.name}:`, error.message);
        
        // If it fails due to property names, let's try to get the actual property names
        if (error.message.includes('not a property that exists')) {
            console.log(`   🔍 Need to check actual property names for ${therapist.name}`);
        }
        
        return null;
    }
}

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 ADDING UNISON THERAPISTS TO EXISTING DATABASE');
    console.log('='.repeat(60) + '\n');
    
    console.log(`Database: VIC Therapists Inclusive (DEMO)`);
    console.log(`Database ID: ${DATABASE_ID}`);
    console.log(`Therapists to add: ${therapists.length}\n`);
    
    let added = 0;
    let failed = 0;
    
    for (const therapist of therapists) {
        const result = await addTherapist(therapist);
        if (result) {
            added++;
        } else {
            failed++;
        }
        
        // Wait 200ms between requests
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully added: ${added}`);
    console.log(`❌ Failed: ${failed}`);
    console.log('='.repeat(60) + '\n');
    
    if (failed > 0) {
        console.log('💡 If entries failed, we may need to:');
        console.log('   1. Check the actual property names in the database');
        console.log('   2. Update the script with correct property names');
        console.log('   3. Or add the properties manually in Notion first\n');
    }
    
    console.log('🎯 Next: Open your Notion database to verify!');
    console.log(`   https://www.notion.so/${DATABASE_ID.replace(/-/g, '')}\n`);
}

main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
});



