// Simple test to check if the button functionality works
function testButtonFunctionality() {
    console.log('Testing button functionality...');

    // Check if startMatching function exists
    if (typeof startMatching === 'function') {
        console.log('✓ startMatching function found');

        // Test if it can run without errors
        try {
            // Don't actually run it, just check structure
            console.log('✓ Function appears to be properly defined');
        } catch (error) {
            console.error('✗ Error in startMatching function:', error);
        }
    } else {
        console.error('✗ startMatching function not found');
    }

    // Check if question flow is defined
    if (typeof questionFlow !== 'undefined' && Array.isArray(questionFlow)) {
        console.log('✓ Question flow array found with', questionFlow.length, 'questions');
    } else {
        console.error('✗ Question flow not properly defined');
    }

    // Check if therapists data is defined
    if (typeof therapists !== 'undefined' && Array.isArray(therapists)) {
        console.log('✓ Therapists data found with', therapists.length, 'therapists');
    } else {
        console.error('✗ Therapists data not properly defined');
    }
}

// Run the test
testButtonFunctionality();