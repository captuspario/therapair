# Hostinger Fixes for Image Loading & Dynamic Height

## 🔧 **Issue Fixes**

### **Problem 1: Images showing as purple circles**
- **Cause**: Wrong image path in widget file
- **Solution**: Updated to correct theme path

### **Problem 2: Iframe not resizing properly**
- **Cause**: Fixed height iframe can't adapt to content changes
- **Solution**: Added dynamic height management

---

## 🚀 **Quick Fix Instructions**

### **Step 1: Replace Widget File**
1. **Delete old file**: `therapair-widget.html` from Hostinger
2. **Upload new file**: `hostinger-widget-v2.html` → rename to `therapair-widget-v2.html`

### **Step 2: Update Elementor Iframe Code**
Replace your HTML widget code with:

```html
<div id="therapair-iframe-container" style="width: 100%; margin: 2rem 0;">
    <iframe
        id="therapair-iframe"
        src="/wp-content/themes/twentytwentyfour/therapair-widget-v2.html"
        width="100%"
        height="700"
        frameborder="0"
        scrolling="no"
        style="border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); transition: height 0.3s ease;"
        title="Therapair Matching Widget">
    </iframe>
</div>

<script>
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'therapair-resize') {
        const iframe = document.getElementById('therapair-iframe');
        if (iframe) {
            iframe.style.height = (event.data.height + 50) + 'px';
        }
    }
});
</script>
```

---

## 🔍 **What's Fixed**

### **Image Loading Improvements:**
✅ **Multiple fallback paths** - tries different theme directories
✅ **Beautiful gradient fallbacks** - shows initials with color gradient if image fails
✅ **Error handling** - graceful degradation when images don't load
✅ **Correct path detection** - automatically finds the right image directory

### **Dynamic Height Management:**
✅ **Auto-resize iframe** - adjusts height based on content
✅ **Smooth transitions** - animated height changes
✅ **Mobile optimization** - proper sizing on all devices
✅ **Cross-browser support** - works in all modern browsers

---

## 📁 **Updated File Structure**

```
your-website/
└── public_html/
    └── wp-content/
        └── themes/
            └── twentytwentyfour/
                ├── therapair-widget-v2.html    ← New improved version
                └── images/
                    └── therapair/               ← Images folder
                        ├── nicki-nelis-therapair-counsellor.jpg
                        ├── adam-forman-therapair-counsellor.jpg
                        ├── natasha-lama-therapair-sex-therapist.jpg
                        ├── genevieve-autret-therapair-psychotherapist.jpg
                        ├── emma-steains-therapair-clinical-psychologist.jpg
                        ├── michael-spurrier-therapair-clinical-psychologist.jpg
                        ├── meg-wilson-therapair-psychotherapist.jpg
                        └── joe-stark-therapair-psychiatrist.jpg
```

---

## 🛠 **Customize Image Path**

If your theme is different, edit line 349 in `hostinger-widget-v2.html`:

```javascript
// Change the first path to match your theme:
const IMAGE_PATHS = [
    '/wp-content/themes/YOUR-THEME-NAME/images/therapair/',  // ← Update this
    '/wp-content/themes/twentytwentyfour/images/therapair/',
    '/wp-content/themes/astra/images/therapair/',
    // ... other fallbacks
];
```

---

## 📱 **Mobile Optimization**

The new version automatically:
- ✅ Adjusts height for mobile devices
- ✅ Provides appropriate fallback heights
- ✅ Uses responsive design principles
- ✅ Handles touch interactions properly

---

## 🧪 **Testing Steps**

1. **Upload new files** to Hostinger
2. **Update iframe path** in Elementor to point to `therapair-widget-v2.html`
3. **Test on desktop**: Widget should resize smoothly when answering questions
4. **Test on mobile**: Should display properly on phones/tablets
5. **Check images**: Should show therapist photos or nice gradient fallbacks

---

## 🆘 **Troubleshooting**

### Images still not loading?
- ✅ Check image files are uploaded to `/images/therapair/` folder
- ✅ Verify file names match exactly (case-sensitive)
- ✅ Update `IMAGE_PATHS` array to match your theme name

### Iframe still wrong height?
- ✅ Make sure you're using the new iframe code with JavaScript
- ✅ Check browser console for any errors
- ✅ Try refreshing the page after making changes

### Widget not working at all?
- ✅ Test direct URL: `yoursite.com/wp-content/themes/your-theme/therapair-widget-v2.html`
- ✅ Check file was uploaded correctly
- ✅ Verify iframe src path is correct

---

## 💡 **Backup Plan**

If images still don't work, the widget will show:
- **Beautiful gradient backgrounds** with therapist initials
- **All functionality intact** - matching still works perfectly
- **Professional appearance** - gradients are generated based on therapist names

**The widget is fully functional even without images!**