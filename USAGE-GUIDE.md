# Aroma Queen Custom Ads Banner - Usage Guide

## English Version

### Quick Start (5 Minutes)

1. **Enable the Plugin**
   - Go to **Admin → Settings → Plugins**
   - Search for "aroma"
   - Check ✅ **"aroma_ads_banner_enabled"**
   - Save changes

2. **Add Your First Ad**
   - Enable **"aroma_ads_after_header_enabled"**
   - In **"aroma_ads_after_header_html"**, paste:
   ```html
   <div style="text-align: center; padding: 20px;">
     <img src="https://your-image-url.jpg" alt="Your Ad" style="max-width: 100%;">
   </div>
   ```
   - Save changes

3. **View Your Ad**
   - Visit your website
   - Look for the banner below the header

### Ad Placement Options

#### 1. After Header (Site-wide)
- **Best for**: Important announcements, premium ads
- **Enable**: `aroma_ads_after_header_enabled`
- **Add HTML**: `aroma_ads_after_header_html`

#### 2. After First Post (In Topics)
- **Best for**: Topic-specific ads, high visibility
- **Enable**: `aroma_ads_after_first_post_enabled`
- **Add HTML**: `aroma_ads_after_first_post_html`

#### 3. After Every Nth Post
- **Best for**: Long topics, recurring visibility
- **Enable**: `aroma_ads_after_nth_post_enabled`
- **Set Number**: `aroma_ads_after_nth_post_number` (e.g., 5 = every 5 posts)
- **Add HTML**: `aroma_ads_after_nth_post_html`

#### 4. Sidebar
- **Best for**: Persistent, non-intrusive ads
- **Enable**: `aroma_ads_sidebar_enabled`
- **Add HTML**: `aroma_ads_sidebar_html`

#### 5. Before Footer
- **Best for**: Large banners, call-to-action
- **Enable**: `aroma_ads_before_footer_enabled`
- **Add HTML**: `aroma_ads_before_footer_html`

#### 6. Topic List Top
- **Best for**: Category pages, latest topics
- **Enable**: `aroma_ads_topic_list_top_enabled`
- **Add HTML**: `aroma_ads_topic_list_top_html`

#### 7. Mobile Banner
- **Best for**: Mobile-specific ads
- **Enable**: `aroma_ads_mobile_banner_enabled`
- **Add HTML**: `aroma_ads_mobile_banner_html`

### Privacy Settings

#### Hide Ads from Staff
- **Setting**: `aroma_ads_hide_for_staff`
- **Purpose**: Keep admin experience clean
- **Value**: ✅ Check to hide from staff

#### Hide Ads by Trust Level
- **Setting**: `aroma_ads_hide_for_trust_level`
- **Values**:
  - `0` = Show to everyone
  - `1` = Hide from Basic users and above
  - `2` = Hide from Member users and above
  - `3` = Hide from Regular users and above
  - `4` = Hide from Leader users only

### Ad Code Examples

#### Google AdSense
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

#### Custom Image Ad
```html
<div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
  <a href="https://yoursite.com/offer" target="_blank" rel="noopener">
    <img src="https://example.com/banner.jpg" 
         alt="Special Offer" 
         style="max-width: 100%; height: auto; border-radius: 4px;">
  </a>
  <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">Advertisement</p>
</div>
```

#### Affiliate Link
```html
<div style="text-align: center; padding: 15px;">
  <a href="https://affiliate-link.com?ref=your-id" target="_blank" rel="noopener">
    <img src="https://example.com/affiliate-banner.jpg" alt="Partner Product">
  </a>
</div>
```

### Common Ad Sizes

- **Leaderboard**: 728x90 (use for after header, before footer)
- **Banner**: 468x60 (use for after header)
- **Rectangle**: 300x250 (use for sidebar)
- **Mobile Banner**: 320x50 (use for mobile)
- **Large Mobile**: 320x100 (use for mobile)

### Troubleshooting

#### Ads Not Showing
1. ✅ Plugin enabled?
2. ✅ Specific position enabled?
3. ✅ HTML code added?
4. ✅ Not logged in as staff (if "hide for staff" is on)?
5. ✅ Cleared browser cache?

#### Settings Not Visible
1. Rebuild Discourse: `./launcher rebuild app`
2. Hard refresh admin page (Ctrl+Shift+R)
3. Check browser console for errors

---

## Deutsche Version

### Schnellstart (5 Minuten)

1. **Plugin aktivieren**
   - Gehen Sie zu **Admin → Einstellungen → Plugins**
   - Suchen Sie nach "aroma"
   - Aktivieren Sie ✅ **"aroma_ads_banner_enabled"**
   - Änderungen speichern

2. **Erste Werbung hinzufügen**
   - Aktivieren Sie **"aroma_ads_after_header_enabled"**
   - In **"aroma_ads_after_header_html"** einfügen:
   ```html
   <div style="text-align: center; padding: 20px;">
     <img src="https://ihr-bild-url.jpg" alt="Ihre Werbung" style="max-width: 100%;">
   </div>
   ```
   - Änderungen speichern

3. **Werbung anzeigen**
   - Besuchen Sie Ihre Website
   - Schauen Sie nach dem Banner unter dem Header

### Werbeplatzierungsoptionen

#### 1. Nach Header (Site-weit)
- **Am besten für**: Wichtige Ankündigungen, Premium-Werbung
- **Aktivieren**: `aroma_ads_after_header_enabled`
- **HTML hinzufügen**: `aroma_ads_after_header_html`

#### 2. Nach erstem Beitrag (In Themen)
- **Am besten für**: Themen-spezifische Werbung, hohe Sichtbarkeit
- **Aktivieren**: `aroma_ads_after_first_post_enabled`
- **HTML hinzufügen**: `aroma_ads_after_first_post_html`

#### 3. Nach jedem N-ten Beitrag
- **Am besten für**: Lange Themen, wiederkehrende Sichtbarkeit
- **Aktivieren**: `aroma_ads_after_nth_post_enabled`
- **Nummer setzen**: `aroma_ads_after_nth_post_number` (z.B. 5 = alle 5 Beiträge)
- **HTML hinzufügen**: `aroma_ads_after_nth_post_html`

#### 4. Seitenleiste
- **Am besten für**: Persistente, nicht aufdringliche Werbung
- **Aktivieren**: `aroma_ads_sidebar_enabled`
- **HTML hinzufügen**: `aroma_ads_sidebar_html`

#### 5. Vor Footer
- **Am besten für**: Große Banner, Call-to-Action
- **Aktivieren**: `aroma_ads_before_footer_enabled`
- **HTML hinzufügen**: `aroma_ads_before_footer_html`

#### 6. Oben in Themenlisten
- **Am besten für**: Kategorieseiten, neueste Themen
- **Aktivieren**: `aroma_ads_topic_list_top_enabled`
- **HTML hinzufügen**: `aroma_ads_topic_list_top_html`

#### 7. Mobile Banner
- **Am besten für**: Mobile-spezifische Werbung
- **Aktivieren**: `aroma_ads_mobile_banner_enabled`
- **HTML hinzufügen**: `aroma_ads_mobile_banner_html`

### Datenschutzeinstellungen

#### Werbung für Mitarbeiter ausblenden
- **Einstellung**: `aroma_ads_hide_for_staff`
- **Zweck**: Saubere Admin-Erfahrung
- **Wert**: ✅ Aktivieren, um vor Mitarbeitern zu verbergen

#### Werbung nach Vertrauensstufe ausblenden
- **Einstellung**: `aroma_ads_hide_for_trust_level`
- **Werte**:
  - `0` = Allen anzeigen
  - `1` = Vor Basic-Benutzern und höher verbergen
  - `2` = Vor Member-Benutzern und höher verbergen
  - `3` = Vor Regular-Benutzern und höher verbergen
  - `4` = Nur vor Leader-Benutzern verbergen

### Werbecode-Beispiele

#### Google AdSense
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

#### Benutzerdefinierte Bildwerbung
```html
<div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
  <a href="https://ihrseite.com/angebot" target="_blank" rel="noopener">
    <img src="https://beispiel.com/banner.jpg" 
         alt="Sonderangebot" 
         style="max-width: 100%; height: auto; border-radius: 4px;">
  </a>
  <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">Werbung</p>
</div>
```

#### Affiliate-Link
```html
<div style="text-align: center; padding: 15px;">
  <a href="https://affiliate-link.com?ref=ihre-id" target="_blank" rel="noopener">
    <img src="https://beispiel.com/affiliate-banner.jpg" alt="Partner-Produkt">
  </a>
</div>
```

### Häufige Werbegrößen

- **Leaderboard**: 728x90 (für nach Header, vor Footer)
- **Banner**: 468x60 (für nach Header)
- **Rechteck**: 300x250 (für Seitenleiste)
- **Mobile Banner**: 320x50 (für Mobile)
- **Großes Mobile**: 320x100 (für Mobile)

### Fehlerbehebung

#### Werbung wird nicht angezeigt
1. ✅ Plugin aktiviert?
2. ✅ Spezifische Position aktiviert?
3. ✅ HTML-Code hinzugefügt?
4. ✅ Nicht als Mitarbeiter angemeldet (wenn "vor Mitarbeitern verbergen" aktiviert)?
5. ✅ Browser-Cache geleert?

#### Einstellungen nicht sichtbar
1. Discourse neu erstellen: `./launcher rebuild app`
2. Admin-Seite hart aktualisieren (Ctrl+Shift+R)
3. Browser-Konsole auf Fehler prüfen

---

**Entwickelt mit ❤️ für die Discourse-Community**
