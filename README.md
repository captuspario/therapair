# Therapair Matching Widget

**Intelligent therapist matching widget for Unison Mental Health**

## 🎯 Overview

A responsive, adaptive questionnaire that matches users with compatible therapists based on their specific needs, preferences, and circumstances. Features dynamic question flow, multiple choice support, and intelligent matching algorithms.

## ✨ Features

- **Adaptive Question Flow** - 10 contextual questions that adapt based on user responses
- **Multiple Choice Support** - Select multiple options where appropriate
- **Intelligent Matching** - Multi-factor algorithm considering availability, funding, specialties, and preferences
- **Mobile Optimized** - Responsive design works perfectly on all devices
- **Accessibility** - Keyboard navigation and screen reader friendly
- **Fallback Images** - Beautiful gradient placeholders if photos don't load

## 📁 File Structure

```
therapair-website/
├── therapair-widget.html           # Main widget (for hosting deployment)
├── therapair-standalone.html       # Complete standalone file (for local/testing)
├── new-iframe-code.html            # Elementor iframe code
├── images/                         # Therapist photos
│   └── therapair/
├── README.md                       # This file
├── UPDATED-IMPLEMENTATION.md       # Implementation guide
└── # Therapair Copy-new.md         # Source copy content
```

## 🚀 Deployment Options

### Option 1: Hostinger Deployment (Production)

1. **Upload Files**:
   ```
   /public_html/therapair/
   ├── therapair-widget.html    ← Main widget file
   └── images/
       └── therapair/           ← Therapist photos
   ```

2. **Add to Elementor**:
   - Copy code from `new-iframe-code.html`
   - Paste into Elementor HTML widget
   - Publish page

### Option 2: Local Testing/Standalone Use

1. **Open** `therapair-standalone.html` directly in any browser
2. **Test** all functionality locally
3. **No server required** - works completely offline
4. **Perfect for** development, testing, and demonstrations

### Option 3: Other Hosting Platforms

- Upload `therapair-widget.html` to your preferred directory
- Update the iframe `src` path accordingly
- Ensure images are accessible

## 📋 Question Flow

1. **Who** - Who is seeking therapy?
2. **Age** - Age requirements and restrictions
3. **Location** - Online vs in-person preference
4. **Concerns** - What brings you to therapy? (Multiple choice)
5. **Funding** - Available funding options (Multiple choice)
6. **Availability** - Days of the week available (Multiple choice)
7. **Urgency** - When do you want to start?
8. **Approach** - Therapy approach preferences (Multiple choice)
9. **Community** - Important communities/experiences (Multiple choice)
10. **Gender** - Therapist gender preference

## 👥 Therapists Included

- **Nicki Nelis** - Gestalt therapist, LGBTQI+ & trauma specialist
- **Adam Forman** - Relationship counselor & mediator
- **Natasha Lama** - Sex therapist with cultural sensitivity
- **Genevieve Autret** - Psychedelic integration specialist
- **Emma Steains** - Clinical psychologist, veterans specialist
- **Michael Spurrier** - Trauma, addiction & neurodivergence
- **Meg Wilson** - Art therapy & relationship specialist
- **Joe Stark** - Psychiatrist & psychedelic therapy pioneer

## 🔧 Technical Details

### Technologies Used
- Pure HTML/CSS/JavaScript (no external dependencies except Google Fonts)
- Responsive CSS Grid and Flexbox
- Modern ES6+ JavaScript
- Progressive enhancement approach

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight (~30KB total)
- Fast loading with lazy image loading
- Optimized animations and transitions
- Mobile-first responsive design

## 📱 Mobile Optimization

- Touch-friendly interface
- Optimized button sizes for mobile
- Responsive typography
- Smooth scrolling and animations
- Proper viewport handling

## 🎨 Styling

### Brand Colors
- Primary: `#9B74B7` (Therapair Purple)
- Secondary: `#4F064F` (Dark Purple)
- Background: `#F8F4FF` (Light Purple Tint)
- Text: `#111827` (Dark Gray)

### Typography
- Font: Open Sans (Google Fonts)
- Responsive font sizes
- Proper line heights for readability

## 🔄 Update Workflow

1. **Edit** `therapair-widget.html` locally
2. **Test** changes using `therapair-standalone.html`
3. **Commit** to git repository
4. **Upload** to hosting via file manager
5. **Verify** live functionality

## 📊 Matching Algorithm

The widget uses a sophisticated matching system that considers:

- **Gender preference** filtering
- **Age group** compatibility
- **Location** preference (online/in-person)
- **Funding options** availability
- **Day availability** overlap
- **Specialty areas** alignment
- **Community** preferences
- **Therapy approach** preferences

### Fallback Logic
- If no exact matches: returns top 3 eligible therapists
- Graceful degradation for all edge cases
- Always provides meaningful recommendations

## 🛠 Customization

### Adding New Therapists
Edit the `therapists` array in both widget files:

```javascript
{
    name: "Therapist Name",
    gender: "female|male",
    image: getImagePath("filename.jpg"),
    tagline: "Brief description",
    specialties: ["Specialty 1", "Specialty 2"],
    // ... other properties
}
```

### Modifying Questions
Edit the `questionFlow` array to add/modify questions:

```javascript
{
    id: "question_id",
    text: "Question text?",
    type: "single|multiple",
    options: [
        { text: "Option text", value: "option_value" }
    ]
}
```

## 🧪 Testing

### Local Testing
1. Open `therapair-standalone.html` in browser
2. Test all question flows
3. Verify matching logic
4. Check mobile responsiveness

### Production Testing
1. Upload to staging environment
2. Test iframe integration
3. Verify image loading
4. Check cross-browser compatibility

## 🎉 Ready to Deploy

This widget is production-ready and includes:

- ✅ Comprehensive question flow
- ✅ Intelligent matching algorithm
- ✅ Mobile-optimized design
- ✅ Accessibility features
- ✅ Error handling and fallbacks
- ✅ Professional styling
- ✅ Easy customization options
- ✅ Standalone testing version

Perfect for helping users find their ideal therapist match! 🌟