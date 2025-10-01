# Settings Guide - Aroma Queen Ads Banner Plugin

## How to Access Plugin Settings

### Step 1: Go to Admin Panel
1. Log in as an administrator
2. Click your avatar (top right)
3. Click **Admin** (or go to `https://your-site.com/admin`)

### Step 2: Navigate to Settings
1. In the admin sidebar, click **Settings**
2. Click **Plugins** in the left menu
3. Use the search box at the top and type: **aroma**
4. You should see all the "aroma ads" settings appear

### Alternative: Direct URL
Go directly to: `https://your-site.com/admin/site_settings/category/plugins?filter=aroma`

## Available Settings

### ✅ Main Plugin Control

**aroma ads banner enabled**
- Type: Checkbox
- Default: ON
- Description: Master switch for the entire plugin

---

### 👥 Visibility Settings

**aroma ads hide for staff**
- Type: Checkbox
- Default: OFF
- Description: Hide all ads from staff members (admins & moderators)

**aroma ads hide for trust level**
- Type: Number (0-4)
- Default: 0
- Description: Hide ads from users at or above this trust level
  - 0 = Show to everyone
  - 1 = Hide from Basic and above
  - 2 = Hide from Member and above
  - 3 = Hide from Regular and above
  - 4 = Hide from Leader only

---

### 📍 Ad Position Settings

Each position has TWO settings:
1. **enabled** - Checkbox to turn that position on/off
2. **html** - Text field for your ad HTML code

#### 1. After Header Banner

**aroma ads after header enabled**
- Checkbox to enable

**aroma ads after header html**
- Text field for HTML
- Shows below the site header
- Site-wide visibility

#### 2. After First Post Banner

**aroma ads after first post enabled**
- Checkbox to enable

**aroma ads after first post html**
- Text field for HTML
- Shows after the first post in topics
- High visibility position

#### 3. After Nth Post Banner

**aroma ads after nth post enabled**
- Checkbox to enable

**aroma ads after nth post number**
- Number field (1-100)
- Default: 5
- Shows ad every N posts

**aroma ads after nth post html**
- Text field for HTML

#### 4. Sidebar Banner

**aroma ads sidebar enabled**
- Checkbox to enable

**aroma ads sidebar html**
- Text field for HTML
- Shows in sidebar area

#### 5. Before Footer Banner

**aroma ads before footer enabled**
- Checkbox to enable

**aroma ads before footer html**
- Text field for HTML
- Shows before the site footer

#### 6. Topic List Top Banner

**aroma ads topic list top enabled**
- Checkbox to enable

**aroma ads topic list top html**
- Text field for HTML
- Shows at top of category/topic lists

#### 7. Mobile Banner

**aroma ads mobile banner enabled**
- Checkbox to enable

**aroma ads mobile banner html**
- Text field for HTML
- Shows only on mobile devices

---

## Quick Setup Example

### Example 1: Simple After Header Ad

1. Find **aroma ads after header enabled** → ✅ Check it
2. Find **aroma ads after header html** → Paste this:

```html
<div style="text-align: center; padding: 20px; background: #f0f8ff;">
  <h3>Welcome to Our Community! 🎉</h3>
  <p>Check out our special offers</p>
</div>
```

3. Click **Save** (bottom right)
4. Visit your site to see the ad

### Example 2: Google AdSense

1. Find **aroma ads after first post enabled** → ✅ Check it
2. Find **aroma ads after first post html** → Paste your AdSense code:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

3. Click **Save**

---

## Troubleshooting: Settings Not Showing

### Issue: Can't see any plugin settings

**Solution 1: Rebuild Required**

After installing the plugin, you MUST rebuild:

```bash
cd /var/discourse
./launcher rebuild app
```

This takes 5-10 minutes.

**Solution 2: Clear Cache**

1. In admin panel: **Tools → Sidekiq → Clear Cache**
2. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Solution 3: Check Plugin is Active**

1. Go to **Admin → Plugins**
2. Look for "discourse-aroma-queen-ads-banner" in the list
3. If not there, plugin isn't installed correctly

**Solution 4: Check File Permissions**

```bash
cd /var/discourse/plugins/discourse-aroma-queen-ads-banner
ls -la
# Files should be readable
```

**Solution 5: Check for Errors**

```bash
cd /var/discourse
./launcher logs app
# Look for errors related to aroma-queen-ads-banner
```

### Issue: Settings exist but don't work

**Check 1: Plugin Enabled**
- Ensure **aroma ads banner enabled** is checked

**Check 2: Position Enabled**
- Check the specific position's "enabled" setting is ON

**Check 3: HTML Added**
- Make sure you've added HTML code in the html field

**Check 4: Not Staff**
- If "hide for staff" is ON, log out or use incognito mode to test

**Check 5: Clear Browser Cache**
- Hard refresh: `Ctrl+Shift+R`

---

## Settings File Location

The settings are defined in:
```
plugins/discourse-aroma-queen-ads-banner/config/settings.yml
```

If you manually edit this file, you MUST rebuild Discourse after.

---

## Best Practices

### 1. Test Settings One at a Time
- Enable one position
- Add simple HTML
- Test it works
- Then move to next position

### 2. Start Simple
```html
<div style="background: yellow; padding: 10px;">
  TEST AD - If you see this, it works!
</div>
```

### 3. Use Incognito Mode for Testing
- If you have "hide for staff" enabled
- Test in private/incognito window
- This shows you what regular users see

### 4. Mobile Testing
- Test mobile ads on actual mobile device
- Or use browser DevTools mobile emulator (F12 → Toggle device toolbar)

### 5. Validate HTML
- Use https://validator.w3.org/
- Ensures your ad HTML is valid
- Prevents display issues

---

## Settings Priority

Settings are checked in this order:

1. **Plugin Enabled?** → If NO, nothing shows
2. **User is Staff?** → If YES and "hide for staff" is ON, no ads
3. **User Trust Level?** → If >= threshold, no ads
4. **Position Enabled?** → If NO, that position doesn't show
5. **HTML Present?** → If empty, nothing to show

---

## Default Values

All settings start with these defaults:

- Main plugin: **ENABLED** ✅
- All positions: **DISABLED** ❌
- All HTML fields: **EMPTY**
- Hide for staff: **OFF**
- Trust level threshold: **0** (show to all)
- Nth post interval: **5**

This means after installation, the plugin is active but no ads show until you:
1. Enable a position
2. Add HTML code

---

## After Changing Settings

### What Happens Immediately:
- ✅ Settings are saved
- ✅ New page loads will use new settings

### What Requires Page Refresh:
- Changes to ad HTML
- Enabling/disabling positions
- Visibility settings

### What Requires Rebuild:
- Changing settings.yml file directly
- Installing/uninstalling plugin
- Major version updates

---

## Getting Help

### Can't Find Settings?
1. Check [INSTALLATION.md](INSTALLATION.md) - did you rebuild?
2. Check [FIX-SUMMARY.md](FIX-SUMMARY.md) - are you on latest version?
3. Post on Discourse Meta with screenshot

### Settings Not Working?
1. Check [README.md](README.md) - full feature documentation
2. Check [EXAMPLES.md](EXAMPLES.md) - working ad examples
3. Try simple test HTML first

### Other Issues?
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check browser console (F12) for errors
3. Check Discourse logs for errors

---

**Pro Tip**: Bookmark this URL to quickly access your settings:
```
https://YOUR-SITE.com/admin/site_settings/category/plugins?filter=aroma
```

Replace `YOUR-SITE.com` with your actual domain!

---

Made with ❤️ for the Aroma Queen Community

