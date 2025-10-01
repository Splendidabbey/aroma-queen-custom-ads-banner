# Installation Guide - Aroma Queen Custom Ads Banner

## Quick Start Guide

This guide will walk you through the installation process step by step.

## Prerequisites

- A running Discourse installation (version 2.7.0 or higher)
- Admin access to your Discourse instance
- SSH access to your server (for command-line installation)

## Installation Methods

### Method 1: Git Installation (Recommended)

This is the easiest method and allows for easy updates.

#### Step 1: SSH into Your Server

```bash
ssh your-user@your-server.com
```

#### Step 2: Navigate to Discourse Directory

```bash
cd /var/discourse
```

#### Step 3: Edit app.yml

```bash
nano containers/app.yml
```

#### Step 4: Add Plugin to app.yml

Find the section with `hooks:` and `after_code:`, then add the git clone command:

```yaml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/yourusername/discourse-aroma-queen-ads-banner.git
```

#### Step 5: Rebuild Discourse

```bash
./launcher rebuild app
```

This process will take 5-10 minutes. Once complete, your plugin will be installed!

### Method 2: Manual File Upload

If you don't have SSH access or prefer manual installation:

#### Step 1: Download Plugin Files

Download all files from this repository to your local computer.

#### Step 2: Access Plugin Directory

Use SFTP or your hosting provider's file manager to access:
```
/var/discourse/plugins/
```

#### Step 3: Create Plugin Folder

Create a new folder:
```
discourse-aroma-queen-ads-banner
```

#### Step 4: Upload Files

Upload all plugin files to the newly created folder.

#### Step 5: Restart Discourse

Through your hosting control panel or SSH:
```bash
cd /var/discourse
./launcher restart app
```

## Post-Installation Configuration

### Step 1: Verify Installation

1. Log in to your Discourse admin panel
2. Go to **Admin → Settings → Plugins**
3. Look for "discourse-aroma-queen-ads-banner" in the list
4. If you see it, the installation was successful!

### Step 2: Enable the Plugin

1. In the plugins list, find "Aroma Queen Ads Banner Plugin"
2. Check the box for **"aroma ads banner enabled"**
3. Save changes

### Step 3: Configure Your First Ad Banner

#### Example: After Header Banner

1. Scroll down to find **"aroma ads after header enabled"**
2. Check the box to enable it
3. In **"aroma ads after header html"**, add your ad code:

```html
<div style="text-align: center; padding: 20px; background: #f0f0f0;">
  <img src="https://via.placeholder.com/728x90?text=Your+Ad+Here" alt="Advertisement">
</div>
```

4. Save changes
5. Visit your site to see the banner appear!

### Step 4: Test Different Positions

Try enabling different banner positions one at a time to find what works best for your site:

- ✅ After Header (site-wide, top placement)
- ✅ After First Post (high visibility in topics)
- ✅ After Nth Post (recurring visibility)
- ✅ Sidebar (persistent, non-intrusive)
- ✅ Before Footer (bottom placement)
- ✅ Topic List Top (category pages)
- ✅ Mobile Banner (mobile-specific)

## Setting Up Different Ad Networks

### Google AdSense

1. Get your AdSense code from Google
2. Paste it into any banner HTML field
3. Save and wait for ads to appear (may take a few minutes)

**Example AdSense Code:**
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

### Media.net

```html
<script type="text/javascript">
    window._mNHandle = window._mNHandle || {};
    window._mNHandle.queue = window._mNHandle.queue || [];
    medianet_width = "728";
    medianet_height = "90";
    medianet_crid = "YOUR_CRID_HERE";
    medianet_versionId = "3111299";
</script>
<script src="https://contextual.media.net/dmedianet.js?cid=YOUR_CID_HERE" async="async"></script>
```

### Custom Image Ads

```html
<div style="text-align: center;">
  <a href="https://yoursite.com/offer" target="_blank">
    <img src="https://yoursite.com/banner.jpg" alt="Special Offer" style="max-width: 100%; height: auto;">
  </a>
</div>
```

## Privacy Settings Configuration

### Hide Ads from Staff

Perfect for keeping your admin experience clean:

1. Find **"aroma ads hide for staff"**
2. Check the box
3. Save changes

Now logged-in staff won't see any ads!

### Hide Ads by Trust Level

Reward active community members:

1. Find **"aroma ads hide for trust level"**
2. Set value:
   - `0` = Show ads to everyone
   - `1` = Hide from Basic users and above
   - `2` = Hide from Member users and above
   - `3` = Hide from Regular users and above
   - `4` = Hide from Leader users only
3. Save changes

## Troubleshooting Installation Issues

### Plugin Not Appearing in Admin

**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Try logging out and back in
4. Check error logs: `/var/discourse/shared/standalone/log/rails/production.log`

### Rebuild Failed

**Solution:**
1. Check for syntax errors in app.yml
2. Ensure you have enough disk space: `df -h`
3. Check Docker is running: `docker ps`
4. Try again: `./launcher rebuild app`

### Ads Not Displaying

**Solution:**
1. Verify plugin is enabled
2. Check that specific banner position is enabled
3. Ensure HTML code is valid
4. Check browser console for JavaScript errors
5. Try with a simple test ad (plain image)

### Permission Errors During Installation

**Solution:**
```bash
# Fix permissions
cd /var/discourse
sudo chown -R discourse:discourse plugins/discourse-aroma-queen-ads-banner
```

## Updating the Plugin

### Git Installation (Automatic)

Simply rebuild to get the latest version:

```bash
cd /var/discourse
./launcher rebuild app
```

### Manual Installation

1. Download latest files
2. Replace old files in plugin directory
3. Restart Discourse:
```bash
cd /var/discourse
./launcher restart app
```

## Uninstallation

If you need to remove the plugin:

### Step 1: Remove from app.yml

Edit your app.yml and remove the git clone line for this plugin.

### Step 2: Delete Plugin Folder

```bash
cd /var/discourse/plugins
rm -rf discourse-aroma-queen-ads-banner
```

### Step 3: Rebuild

```bash
cd /var/discourse
./launcher rebuild app
```

## Getting Help

If you encounter issues:

1. 📖 Check the [README.md](README.md) for detailed documentation
2. 🔍 Search [Discourse Meta](https://meta.discourse.org)
3. 💬 Ask in the Discourse community
4. 🐛 Report bugs on GitHub

## Next Steps

After successful installation:

1. ✅ Read the [README.md](README.md) for full feature documentation
2. ✅ Configure your preferred ad positions
3. ✅ Test on desktop and mobile
4. ✅ Monitor ad performance
5. ✅ Adjust settings based on user feedback

---

**Congratulations! Your Aroma Queen Ads Banner Plugin is now installed!** 🎉



