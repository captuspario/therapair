# Hostinger File Manager Setup Guide

## 🚀 Super Simple Setup (5 minutes)

### Step 1: Upload Files via Hostinger File Manager

1. **Login to Hostinger** → hPanel → File Manager
2. **Navigate to** `/public_html/wp-content/themes/your-theme/`
3. **Upload files:**
   - Upload `hostinger-widget.html` → rename to `therapair-widget.html`
   - Upload `/images/` folder to `/wp-content/themes/your-theme/images/therapair/`

### Step 2: Add to Elementor Page

1. **Edit page** in Elementor
2. **Add HTML Widget**
3. **Copy & paste** this code:

```html
<iframe
    src="/wp-content/themes/your-theme/therapair-widget.html"
    width="100%"
    height="800"
    frameborder="0"
    style="border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);"
    title="Therapair Matching Widget">
</iframe>
```

4. **Publish page** ✅

---

## File Structure

```
your-website/
└── public_html/
    └── wp-content/
        └── themes/
            └── your-theme/
                ├── therapair-widget.html    ← Upload this
                └── images/
                    └── therapair/           ← Upload this folder
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

## Alternative: Direct Upload Method

### Option A: Root Directory Upload
1. Upload `hostinger-widget.html` to `/public_html/`
2. Use iframe: `<iframe src="/hostinger-widget.html" ...>`

### Option B: Custom Folder
1. Create folder: `/public_html/therapair/`
2. Upload widget file there
3. Use iframe: `<iframe src="/therapair/hostinger-widget.html" ...>`

---

## Update Image Paths

Edit `therapair-widget.html` line 207 to match your upload location:

```javascript
// Change this line:
const IMAGE_BASE_PATH = '/wp-content/themes/your-theme/images/therapair/';

// To match your actual upload path, for example:
const IMAGE_BASE_PATH = '/wp-content/themes/twentytwentyfour/images/therapair/';
```

---

## Ultra-Fast Update Workflow

1. **Edit `hostinger-widget.html`** locally in your git repo
2. **Upload via Hostinger File Manager** (drag & drop)
3. **Changes appear immediately** on your website ⚡

**No WordPress editing needed!**

---

## Testing

1. **Upload files** to Hostinger
2. **Visit directly**: `yoursite.com/wp-content/themes/your-theme/therapair-widget.html`
3. **If it works** → add iframe to Elementor
4. **If images don't load** → check image paths in the HTML file

---

## Iframe Options

### Basic Iframe
```html
<iframe src="/wp-content/themes/your-theme/therapair-widget.html"
        width="100%"
        height="800"
        frameborder="0">
</iframe>
```

### Styled Iframe
```html
<iframe src="/wp-content/themes/your-theme/therapair-widget.html"
        width="100%"
        height="800"
        frameborder="0"
        style="border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); background: #F8F4FF;">
</iframe>
```

### Responsive Iframe
```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
    <iframe src="/wp-content/themes/your-theme/therapair-widget.html"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
    </iframe>
</div>
```

---

## Troubleshooting

### Widget not loading
- ✅ Check file path in iframe src
- ✅ Ensure file was uploaded correctly
- ✅ Test direct URL: `yoursite.com/path/to/therapair-widget.html`

### Images not loading
- ✅ Check images uploaded to correct folder
- ✅ Update `IMAGE_BASE_PATH` in the HTML file
- ✅ Verify image file names match

### Iframe too small/large
- ✅ Adjust height in iframe: `height="1000"`
- ✅ For mobile: use `height="900"` minimum

---

## Security Notes

- ✅ No database access required
- ✅ Self-contained HTML file
- ✅ No external dependencies (except Google Fonts)
- ✅ Works offline once loaded

---

## Benefits of This Method

- 🚀 **Fastest setup** - No PHP editing
- 🔄 **Easy updates** - Just upload new file
- 🎯 **Direct control** - No WordPress complications
- 📱 **Mobile optimized** - Responsive design
- ⚡ **Fast loading** - Minimal dependencies