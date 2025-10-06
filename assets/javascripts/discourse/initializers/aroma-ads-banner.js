import { withPluginApi } from "discourse/lib/plugin-api";

function initializeAromaAdsBanner(api) {
  // Plugin now uses modern connectors instead of deprecated widget decorators
  // All ad placements are handled via plugin outlets in the connectors directory
  
  // This initializer is kept for potential future enhancements
  // that may require the Plugin API
}

// German setting name translations
const GERMAN_SETTING_NAMES = {
  "aroma_ads_banner_enabled": "Aroma Queen Werbebanner Plugin aktivieren",
  "aroma_ads_hide_for_staff": "Werbung für Mitarbeiter ausblenden", 
  "aroma_ads_hide_for_trust_level": "Werbung für Benutzer mit Vertrauensstufe gleich oder höher ausblenden (0 = allen anzeigen)",
  "aroma_ads_after_header_enabled": "Banner nach Site-Header anzeigen",
  "aroma_ads_after_header_html": "HTML-Inhalt für Banner nach Header",
  "aroma_ads_after_first_post_enabled": "Banner nach dem ersten Beitrag in Themen anzeigen",
  "aroma_ads_after_first_post_html": "HTML-Inhalt für Banner nach erstem Beitrag",
  "aroma_ads_after_nth_post_enabled": "Banner nach jedem N-ten Beitrag anzeigen",
  "aroma_ads_after_nth_post_number": "Anzahl der Beiträge zwischen Bannern",
  "aroma_ads_after_nth_post_html": "HTML-Inhalt für Banner nach N-tem Beitrag",
  "aroma_ads_sidebar_enabled": "Banner in der Seitenleiste anzeigen",
  "aroma_ads_sidebar_html": "HTML-Inhalt für Seitenleisten-Banner",
  "aroma_ads_before_footer_enabled": "Banner vor Footer anzeigen",
  "aroma_ads_before_footer_html": "HTML-Inhalt für Banner vor Footer",
  "aroma_ads_topic_list_top_enabled": "Banner oben in Themenlisten anzeigen",
  "aroma_ads_topic_list_top_html": "HTML-Inhalt für Banner oben in Themenliste",
  "aroma_ads_mobile_banner_enabled": "Mobilspezifisches Banner anzeigen",
  "aroma_ads_mobile_banner_html": "HTML-Inhalt für Mobil-Banner"
};

function translateSettingNames() {
  // Check if we're in admin settings page
  if (window.location.pathname.includes('/admin/site_settings/plugins/')) {
    // Wait for settings to load
    setTimeout(() => {
      // Find all setting name elements and translate them
      Object.keys(GERMAN_SETTING_NAMES).forEach(settingName => {
        const elements = document.querySelectorAll(`[data-setting-name="${settingName}"]`);
        elements.forEach(element => {
          const nameElement = element.querySelector('.setting-name, .setting-label');
          if (nameElement && GERMAN_SETTING_NAMES[settingName]) {
            nameElement.textContent = GERMAN_SETTING_NAMES[settingName];
          }
        });
      });
    }, 1000);
  }
}

export default {
  name: "aroma-ads-banner",
  
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    
    if (siteSettings.aroma_ads_banner_enabled) {
      withPluginApi("0.11.0", initializeAromaAdsBanner);
    }
    
    // Translate setting names on admin page
    translateSettingNames();
    
    // Also translate when navigating to settings
    document.addEventListener('DOMContentLoaded', translateSettingNames);
  }
};




