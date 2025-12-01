/**
 * Setup Therapist Database with Properties and Unison Therapists
 * This script will add all necessary properties to the database and populate it
 */

import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

const notion = new Client({ auth: NOTION_TOKEN });

// Unison therapists data
const therapists = [
    {
        name: "Nicki Nelis",
        email: "nicki@unisonmentalhealth.com",
        profession: "Gestalt Therapist",
        gender: "Female",
        tagline: "Gestalt therapist with nearly 20 years' experience, specializing in LGBTQI+, trauma survivors, and kink/ENM communities",
        specialties: ["LGBTQI+ affirming", "Trauma survivors", "Kink community", "ENM relationships", "Sexual assault survivors"],
        modalities: ["Gestalt Therapy", "Psychodynamic Therapy", "Emotion-focused", "Somatic", "Mindfulness"],
        availability: "In-person Windsor (Thursdays 10am–7pm)",
        location: "Windsor, VIC",
        sessionTypes: ["In-person"],
        ageGroups: ["Adults", "Under 18"],
        communities: ["LGBTQ+", "Kink", "Disability"],
        funding: ["VOCAT", "FAS", "NDIS", "Disability Pension"],
        acceptingNewClients: true,
        bookingUrl: "https://www.halaxy.com/book/appointment/counsellor/ms-nicki-nelis/1546141/1011071/select-time",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-nicki",
        yearsOfPractice: "10+ years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Adam Forman",
        email: "adam@unisonmentalhealth.com",
        profession: "Counsellor & Mediator",
        gender: "Male",
        tagline: "Counsellor & Mediator with two decades experience working with young people and adults, specializing in ethically non-monogamous relationships",
        specialties: ["ENM relationships", "Opening relationships", "Relationship dynamics", "Attachment healing", "Mediation"],
        modalities: ["Mediation", "Relationship counselling", "Attachment-based therapy"],
        availability: "Online & in-person Fitzroy North (Flexible)",
        location: "Fitzroy North, VIC",
        sessionTypes: ["Online", "In-person"],
        ageGroups: ["Adults", "Young people"],
        communities: ["ENM", "Relationship diversity"],
        funding: ["Private", "Medicare"],
        acceptingNewClients: true,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-adam",
        yearsOfPractice: "10+ years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Natasha Lama",
        email: "natasha@unisonmentalhealth.com",
        profession: "Counsellor & Sex Therapist",
        gender: "Female",
        tagline: "Counsellor & Sex Therapist with cultural sensitivity, specializing in sex-positive approaches and cultural identity",
        specialties: ["Sex therapy", "Cultural sensitivity", "Sexual health", "Cultural identity", "CBT", "Mindfulness"],
        modalities: ["Sex Therapy", "CBT", "Mindfulness", "Culturally responsive therapy"],
        availability: "Online and in-person Windsor (Mondays noon–7pm, Saturdays 9am–2pm)",
        location: "Windsor, VIC",
        sessionTypes: ["Online", "In-person"],
        ageGroups: ["Adults"],
        communities: ["Culturally diverse", "LGBTQ+"],
        funding: ["Private", "Medicare"],
        acceptingNewClients: true,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-natasha",
        yearsOfPractice: "6-10 years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Genevieve Autret",
        email: "genevieve@unisonmentalhealth.com",
        profession: "Psychotherapist",
        gender: "Female",
        tagline: "Psychotherapist with 15 years experience, specializing in psychedelic integration and trauma-informed therapy",
        specialties: ["Psychedelic integration", "Trauma therapy", "DBT", "Art therapy", "Harm reduction", "Couples therapy"],
        modalities: ["DBT", "Art Therapy", "Trauma-informed", "Psychedelic integration", "Harm reduction"],
        availability: "Online (Tuesdays 4:30–6:30pm, Wednesdays noon–6pm)",
        location: "Online only",
        sessionTypes: ["Online"],
        ageGroups: ["Adults"],
        communities: ["Psychedelic users", "Couples", "Trauma survivors"],
        funding: ["Private", "Medicare"],
        acceptingNewClients: true,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-genevieve",
        yearsOfPractice: "10+ years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Emma Steains",
        email: "emma@unisonmentalhealth.com",
        profession: "Clinical Psychologist",
        gender: "Female",
        tagline: "Clinical Psychologist specializing in veterans/ADF personnel, EMDR, ACT, and trauma recovery",
        specialties: ["EMDR", "ACT", "CBT", "Veteran support", "ADF families", "Trauma recovery", "Internal Family Systems"],
        modalities: ["EMDR", "ACT", "CBT", "Internal Family Systems", "Trauma-informed"],
        availability: "Online (Wednesdays 2–6pm, Fridays 9am–5pm)",
        location: "Online only",
        sessionTypes: ["Online"],
        ageGroups: ["Adults"],
        communities: ["Veterans", "ADF families", "Trauma survivors"],
        funding: ["DVA", "Private", "Medicare"],
        acceptingNewClients: true,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-emma",
        yearsOfPractice: "6-10 years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Michael Spurrier",
        email: "michael@unisonmentalhealth.com",
        profession: "Clinical Psychologist",
        gender: "Male",
        tagline: "Clinical Psychologist providing warm, grounded therapy for trauma, relationships, neurodivergence, mood, and addiction",
        specialties: ["Trauma therapy", "Relationship work", "Neurodivergent support", "Mood disorders", "Addiction", "Schema therapy"],
        modalities: ["Schema Therapy", "Trauma-informed", "Neurodivergent-affirming", "CBT"],
        availability: "Online (Mondays 9am–3pm)",
        location: "Online only",
        sessionTypes: ["Online"],
        ageGroups: ["Adults"],
        communities: ["Neurodivergent", "Trauma survivors", "Addiction recovery"],
        funding: ["Private", "Medicare"],
        acceptingNewClients: true,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-michael",
        yearsOfPractice: "6-10 years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Meg Wilson",
        email: "meg@unisonmentalhealth.com",
        profession: "Founder & Psychotherapist",
        gender: "Female",
        tagline: "Founder & Psychotherapist with over a decade experience in art psychotherapy, DBT, and relationship therapy",
        specialties: ["Art psychotherapy", "DBT", "Mindfulness", "Relationship therapy", "Non-traditional relationships"],
        modalities: ["Art Psychotherapy", "DBT", "Mindfulness", "Relationship therapy"],
        availability: "Online/in-person Windsor (Not currently accepting new clients)",
        location: "Windsor, VIC",
        sessionTypes: ["Online", "In-person"],
        ageGroups: ["Adults"],
        communities: ["Artists", "ENM", "Creative professionals"],
        funding: ["Private", "Medicare"],
        acceptingNewClients: false,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-meg",
        yearsOfPractice: "10+ years",
        organisation: "Unison Mental Health"
    },
    {
        name: "Joe Stark",
        email: "joe@unisonmentalhealth.com",
        profession: "Psychiatrist & Psychotherapist",
        gender: "Male",
        tagline: "Psychiatrist & Psychotherapist, pioneer in psychedelic-assisted therapy and mindfulness teacher",
        specialties: ["Psychiatry", "Psychedelic therapy", "Mindfulness", "Chronic pain", "Trauma", "Anxiety"],
        modalities: ["Psychiatry", "Psychedelic-assisted therapy", "Mindfulness", "Medication management"],
        availability: "Not accepting new clients; medication-assisted treatments by enquiry",
        location: "Melbourne, VIC",
        sessionTypes: ["Online"],
        ageGroups: ["Adults"],
        communities: ["Psychedelic users", "Chronic pain patients"],
        funding: ["Private", "Medicare"],
        acceptingNewClients: false,
        bookingUrl: "https://unisonmentalhealth.com/contact",
        profileUrl: "https://unisonmentalhealth.com/meet-our-team/#team-joe",
        yearsOfPractice: "10+ years",
        organisation: "Unison Mental Health"
    }
];

async function addTherapist(therapist) {
    try {
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
                "Gender": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.gender
                            }
                        }
                    ]
                },
                "Tagline": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.tagline
                            }
                        }
                    ]
                },
                "Specialties": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.specialties.join(', ')
                            }
                        }
                    ]
                },
                "Modalities": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.modalities.join(', ')
                            }
                        }
                    ]
                },
                "Availability": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.availability
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
                "Session Types": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.sessionTypes.join(', ')
                            }
                        }
                    ]
                },
                "Age Groups": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.ageGroups.join(', ')
                            }
                        }
                    ]
                },
                "Communities": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.communities.join(', ')
                            }
                        }
                    ]
                },
                "Funding": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.funding.join(', ')
                            }
                        }
                    ]
                },
                "Accepting New Clients": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.acceptingNewClients ? 'Yes' : 'No'
                            }
                        }
                    ]
                },
                "Booking URL": {
                    "url": therapist.bookingUrl
                },
                "Profile URL": {
                    "url": therapist.profileUrl
                },
                "Years of Practice": {
                    "rich_text": [
                        {
                            "text": {
                                "content": therapist.yearsOfPractice
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
        return null;
    }
}

async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 SETTING UP THERAPIST DATABASE');
    console.log('='.repeat(60) + '\n');
    
    console.log(`Database: VIC Therapists Inclusive (DEMO)`);
    console.log(`Database ID: ${DATABASE_ID}`);
    console.log(`Therapists to add: ${therapists.length}\n`);
    
    console.log('⚠️  Note: This will add properties to the database and create entries.');
    console.log('   If the database already has properties, some may fail.\n');
    
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
    
    console.log('🎯 Next: Open your Notion database to verify!');
    console.log(`   https://www.notion.so/${DATABASE_ID.replace(/-/g, '')}\n`);
}

main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
});



