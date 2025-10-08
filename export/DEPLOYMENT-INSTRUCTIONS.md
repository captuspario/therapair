# Therapist Matching Widget - Deployment Instructions

## 📁 Export Contents

The `therapair-widget` folder contains everything needed for hosting:

```
therapair-widget/
├── index.html          # Main widget file (optimized for iframe)
└── images/             # Therapist photos
    ├── adam.jpeg
    ├── emma.jpeg
    ├── genevieve.jpeg
    ├── joe.jpeg
    ├── meg.jpeg
    ├── michael.jpeg
    ├── natasha.jpeg
    └── nicki.jpeg
```

## 🚀 Deployment Steps

### 1. Upload to Your Hosting
Upload the entire `therapair-widget` folder to your web server's public HTML directory.

**Example paths:**
- cPanel: `public_html/therapair-widget/`
- Plesk: `httpdocs/therapair-widget/`
- Generic: `/var/www/html/therapair-widget/`

### 2. Test the Widget
Visit your widget URL to ensure it works:
```
https://yourdomain.com/therapair-widget/
```

### 3. Embed in Elementor

#### Option A: HTML Widget (Recommended)
1. Add an **HTML** widget to your Elementor page
2. Paste this iframe code:

```html
<iframe
    src="https://yourdomain.com/therapair-widget/"
    width="100%"
    height="1200"
    frameborder="0"
    scrolling="auto"
    style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
</iframe>
```

#### Option B: Code Block Widget
1. Add a **Code Block** widget
2. Use the same iframe code above

## ⚙️ Configuration Options

### Iframe Height Adjustment
The widget height may vary based on content. Adjust the `height` value:
- **Minimum**: 800px (for mobile)
- **Recommended**: 1200px (for desktop)
- **Auto-sizing**: Use `height="auto"` if supported

### Responsive Design
The widget is fully responsive. For better mobile experience:

```html
<iframe
    src="https://yourdomain.com/therapair-widget/"
    width="100%"
    height="1200"
    frameborder="0"
    style="border: none; border-radius: 12px; min-height: 800px;">
</iframe>
```

### Custom Styling
Add custom CSS around the iframe:

```html
<div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
    <iframe src="https://yourdomain.com/therapair-widget/"
            width="100%" height="1200" frameborder="0"
            style="border: none; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
    </iframe>
</div>
```

## 🔧 Technical Details

### Widget Features
- ✅ Fully self-contained (no external dependencies)
- ✅ Mobile responsive design
- ✅ Optimized for iframe embedding
- ✅ Clean design without headers/footers
- ✅ Professional therapist matching algorithm
- ✅ Booking modal functionality

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized

### Performance
- Total size: ~2MB (including images)
- Load time: <3 seconds on standard hosting
- No external API calls required

## 🎨 Customization Notes

### Headlines & Branding
The widget has NO built-in headlines or footers, allowing you to:
- Add custom headlines above the iframe
- Style with your brand colors
- Add custom call-to-action text
- Include your own footer/branding

### Example Page Layout
```html
<!-- Your custom headline -->
<h2>Find Your Perfect Therapist</h2>
<p>Our matching tool connects you with qualified professionals.</p>

<!-- The widget iframe -->
<iframe src="https://yourdomain.com/therapair-widget/" ...></iframe>

<!-- Your custom footer -->
<p>Questions? Contact our support team.</p>
```

## 🛠️ Troubleshooting

### Widget Not Loading
1. Check the iframe `src` URL is correct
2. Ensure all files uploaded properly
3. Verify `index.html` is in the root of `therapair-widget` folder

### Images Not Showing
1. **Check Console for Error Messages**:
   - Open browser developer tools (F12)
   - Look for image loading errors in Console tab
   - Note which image paths are failing

2. **Verify File Upload**:
   - Confirm `images/` folder uploaded with all .jpeg files
   - Check file permissions (755 for folders, 644 for files)
   - Verify image filenames match exactly (case-sensitive)

3. **Test Image Access Directly**:
   - Try accessing image directly: `https://yourdomain.com/therapair-widget/images/adam.jpeg`
   - If 404 error, files weren't uploaded correctly
   - If 403 error, check file permissions

4. **Common Solutions**:
   - **Wrong Upload Location**: Ensure images folder is inside therapair-widget folder
   - **Case Sensitivity**: Linux servers are case-sensitive (adam.jpeg ≠ Adam.jpeg)
   - **File Permissions**: Set folder to 755, files to 644
   - **Server Configuration**: Some servers block .jpeg files (rename to .jpg if needed)

5. **Fallback System**:
   - Widget includes automatic fallback with colored initials
   - If images fail, purple gradient with therapist initials will show
   - Console will log which image paths failed for debugging

### Height Issues
1. Test different `height` values in the iframe
2. Use browser dev tools to measure actual content height
3. Consider `scrolling="auto"` for dynamic content

### Mobile Display
1. Ensure parent container has `width: 100%`
2. Test on actual mobile devices
3. Check Elementor's responsive settings

## 📞 Support

For technical issues:
1. Test the widget URL directly first
2. Check browser console for error messages
3. Verify all files are uploaded correctly
4. Ensure hosting supports HTML/JavaScript files

The widget is designed to work on standard web hosting with no special requirements.

---

## 🔧 Recent Updates (October 8, 2025)

### ✅ Spacing Issue Fixed
- **Problem**: Content-to-button spacing was inconsistent (-4px to 15px)
- **Solution**: Adjusted `.card-content` padding-bottom to 160px for consistent spacing
- **Result**: Proper ~35px spacing between content and buttons

### ✅ Image Loading Enhanced
- **Problem**: Images not loading in iframe deployment environments
- **Solution**: Added intelligent fallback system with multiple path attempts
- **Result**: Beautiful gradient fallbacks with therapist initials if images fail

### ✅ Current Widget Status
- **Max 3 therapists** displayed (optimized user experience)
- **Perfect button alignment** (4px variation)
- **Consistent card heights** (760px each)
- **Robust image loading** with automatic fallbacks
- **Professional appearance** maintained even with image loading issues

### 🚀 Upload Priority
Re-upload the updated widget files to get these improvements:
1. Upload the new `index.html` file (with spacing and image fixes)
2. Ensure `images/` folder is properly uploaded to: `/therapair-widget/images/`
3. Test image access directly: `https://unisonmentalhealth.com/therapair-widget/images/adam.jpeg`

### 🎯 Specific for unisonmentalhealth.com
The widget now detects your domain and will try these image paths in order:
1. `https://unisonmentalhealth.com/therapair-widget/images/[filename]`
2. `https://unisonmentalhealth.com/wp-content/uploads/therapair-widget/images/[filename]`
3. `https://unisonmentalhealth.com/images/[filename]`

**Critical**: Ensure images are uploaded to one of these locations with the exact filenames:
- adam.jpeg, emma.jpeg, genevieve.jpeg, joe.jpeg, meg.jpeg, michael.jpeg, natasha.jpeg, nicki.jpeg