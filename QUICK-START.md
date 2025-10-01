# Quick Start Guide

Get your ads running in 5 minutes! 🚀

## Step 1: Install the Plugin

### Option A: Using Git (Recommended)

```bash
cd /var/discourse
nano containers/app.yml
```

Add this line under `hooks: after_code:`:
```yaml
- git clone https://github.com/yourusername/discourse-aroma-queen-ads-banner.git
```

Then rebuild:
```bash
./launcher rebuild app
```

### Option B: Already Installed?
Skip to Step 2! ✅

## Step 2: Enable the Plugin (1 minute)

1. Go to **Admin Panel** (click your avatar → Admin)
2. Navigate to **Settings → Plugins**
3. Find "Aroma Queen Ads Banner Plugin"
4. ✅ Check **"aroma ads banner enabled"**
5. Click **Save**

## Step 3: Add Your First Ad (2 minutes)

### Simple Test Ad

1. In the same settings page, scroll to find:
   - **"aroma ads after header enabled"** → ✅ Check it
2. In **"aroma ads after header html"**, paste:

```html
<div style="text-align: center; padding: 20px; background: #f0f8ff; border-radius: 8px;">
  <h3 style="margin: 0 0 10px 0; color: #333;">🎉 Welcome to Our Community!</h3>
  <p style="margin: 0; color: #666;">Check out our special offers</p>
  <a href="https://yoursite.com" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">Learn More</a>
</div>
```

3. Click **Save**

## Step 4: View Your Ad (30 seconds)

1. Open your website in a new tab
2. Look at the top of the page
3. You should see your banner! 🎊

## Step 5: Customize (Optional)

### Want to show ads in different positions?

**After First Post** (great for topics):
- ✅ Enable **"aroma ads after first post enabled"**
- Add HTML in **"aroma ads after first post html"**

**Sidebar** (persistent):
- ✅ Enable **"aroma ads sidebar enabled"**
- Add HTML in **"aroma ads sidebar html"**

**Mobile Only**:
- ✅ Enable **"aroma ads mobile banner enabled"**
- Add HTML in **"aroma ads mobile banner html"**

### Privacy Options

**Hide ads from staff?**
- ✅ Check **"aroma ads hide for staff"**

**Hide ads from trusted users?**
- Set **"aroma ads hide for trust level"** to 2 or higher

## Common Ad Networks

### Google AdSense

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

### Custom Image

```html
<a href="https://yoursite.com/offer" target="_blank">
  <img src="https://yoursite.com/banner.jpg" alt="Ad" style="max-width: 100%; height: auto;">
</a>
```

## Troubleshooting

### Ad Not Showing?

✅ **Checklist:**
- [ ] Plugin enabled?
- [ ] Specific position enabled?
- [ ] HTML code added?
- [ ] Not logged in as staff (if "hide for staff" is on)?
- [ ] Cleared browser cache?

### Still Not Working?

1. Open browser console (F12)
2. Look for error messages
3. Check [INSTALLATION.md](INSTALLATION.md) for detailed troubleshooting

## Next Steps

- 📚 Read [README.md](README.md) for all features
- 🎨 Check [EXAMPLES.md](EXAMPLES.md) for ad templates
- 💡 Explore different placement options
- 📊 Monitor which positions work best

## Need Help?

- 📖 Full Documentation: [README.md](README.md)
- 🔧 Installation Help: [INSTALLATION.md](INSTALLATION.md)
- 💬 Community: [Discourse Meta](https://meta.discourse.org)

---

**That's it! You're all set up!** 🎉

Your ads are now live and working. Test different positions and designs to find what works best for your community.



