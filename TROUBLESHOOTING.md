# Troubleshooting Guide

Common issues and solutions for the Aroma Queen Ads Banner Plugin.

## Table of Contents

1. [Plugin Not Showing in Admin](#plugin-not-showing-in-admin)
2. [Settings Not Visible](#settings-not-visible)
3. [Ads Not Displaying](#ads-not-displaying)
4. [Deprecation Warning](#deprecation-warning)
5. [Layout Issues](#layout-issues)
6. [Mobile Problems](#mobile-problems)
7. [Performance Issues](#performance-issues)

---

## Plugin Not Showing in Admin

### Symptom
You go to **Admin → Plugins** but don't see "discourse-aroma-queen-ads-banner" listed.

### Solutions

#### 1. Did You Rebuild?
After installing the plugin, you MUST rebuild:

```bash
cd /var/discourse
./launcher rebuild app
```

Wait 5-10 minutes for rebuild to complete.

#### 2. Check Plugin Directory
Verify the plugin files exist:

```bash
ls -la /var/discourse/plugins/discourse-aroma-queen-ads-banner/
```

You should see: `plugin.rb`, `config/`, `assets/`, etc.

#### 3. Check app.yml
If installed via Git, verify your `app.yml` has the git clone line:

```bash
cd /var/discourse
cat containers/app.yml | grep aroma
```

Should show the git clone command.

#### 4. Check for Installation Errors

```bash
cd /var/discourse
./launcher logs app | grep -i error | grep -i aroma
```

---

## Settings Not Visible

### Symptom
Plugin shows in **Admin → Plugins** list, but you can't find the settings.

### Solutions

#### 1. Search for Settings
1. Go to **Admin → Settings → Plugins**
2. Use the search box at top
3. Type: **aroma**
4. All settings should appear

#### 2. Direct URL
Try accessing settings directly:
```
https://your-site.com/admin/site_settings/category/plugins?filter=aroma
```

#### 3. Clear Cache
1. **Admin → Tools → Sidekiq → Clear Cache**
2. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Try logging out and back in

#### 4. Check settings.yml File
Verify the file exists and is valid:

```bash
cat /var/discourse/plugins/discourse-aroma-queen-ads-banner/config/settings.yml
```

Should show proper YAML syntax.

#### 5. Rebuild Again
Sometimes settings need a second rebuild:

```bash
cd /var/discourse
./launcher rebuild app
```

---

## Ads Not Displaying

### Symptom
Settings exist, but ads don't show on your site.

### Checklist

#### ✅ 1. Plugin Enabled?
- Go to settings
- Find **aroma ads banner enabled**
- Make sure it's checked ✅

#### ✅ 2. Position Enabled?
- Each position has its own "enabled" setting
- Example: **aroma ads after header enabled**
- Make sure the specific position is checked ✅

#### ✅ 3. HTML Code Added?
- Check the HTML field for that position
- Example: **aroma ads after header html**
- Should have actual HTML code, not empty

#### ✅ 4. Not Logged in as Staff?
- If **aroma ads hide for staff** is checked
- And you're logged in as admin/moderator
- You won't see ads
- **Solution**: Test in incognito window or log out

#### ✅ 5. Trust Level?
- If **aroma ads hide for trust level** is > 0
- And your account meets/exceeds that level
- You won't see ads
- **Solution**: Set to 0 for testing

#### ✅ 6. Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or use incognito window

#### ✅ 7. Check Browser Console
1. Press `F12` to open developer tools
2. Go to **Console** tab
3. Look for JavaScript errors
4. Look for errors mentioning "aroma" or "ads"

#### ✅ 8. Test with Simple HTML
Replace complex ad code with simple test:

```html
<div style="background: yellow; padding: 20px; text-align: center;">
  <h2>TEST AD</h2>
  <p>If you see this, the plugin is working!</p>
</div>
```

If this shows, your HTML ad code might be the issue.

---

## Deprecation Warning

### Symptom
Admin notice: "Plugin contains code that needs updating (ID:discourse.post-stream-widget-overrides)"

### Solution
Update to version 1.1.0 or higher. See [FIX-SUMMARY.md](FIX-SUMMARY.md) for details.

```bash
cd /var/discourse/plugins/discourse-aroma-queen-ads-banner
git pull origin main
cd /var/discourse
./launcher rebuild app
```

---

## Layout Issues

### Symptom
Ads display but look broken, overlap content, or have styling issues.

### Solutions

#### 1. Ad Too Wide
Add max-width to your HTML:

```html
<div style="max-width: 100%; overflow: hidden;">
  <!-- Your ad code here -->
</div>
```

#### 2. Ad Breaks Layout
Ensure images are responsive:

```html
<img src="your-ad.jpg" style="max-width: 100%; height: auto;">
```

#### 3. Ad Overlaps Content
Add margin/padding:

```html
<div style="margin: 20px 0; padding: 15px;">
  <!-- Your ad code here -->
</div>
```

#### 4. Dark Mode Issues
The plugin includes dark mode support, but your custom HTML might need adjustments:

```html
<div style="background: var(--secondary); color: var(--primary);">
  <!-- Uses Discourse theme colors -->
</div>
```

#### 5. Air Theme Conflicts
The plugin is designed for Air theme, but if you see issues:

1. Check for conflicting custom CSS
2. Try disabling theme components temporarily
3. Test with default theme

---

## Mobile Problems

### Symptom
Ads work on desktop but not mobile, or look broken on mobile.

### Solutions

#### 1. Test on Real Mobile Device
- Mobile emulator in browser may not show true experience
- Test on actual phone/tablet

#### 2. Enable Mobile Banner
- Check **aroma ads mobile banner enabled**
- Add mobile-specific HTML in **aroma ads mobile banner html**

#### 3. Make Ads Responsive
Use responsive CSS:

```html
<div style="max-width: 100%; padding: 10px;">
  <img src="ad.jpg" style="width: 100%; height: auto;">
</div>
```

#### 4. Test Viewport
Use browser DevTools:
1. Press `F12`
2. Click device toolbar icon (or `Ctrl+Shift+M`)
3. Select mobile device
4. Test different screen sizes

#### 5. Check Mobile-Specific CSS
The plugin includes mobile styles. If you added custom CSS, ensure it's responsive:

```css
@media screen and (max-width: 768px) {
  .your-custom-ad {
    font-size: 14px;
    padding: 10px;
  }
}
```

---

## Performance Issues

### Symptom
Site loading slower after installing plugin, or ads cause lag.

### Solutions

#### 1. Optimize Ad Images
- Compress images before using
- Use WebP format when possible
- Recommended max size: 200KB per ad

#### 2. Lazy Load External Scripts
If using external ad networks:

```html
<script async defer src="external-ad-script.js"></script>
```

Add `async` and/or `defer` attributes.

#### 3. Minimize Number of Ads
- Don't enable all positions at once
- Start with 1-2 positions
- Add more only if needed

#### 4. Check External Ad Networks
- Some ad networks (Google AdSense, etc.) may slow loading
- Test with simple HTML first
- If fast, the issue is with ad network

#### 5. Monitor with Browser DevTools
1. Press `F12`
2. Go to **Network** tab
3. Reload page
4. Check which resources are slow
5. Optimize those resources

#### 6. Check Discourse Performance
```bash
cd /var/discourse
./launcher logs app | grep -i "slow"
```

---

## Common Error Messages

### Error: "undefined is not a function"

**Cause**: JavaScript error, usually after update

**Solution**:
1. Clear browser cache
2. Hard refresh: `Ctrl+Shift+R`
3. Check browser console for full error message

### Error: "Cannot read property 'aroma_ads_banner_enabled'"

**Cause**: Settings not loaded properly

**Solution**:
1. Rebuild: `./launcher rebuild app`
2. Clear Discourse cache: **Admin → Tools → Clear Cache**
3. Check settings.yml file syntax

### Error: "YAML syntax error"

**Cause**: Invalid settings.yml file

**Solution**:
1. Check YAML syntax at https://www.yamllint.com/
2. Ensure proper indentation (use spaces, not tabs)
3. Restore from backup if needed

---

## Validation Checks

Run these checks to verify plugin is working:

### 1. Plugin Installed?
```bash
ls -la /var/discourse/plugins/discourse-aroma-queen-ads-banner/plugin.rb
```
Should exist.

### 2. Plugin Active?
Visit: `https://your-site.com/admin/plugins`
Should see "discourse-aroma-queen-ads-banner"

### 3. Settings Exist?
Visit: `https://your-site.com/admin/site_settings/category/plugins?filter=aroma`
Should see multiple settings.

### 4. JavaScript Loaded?
1. Visit your site
2. Press `F12` → Console
3. Type: `Discourse.SiteSettings.aroma_ads_banner_enabled`
4. Should return `true` or `false`, not `undefined`

### 5. CSS Loaded?
1. Visit your site
2. Press `F12` → Elements/Inspector
3. Search for: `aroma-ads`
4. Should find CSS classes

---

## Getting More Help

### Before Asking for Help

Gather this information:

1. **Discourse Version**: Admin → Dashboard → check version
2. **Plugin Version**: Check `plugin.rb` or `about.json`
3. **Browser**: Chrome/Firefox/Safari and version
4. **Error Messages**: Any errors from browser console or logs
5. **What You've Tried**: List troubleshooting steps already taken

### Where to Get Help

1. **Documentation**
   - [README.md](README.md) - Full documentation
   - [INSTALLATION.md](INSTALLATION.md) - Installation guide
   - [SETTINGS-GUIDE.md](SETTINGS-GUIDE.md) - Settings reference

2. **Community**
   - [Discourse Meta](https://meta.discourse.org)
   - Search for similar issues first
   - Post with information gathered above

3. **GitHub**
   - Check existing issues
   - Create new issue with details

---

## Quick Diagnostic Script

Run this to get diagnostic info:

```bash
#!/bin/bash
echo "=== Aroma Ads Banner Plugin Diagnostics ==="
echo ""
echo "Plugin Directory:"
ls -la /var/discourse/plugins/discourse-aroma-queen-ads-banner/ 2>&1
echo ""
echo "Plugin Version:"
grep "version:" /var/discourse/plugins/discourse-aroma-queen-ads-banner/plugin.rb 2>&1
echo ""
echo "Settings File:"
cat /var/discourse/plugins/discourse-aroma-queen-ads-banner/config/settings.yml 2>&1 | head -20
echo ""
echo "Recent Errors:"
cd /var/discourse
./launcher logs app 2>&1 | grep -i "aroma\|error" | tail -20
echo ""
echo "=== End Diagnostics ==="
```

Save as `diagnose-aroma-ads.sh`, make executable, and run:

```bash
chmod +x diagnose-aroma-ads.sh
./diagnose-aroma-ads.sh
```

---

**Still having issues?** Please refer to [SETTINGS-GUIDE.md](SETTINGS-GUIDE.md) for detailed settings information.

---

Last Updated: October 1, 2025

