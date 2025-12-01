/**
 * Sync Unison Therapists to Notion Database
 * Uses root-level @notionhq/client package
 */

import { Client } from '@notionhq/client';

// Configuration
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || '';

// Initialize Notion client
const notion = new Client({ auth: NOTION_TOKEN });

// Unison therapist data
const unisonTherapists = [
    {
        name: "Nicki Nelis",
        email: "nicki@unisonmentalhealth.com",
        profession: "Gestalt Therapist",
        gender: "Female",
        tagline: "Gestalt therapist with nearly 20 years' experience, specializing in LGBTQI+, trauma survivors, and kink/ENM communities",
        specialties: ["LGBTQI+ affirming", "Trauma survivors", "Kink community", "ENM relationships", "Sexual assault survivors", "Gestalt Therapy", "Psychodynamic Therapy"],
        modalities: ["Gestalt Therapy", "Psychodynamic Therapy", "Emotion-focused", "Somatic", "Mindfulness", "Trauma-informed"],
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

async function main() {
    try {
        console.log('🔍 Inspecting database...\n');
        
        // Query database to see structure
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            page_size: 3
        });
        
        console.log(`Found ${response.results.length} existing entries\n`);
        
        if (response.results.length > 0) {
            const firstPage = response.results[0];
            console.log('📋 Database Properties:');
            console.log('='.repeat(60));
            
            Object.keys(firstPage.properties).forEach(name => {
                const prop = firstPage.properties[name];
                console.log(`  ${name.padEnd(30)} ${prop.type}`);
            });
            
            console.log('\n');
        }
        
        console.log('🚀 Starting to populate Unison therapists...\n');
        
        // Process each therapist
        for (const therapist of unisonTherapists) {
            await processTherapist(therapist);
            // Wait 200ms between requests
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ COMPLETE!');
        console.log('='.repeat(60) + '\n');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

async function processTherapist(therapist) {
    console.log(`📋 Processing: ${therapist.name}...`);
    
    try {
        // Search for existing therapist
        const existingResponse = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
                property: 'Name',
                title: {
                    contains: therapist.name
                }
            }
        });
        
        if (existingResponse.results.length > 0) {
            // Update existing
            const pageId = existingResponse.results[0].id;
            await updateTherapist(pageId, therapist);
            console.log(`   🔄 Updated existing entry\n`);
        } else {
            // Create new
            await createTherapist(therapist);
            console.log(`   ✅ Created new entry\n`);
        }
        
    } catch (error) {
        console.error(`   ❌ Failed: ${error.message}\n`);
    }
}

/**
 * Create a new therapist entry
 * Uses all properties including Title (immutable)
 */
async function createTherapist(therapist) {
    const properties = buildProperties(therapist);
    
    await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: properties
    });
}

/**
 * Update an existing therapist entry
 * IMPORTANT: Only updates mutable properties (excludes Title)
 * 
 * Following Notion API best practices:
 * - Skip immutable properties (Title)
 * - Only update properties that can be changed
 * - Log skipped properties for debugging
 */
async function updateTherapist(pageId, therapist) {
    const allProperties = buildProperties(therapist);
    const updatableProperties = filterUpdatableProperties(allProperties);
    
    // Check if there are properties to update
    if (Object.keys(updatableProperties).length === 0) {
        console.log('   ℹ️  No updatable properties to change');
        return;
    }
    
    await notion.pages.update({
        page_id: pageId,
        properties: updatableProperties
    });
}

/**
 * Build all properties for a therapist
 * 
 * IMPORTANT: Title property is IMMUTABLE and can only be set on creation.
 * When updating, filter out immutable properties.
 */
function buildProperties(t) {
    return {
        // ⚠️ IMMUTABLE: Title property - only for creation, never for updates
        "Name": {
            "title": [{ "text": { "content": t.name } }]
        },
        
        // ✅ MUTABLE: These properties can be updated
        "Email": {
            "email": t.email
        },
        "Profession": {
            "rich_text": [{ "text": { "content": t.profession } }]
        },
        "Gender": {
            "rich_text": [{ "text": { "content": t.gender } }]
        },
        "Tagline": {
            "rich_text": [{ "text": { "content": t.tagline } }]
        },
        "Specialties": {
            "rich_text": [{ "text": { "content": t.specialties.join(', ') } }]
        },
        "Modalities": {
            "rich_text": [{ "text": { "content": t.modalities.join(', ') } }]
        },
        "Availability": {
            "rich_text": [{ "text": { "content": t.availability } }]
        },
        "Location": {
            "rich_text": [{ "text": { "content": t.location } }]
        },
        "Session Types": {
            "rich_text": [{ "text": { "content": t.sessionTypes.join(', ') } }]
        },
        "Age Groups": {
            "rich_text": [{ "text": { "content": t.ageGroups.join(', ') } }]
        },
        "Communities": {
            "rich_text": [{ "text": { "content": t.communities.join(', ') } }]
        },
        "Funding": {
            "rich_text": [{ "text": { "content": t.funding.join(', ') } }]
        },
        "Accepting New Clients": {
            "rich_text": [{ "text": { "content": t.acceptingNewClients ? 'Yes' : 'No' } }]
        },
        "Booking URL": {
            "url": t.bookingUrl
        },
        "Profile URL": {
            "url": t.profileUrl
        },
        "Years of Practice": {
            "rich_text": [{ "text": { "content": t.yearsOfPractice } }]
        },
        "Organisation": {
            "rich_text": [{ "text": { "content": t.organisation } }]
        }
    };
}

/**
 * Filter out immutable properties (like Title)
 * 
 * Notion API best practice: Only update properties that can be changed.
 * Title properties are immutable and can only be set on creation.
 */
function filterUpdatableProperties(allProperties) {
    const filtered = {};
    
    for (const [propertyName, propertyValue] of Object.entries(allProperties)) {
        // Skip immutable properties (Title)
        if (propertyValue.title) {
            console.log(`   ⏭️  Skipping immutable property: ${propertyName}`);
            continue;
        }
        
        // Include all mutable properties
        filtered[propertyName] = propertyValue;
    }
    
    return filtered;
}

main();

