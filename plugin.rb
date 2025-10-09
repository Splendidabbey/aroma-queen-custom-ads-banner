# frozen_string_literal: true
# name: discourse-aroma-queen-ads-banner
# about: Advanced custom ads banner plugin with multilingual support and strategic positioning options
# version: 1.1.0
# authors: Aroma Queen Team
# url: https://github.com/yourusername/discourse-aroma-queen-ads-banner
# required_version: 2.7.0

enabled_site_setting :aroma_ads_banner_enabled

register_asset 'stylesheets/aroma-ads-banner.scss'

after_initialize do
  module ::AromaAdsBanner
    PLUGIN_NAME ||= "discourse-aroma-queen-ads-banner"
  end

  # Register custom fields to store ad impressions
  add_to_serializer(:site, :aroma_ads_enabled) do
    SiteSetting.aroma_ads_banner_enabled
  end

  add_to_serializer(:site, :aroma_ads_settings) do
    if SiteSetting.aroma_ads_banner_enabled
      {
        after_header_enabled: SiteSetting.aroma_ads_after_header_enabled,
        after_header_html: SiteSetting.aroma_ads_after_header_html,
        after_first_post_enabled: SiteSetting.aroma_ads_after_first_post_enabled,
        after_first_post_html: SiteSetting.aroma_ads_after_first_post_html,
        after_nth_post_enabled: SiteSetting.aroma_ads_after_nth_post_enabled,
        after_nth_post_number: SiteSetting.aroma_ads_after_nth_post_number,
        after_nth_post_html: SiteSetting.aroma_ads_after_nth_post_html,
        sidebar_enabled: SiteSetting.aroma_ads_sidebar_enabled,
        sidebar_html: SiteSetting.aroma_ads_sidebar_html,
        before_footer_enabled: SiteSetting.aroma_ads_before_footer_enabled,
        before_footer_html: SiteSetting.aroma_ads_before_footer_html,
        topic_list_top_enabled: SiteSetting.aroma_ads_topic_list_top_enabled,
        topic_list_top_html: SiteSetting.aroma_ads_topic_list_top_html,
        mobile_banner_enabled: SiteSetting.aroma_ads_mobile_banner_enabled,
        mobile_banner_html: SiteSetting.aroma_ads_mobile_banner_html,
        hide_for_staff: SiteSetting.aroma_ads_hide_for_staff,
        hide_for_trust_level: SiteSetting.aroma_ads_hide_for_trust_level
      }
    else
      {}
    end
  end

  add_to_serializer(:current_user, :can_see_ads) do
    return false unless SiteSetting.aroma_ads_banner_enabled
    
    # Hide ads for staff if setting enabled
    return false if SiteSetting.aroma_ads_hide_for_staff && object.staff?
    
    # Hide ads for users above trust level threshold
    if SiteSetting.aroma_ads_hide_for_trust_level > 0
      return false if object.trust_level >= SiteSetting.aroma_ads_hide_for_trust_level
    end
    
    true
  end

  # Fix PWA manifest to enable proper app installation
  # This removes the prefer_related_applications flag that blocks PWA installation
  add_to_serializer(:web_app_manifest, :prefer_related_applications) do
    false
  end

  add_to_serializer(:web_app_manifest, :related_applications) do
    []
  end

  # Ensure proper icon sizes for PWA installation
  add_to_serializer(:web_app_manifest, :icons, false) do
    icons = []
    
    # Get the large icon URL (512x512)
    if large_icon_url = SiteSetting.large_icon_url.presence
      icons << {
        src: large_icon_url,
        sizes: "512x512",
        type: "image/png"
      }
      icons << {
        src: large_icon_url,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    end
    
    # Get the manifest icon URL (should be 192x192, but we'll accept what's there)
    if manifest_icon_url = SiteSetting.manifest_icon_url.presence
      icons << {
        src: manifest_icon_url,
        sizes: "192x192",
        type: "image/png"
      }
    elsif large_icon_url
      # Fallback: use large icon for 192x192 if manifest icon not set
      icons << {
        src: large_icon_url,
        sizes: "192x192",
        type: "image/png"
      }
    end
    
    icons
  end
end




