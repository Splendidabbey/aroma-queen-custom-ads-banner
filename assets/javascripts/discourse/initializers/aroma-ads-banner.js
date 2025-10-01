import { withPluginApi } from "discourse/lib/plugin-api";

function initializeAromaAdsBanner(api) {
  // Plugin now uses modern connectors instead of deprecated widget decorators
  // All ad placements are handled via plugin outlets in the connectors directory
  
  // This initializer is kept for potential future enhancements
  // that may require the Plugin API
}

export default {
  name: "aroma-ads-banner",
  
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    
    if (siteSettings.aroma_ads_banner_enabled) {
      withPluginApi("0.11.0", initializeAromaAdsBanner);
    }
  }
};




