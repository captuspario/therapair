/**
 * Test .env File Connection
 * Verifies that the .env file is working and Notion API is accessible
 */

require('dotenv').config();
const { Client } = require('@notionhq/client');

console.log('🔧 TESTING .ENV FILE CONNECTION...\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('  NOTION_TOKEN:', process.env.NOTION_TOKEN ? '✅ Found' : '❌ Missing');
console.log('  THERAPIST_DATABASE_ID:', process.env.THERAPIST_DATABASE_ID ? '✅ Found' : '❌ Missing');
console.log('  SUBMISSIONS_DATABASE_ID:', process.env.SUBMISSIONS_DATABASE_ID ? '✅ Found' : '❌ Missing');
console.log('  NODE_ENV:', process.env.NODE_ENV || 'Not set');

if (!process.env.NOTION_TOKEN) {
  console.log('\n❌ NOTION_TOKEN not found in .env file');
  process.exit(1);
}

if (!process.env.THERAPIST_DATABASE_ID) {
  console.log('\n❌ THERAPIST_DATABASE_ID not found in .env file');
  process.exit(1);
}

console.log('\n🔌 Testing Notion API Connection...');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function testConnection() {
  try {
    // Test therapist database
    console.log('📊 Testing Therapist Database...');
    const therapistDb = await notion.databases.retrieve({
      database_id: process.env.THERAPIST_DATABASE_ID
    });
    console.log('✅ Therapist Database:', therapistDb.title[0]?.plain_text);
    console.log('   URL:', therapistDb.url);
    
    // Test submissions database
    console.log('📊 Testing Submissions Database...');
    const submissionsDb = await notion.databases.retrieve({
      database_id: process.env.SUBMISSIONS_DATABASE_ID
    });
    console.log('✅ Submissions Database:', submissionsDb.title[0]?.plain_text);
    console.log('   URL:', submissionsDb.url);
    
    console.log('\n🎉 ALL CONNECTIONS SUCCESSFUL!');
    console.log('✅ Ready to work with your databases');
    console.log('✅ Can now create scripts for email campaigns');
    console.log('✅ Can now set up Typebot integration');
    
  } catch (error) {
    console.log('\n❌ Connection failed:', error.message);
    if (error.code === 'object_not_found') {
      console.log('   Check that the database IDs are correct');
    }
    if (error.code === 'unauthorized') {
      console.log('   Check that the NOTION_TOKEN is correct');
    }
  }
}

testConnection();


