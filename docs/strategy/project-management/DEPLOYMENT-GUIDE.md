# Therapair WordPress Deployment Guide

## Quick Setup (Fastest Method)

### Step 1: Add Shortcode to WordPress

1. **Copy the code** from `wordpress-functions.php`
2. **Paste it** into your theme's `functions.php` file:
   - WordPress Admin → Appearance → Theme Editor → functions.php
   - Or via FTP/cPanel File Manager

### Step 2: Upload Images

1. **Copy the `/images/` folder** to your WordPress theme directory:
   ```
   /wp-content/themes/your-theme/images/therapair/
   ```

### Step 3: Use in Elementor

1. **Add HTML widget** or **Shortcode widget**
2. **Enter shortcode**: `[therapair_widget]`
3. **Publish page**

---

## Automated Git → WordPress Workflow Options

### Option 1: WP Pusher Plugin (Recommended - Fastest)

1. **Install WP Pusher** plugin
2. **Connect to GitHub** repository: `https://github.com/captuspario/therapair.git`
3. **Auto-deploy** on every git push
4. **Files sync automatically** when you update your repo

**Benefits:**
- ✅ Instant updates from git
- ✅ No manual file copying
- ✅ Rollback capability

### Option 2: Manual File Sync

1. **Keep WordPress files** in your git repo
2. **Create `/wp-content/` structure** in your repo:
   ```
   /wp-content/
     /themes/
       /your-theme/
         functions.php
         /images/therapair/
   ```
3. **Upload via FTP/cPanel** when you push to git

### Option 3: GitHub Actions (Most Professional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to WordPress
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Deploy to WordPress
      uses: SamKirkland/FTP-Deploy-Action@4.0.0
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./wp-content/
        server-dir: /public_html/wp-content/
```

---

## File Structure for WordPress

```
your-wordpress-site/
├── wp-content/
│   └── themes/
│       └── your-theme/
│           ├── functions.php        ← Add shortcode code here
│           └── images/
│               └── therapair/       ← Upload images here
│                   ├── nicki-nelis-therapair-counsellor.jpg
│                   ├── adam-forman-therapair-counsellor.jpg
│                   ├── natasha-lama-therapair-sex-therapist.jpg
│                   ├── genevieve-autret-therapair-psychotherapist.jpg
│                   ├── emma-steains-therapair-clinical-psychologist.jpg
│                   ├── michael-spurrier-therapair-clinical-psychologist.jpg
│                   ├── meg-wilson-therapair-psychotherapist.jpg
│                   └── joe-stark-therapair-psychiatrist.jpg
```

---

## Usage in Elementor

### Method 1: Shortcode Widget
1. Add **Shortcode** widget
2. Enter: `[therapair_widget]`
3. Customize with parameters:
   ```
   [therapair_widget container_class="custom-style" max_width="4xl"]
   ```

### Method 2: HTML Widget
1. Add **HTML** widget
2. Enter: `<?php echo do_shortcode('[therapair_widget]'); ?>`

---

## Customization

### Custom Styling
Add to your theme's CSS:
```css
.therapair-container {
    background-color: your-color;
    border-radius: your-radius;
}
```

### Custom Parameters
```php
[therapair_widget container_class="my-custom-class" max_width="5xl"]
```

---

## Fastest Update Workflow

1. **Edit files** in your local git repo
2. **Commit & push** to GitHub
3. **WP Pusher automatically syncs** to WordPress
4. **Changes appear live** immediately

**Total time: 30 seconds** ⚡

---

## Troubleshooting

### Images not loading
- Check image paths in `wordpress-functions.php`
- Ensure images are in `/images/therapair/` folder
- Update `get_template_directory_uri()` path if needed

### Shortcode not working
- Verify code is in `functions.php`
- Check for PHP syntax errors
- Ensure no duplicate function names

### Styling issues
- Check CSS conflicts with theme
- Use browser dev tools to inspect
- Add `!important` if needed

---

## Security Notes

- ✅ All code is sanitized with `esc_attr()`
- ✅ No external dependencies
- ✅ Self-contained JavaScript
- ✅ No database queries
- ✅ Uses WordPress best practices