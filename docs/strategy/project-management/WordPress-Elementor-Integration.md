# WordPress/Elementor Integration Guide

## 🚀 **Typebot-like Experience Without API**

### **Option 1: Standalone HTML (Recommended)**

I've created a complete standalone HTML file (`therapair-standalone.html`) that emulates the Typebot experience without requiring any external APIs or complex setup.

**Features:**
- ✅ **Pure HTML/CSS/JavaScript** - No dependencies
- ✅ **Chat-like interface** with bubbles and typing effects
- ✅ **Progress indicators** showing quiz completion
- ✅ **Responsive design** that works on all devices
- ✅ **Smooth animations** and hover effects
- ✅ **Complete matching logic** with all 8 therapists
- ✅ **Therapair branding** and design system

### **Option 2: Typebot Self-Hosted (Advanced)**

If you want the full Typebot experience:

1. **Install Typebot Self-Hosted:**
```bash
# Using Docker (easiest)
git clone https://github.com/baptisteArno/typebot.io.git
cd typebot.io
docker-compose up -d
```

2. **Import our flow:**
   - Use the `therapair-matching-flow.json` file
   - Import into your self-hosted Typebot instance
   - Get the embed code for your site

---

## 📱 **WordPress/Elementor Implementation**

### **Method 1: HTML Widget (Simplest)**

1. **Upload the standalone file:**
   - Upload `therapair-standalone.html` to your WordPress media library
   - Or copy the HTML content directly

2. **Add to Elementor:**
   - Drag an **HTML Widget** to your page
   - Paste the entire HTML content
   - Publish and test

### **Method 2: Custom Page Template**

1. **Create a custom template:**
```php
<?php
/*
Template Name: Therapair Matching
*/
get_header(); ?>

<div class="therapair-container">
    <?php include get_template_directory() . '/therapair-standalone.html'; ?>
</div>

<?php get_footer(); ?>
```

2. **Apply to a page:**
   - Create a new page
   - Select "Therapair Matching" template
   - Publish

### **Method 3: Shortcode (Most Flexible)**

1. **Create a shortcode function:**
```php
// Add to functions.php or a custom plugin
function therapair_matching_shortcode($atts) {
    ob_start();
    include get_template_directory() . '/therapair-standalone.html';
    return ob_get_clean();
}
add_shortcode('therapair_matching', 'therapair_matching_shortcode');
```

2. **Use anywhere:**
   - `[therapair_matching]` in posts, pages, or widgets
   - Works in Elementor text widgets

---

## 🎨 **Customization Options**

### **Colors & Branding**
Edit these CSS variables in the HTML:
```css
:root {
    --therapair-bg: #D0B2E6;        /* Background */
    --therapair-text: #202020;      /* Text color */
    --therapair-primary: #9B74B7;   /* Buttons, progress */
    --therapair-border: #EAE6EE;    /* Borders */
}
```

### **Questions & Logic**
Modify the `questions` array in the JavaScript:
```javascript
const questions = [
    {
        id: "relationship",
        text: "Your custom question here",
        options: ["Option 1", "Option 2", "Option 3"]
    }
    // Add more questions...
];
```

### **Therapist Data**
Update the `therapists` array with your team:
```javascript
const therapists = [
    {
        name: "Dr. Jane Smith",
        image: "/path/to/image.jpg",
        tagline: "Specialized in...",
        specialties: ["Specialty 1", "Specialty 2"],
        availability: "Available this week",
        tags: ["tag1", "tag2"]
    }
];
```

---

## 🔧 **Advanced Features**

### **Analytics Integration**
Add Google Analytics tracking:
```javascript
// Add to selectOption function
gtag('event', 'quiz_answer', {
    'question_id': questions[currentQuestion].id,
    'answer': option,
    'question_number': currentQuestion + 1
});

// Add to showResults function
gtag('event', 'quiz_complete', {
    'matched_therapists': matchedTherapists.length,
    'gender_preference': responses.gender
});
```

### **Form Integration**
Connect to your booking system:
```javascript
// Replace the "Book Now" button onclick
function bookTherapist(therapistName) {
    // Redirect to booking form with therapist pre-selected
    window.location.href = `/booking/?therapist=${encodeURIComponent(therapistName)}`;
}
```

### **Email Integration**
Send results via email:
```javascript
// Add email capture before showing results
function captureEmail() {
    const email = prompt("Enter your email to receive these matches:");
    if (email) {
        // Send to your backend
        fetch('/api/save-results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, responses, matches })
        });
    }
}
```

---

## 📊 **Performance Optimization**

### **Image Optimization**
- Use WebP format for therapist images
- Implement lazy loading
- Add proper alt text for accessibility

### **Caching**
- Enable WordPress caching (WP Rocket, W3 Total Cache)
- Use CDN for static assets
- Minify CSS/JS if needed

### **Mobile Optimization**
- Test on real devices
- Ensure touch targets are 44px minimum
- Optimize for slow connections

---

## 🚀 **Launch Checklist**

- [ ] Test on desktop, tablet, and mobile
- [ ] Verify all images load correctly
- [ ] Test the complete quiz flow
- [ ] Check therapist matching logic
- [ ] Validate booking links work
- [ ] Test with different browsers
- [ ] Verify accessibility (screen readers)
- [ ] Add analytics tracking
- [ ] Set up form submissions
- [ ] Create backup of working version

---

## 💡 **Pro Tips**

1. **Start Simple:** Use the standalone HTML first, then add complexity
2. **Test Thoroughly:** Try every combination of answers
3. **Mobile First:** Most users will be on mobile devices
4. **Fast Loading:** Optimize images and minimize external requests
5. **Accessibility:** Ensure keyboard navigation works
6. **Analytics:** Track completion rates and drop-off points

The standalone HTML file gives you a complete, professional therapist matching experience that works perfectly in WordPress/Elementor without any external dependencies!
