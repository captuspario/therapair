# Therapair Therapist Matching Tool - Website Deployment Package

## 📁 Package Contents

This folder contains everything needed to deploy the Therapair therapist matching tool to your website:

### Core Files
- **`therapair-standalone.html`** - Complete standalone application (main file)
- **`images/`** - All optimized therapist profile images
- **`WordPress-Elementor-Integration.md`** - Detailed integration instructions
- **`Therapair-Copy-Elements.md`** - All text content for copywriters
- **`Design System.md`** - Brand guidelines and color specifications

## 🚀 Quick Deployment Guide

### Option 1: Direct Upload (Recommended)
1. Upload the entire folder to your website's root directory or a subfolder
2. Access via: `yourwebsite.com/therapair-website-deployment/therapair-standalone.html`
3. Test the application to ensure all images load correctly

### Option 2: Elementor Integration
1. Follow instructions in `WordPress-Elementor-Integration.md`
2. Copy the HTML content from `therapair-standalone.html`
3. Paste into an Elementor HTML widget
4. Upload images to your WordPress media library
5. Update image paths in the HTML if needed

## 🎯 Key Features

- ✅ **Fully Responsive** - Works on desktop, tablet, and mobile
- ✅ **Self-Contained** - No external dependencies required
- ✅ **Optimized Images** - All therapist photos are web-optimized
- ✅ **Professional Design** - Matches Therapair brand guidelines
- ✅ **Accessible** - WCAG compliant color contrast and interactions
- ✅ **Gender Filtering** - Respects user gender preferences
- ✅ **Clean UI** - Modern, professional interface

## 🎨 Design System

- **Background**: `#F8F4FF` (very light purple)
- **Primary Purple**: `#9B74B7` (buttons, progress bars)
- **Hover/Selection**: `#4F064F` (dark purple for interactions)
- **Text**: `#202020` (dark gray for readability)
- **Font**: Google Open Sans (loaded from Google Fonts)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Customization

### Updating Therapist Information
1. Edit the therapist data in `therapair-standalone.html` (lines 236-315)
2. Update images in the `images/` folder
3. Modify image paths if needed

### Changing Colors
1. Update CSS variables in the `<style>` section
2. Ensure contrast ratios meet accessibility standards
3. Test across different devices and browsers

### Adding New Questions
1. Add to the questions array in the JavaScript
2. Update matching logic in `getMatchedTherapists()` function
3. Test the complete user journey

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Analytics Integration

To track usage, add your analytics code before the closing `</body>` tag in `therapair-standalone.html`:

```html
<!-- Google Analytics or other tracking code -->
<script>
  // Your analytics code here
</script>
```

## 🔒 Security Notes

- All images are optimized for web use
- No external API calls or data collection
- Client-side only application
- GDPR compliant (no personal data stored)

## 📞 Support

For technical support or customization requests, refer to:
- `WordPress-Elementor-Integration.md` for integration help
- `Design System.md` for brand guidelines
- `Therapair-Copy-Elements.md` for content updates

## 🎯 Testing Checklist

Before going live:
- [ ] Test on desktop, tablet, and mobile
- [ ] Verify all images load correctly
- [ ] Check gender filtering works properly
- [ ] Test quiz completion and results
- [ ] Verify responsive design
- [ ] Check color contrast accessibility
- [ ] Test in different browsers

---

**Ready to deploy!** 🚀
