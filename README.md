# Aroma Queen Custom Ads Banner Plugin for Discourse

An advanced, feature-rich ads banner plugin for Discourse with full Air theme compatibility and multilingual support (English/German).

## Features

✨ **Strategic Ad Placement**
- After site header
- After first post in topics
- After every Nth post
- Sidebar placement
- Before footer
- Top of topic lists
- Mobile-specific banners

🎨 **Air Theme Compatibility**
- Fully compatible with Discourse Air theme
- Beautiful, modern design
- Dark mode support
- Responsive layout
- Smooth animations and transitions

🌍 **Multilingual Support**
- English
- German (Deutsch)

🛡️ **Advanced Targeting**
- Hide ads from staff members
- Hide ads based on trust level
- User-specific visibility controls

📱 **Mobile Optimized**
- Responsive design
- Mobile-specific banner options
- Touch-friendly interface

## Installation

### Method 1: From Git Repository (Recommended)

1. Navigate to your Discourse installation directory
2. Add the plugin to your `app.yml`:

```yaml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - git clone https://github.com/yourusername/discourse-aroma-queen-ads-banner.git
```

3. Rebuild your Discourse installation:

```bash
cd /var/discourse
./launcher rebuild app
```

### Method 2: Manual Installation

1. Create a directory in your Discourse plugins folder:

```bash
cd /var/discourse/plugins
mkdir discourse-aroma-queen-ads-banner
```

2. Copy all plugin files into the directory
3. Rebuild your container:

```bash
cd /var/discourse
./launcher rebuild app
```

## Configuration

### Enabling the Plugin

1. Navigate to **Admin → Settings → Plugins**
2. Find "Aroma Queen Ads Banner Plugin"
3. Check "aroma ads banner enabled"

### Setting Up Ad Positions

#### After Header Banner

Perfect for site-wide announcements or premium ad placements.

1. Go to **Admin → Settings → Plugins → Aroma Queen Ads Banner**
2. Enable "aroma ads after header enabled"
3. Add your HTML/JavaScript code in "aroma ads after header html"

**Example:**
```html
<div class="ad-leaderboard">
  <img src="https://example.com/banner-728x90.jpg" alt="Advertisement">
</div>
```

#### After First Post Banner

Appears immediately after the first post in every topic.

1. Enable "aroma ads after first post enabled"
2. Add your ad code in "aroma ads after first post html"

**Example:**
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

#### After Nth Post Banner

Shows an ad after every N posts for continuous visibility.

1. Enable "aroma ads after nth post enabled"
2. Set "aroma ads after nth post number" (e.g., 5 = every 5 posts)
3. Add your ad code in "aroma ads after nth post html"

#### Sidebar Banner

Displays ads in the sidebar area.

1. Enable "aroma ads sidebar enabled"
2. Add your ad code in "aroma ads sidebar html"

**Example:**
```html
<div class="ad-rectangle">
  <a href="https://yoursite.com/special-offer" target="_blank">
    <img src="https://example.com/sidebar-300x250.jpg" alt="Special Offer">
  </a>
</div>
```

#### Before Footer Banner

Large banner placement before the site footer.

1. Enable "aroma ads before footer enabled"
2. Add your ad code in "aroma ads before footer html"

#### Topic List Top Banner

Shows at the top of topic lists (categories, latest, etc.).

1. Enable "aroma ads topic list top enabled"
2. Add your ad code in "aroma ads topic list top html"

#### Mobile Banner

Specific banner for mobile users.

1. Enable "aroma ads mobile banner enabled"
2. Add your mobile-optimized ad code in "aroma ads mobile banner html"

### Visibility Settings

#### Hide Ads from Staff

To hide all ads from staff members (admins and moderators):

1. Enable "aroma ads hide for staff"

#### Hide Ads by Trust Level

To hide ads from users with a certain trust level or higher:

1. Set "aroma ads hide for trust level" (0-4)
   - 0: Show ads to all users
   - 1: Hide from Basic users and above
   - 2: Hide from Member users and above
   - 3: Hide from Regular users and above
   - 4: Hide from Leader users only

## Ad Code Examples

### Google AdSense

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Custom HTML Banner

```html
<div style="text-align: center; padding: 20px;">
  <a href="https://yoursite.com/product" target="_blank">
    <img src="https://example.com/your-banner.jpg" 
         alt="Your Product" 
         style="max-width: 100%; height: auto; border-radius: 8px;">
  </a>
  <p style="margin-top: 10px; color: #666;">
    Special Offer - Limited Time Only!
  </p>
</div>
```

### Affiliate Link

```html
<div class="ad-rectangle" style="text-align: center;">
  <a href="https://affiliate-link.com?ref=your-id" target="_blank" rel="noopener">
    <img src="https://example.com/affiliate-banner.jpg" alt="Partner Product">
  </a>
</div>
```

## Supported Ad Sizes

The plugin includes CSS classes for common IAB ad sizes:

- **Leaderboard** (728x90) - Use class `ad-leaderboard`
- **Banner** (468x60) - Use class `ad-banner`
- **Rectangle** (300x250) - Use class `ad-rectangle`
- **Skyscraper** (120x600) - Use class `ad-skyscraper`
- **Wide Skyscraper** (160x600) - Use class `ad-wide-skyscraper`
- **Mobile Banner** (320x50) - Use class `ad-mobile-banner`
- **Large Mobile Banner** (320x100) - Use class `ad-large-mobile-banner`

## Styling and Customization

### Custom CSS

You can add custom CSS through **Admin → Customize → Themes → Your Theme → Edit CSS**:

```css
/* Customize banner appearance */
.aroma-ads-banner {
  background: #f5f5f5;
  border: 2px solid #ddd;
  border-radius: 10px;
}

/* Customize ad label */
.aroma-ads-label {
  color: #666;
  font-weight: bold;
}

/* Customize specific positions */
.aroma-ads-after-first-post {
  background: linear-gradient(to right, #e0f7fa, #b2ebf2);
}
```

## Troubleshooting

### Ads Not Appearing

1. **Check Plugin Status**: Ensure "aroma ads banner enabled" is checked
2. **Verify HTML**: Make sure your ad code is valid HTML
3. **Check User Permissions**: Verify you're not logged in as staff if "hide for staff" is enabled
4. **Clear Cache**: Clear your browser cache and Discourse cache
5. **Rebuild**: Try rebuilding your Discourse installation

### Ads Appearing in Wrong Position

1. **Check Widget Availability**: Some positions require specific Discourse widgets
2. **Theme Compatibility**: Ensure your theme supports the widget positions
3. **Browser Console**: Check for JavaScript errors in browser developer console

### Mobile Ads Not Showing

1. Enable "aroma ads mobile banner enabled"
2. Add mobile-specific HTML in the mobile banner field
3. Test on actual mobile device or mobile emulator

## Best Practices

### Performance

- Use lazy loading for images
- Minimize external script dependencies
- Keep HTML code clean and optimized
- Use async/defer attributes for external scripts

### User Experience

- Don't overload pages with too many ads
- Use appropriate ad sizes for each position
- Ensure ads are relevant to your audience
- Respect user privacy and ad blockers

### Compliance

- Follow advertising guidelines (Google AdSense, etc.)
- Include privacy policy for ad cookies
- Comply with GDPR/CCPA requirements
- Mark sponsored content appropriately

## Language Support

The plugin includes built-in translations:

- **English**: Default language
- **German**: Vollständige deutsche Übersetzung

To add more languages, create a new locale file in `config/locales/`.

## Compatibility

- **Discourse Version**: 2.7.0+
- **Themes**: Air theme (fully tested), compatible with most standard themes
- **Browsers**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: iOS Safari, Chrome Mobile, Firefox Mobile

## Support

For issues, questions, or feature requests:

1. Check the [Discourse Meta forums](https://meta.discourse.org)
2. Create an issue on GitHub
3. Contact the Aroma Queen team

## License

MIT License - See LICENSE file for details

## Credits

Developed by the Aroma Queen Team for the Discourse community.

## Version History

### 1.0.0 (Initial Release)
- Multiple ad placement positions
- Air theme compatibility
- Multilingual support (English/German)
- Trust level and staff visibility controls
- Mobile-specific banners
- Dark mode support
- Responsive design

---

Made with ❤️ for the Discourse community



