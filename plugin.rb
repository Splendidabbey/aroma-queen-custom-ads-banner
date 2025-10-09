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
  require_dependency 'metadata_controller'
  
  class ::MetadataController
    alias_method :original_manifest, :manifest
    
    def manifest
      # Call original method to get the manifest
      original_manifest
      
      # Modify the response to fix PWA installation issues
      if response.body.present?
        begin
          manifest_data = JSON.parse(response.body)
          
          # Remove prefer_related_applications to enable PWA installation
          manifest_data['prefer_related_applications'] = false
          manifest_data['related_applications'] = []
          
          # Ensure proper icon sizes for PWA
          if manifest_data['icons'] && !manifest_data['icons'].empty?
            # Check if we have both 192x192 and 512x512
            has_192 = manifest_data['icons'].any? { |icon| icon['sizes'] == '192x192' }
            has_512 = manifest_data['icons'].any? { |icon| icon['sizes'] == '512x512' }
            
            # If missing 192x192, add it using the 512x512 source
            if !has_192 && has_512
              icon_512 = manifest_data['icons'].find { |icon| icon['sizes'] == '512x512' }
              manifest_data['icons'] << {
                'src' => icon_512['src'],
                'sizes' => '192x192',
                'type' => 'image/png'
              }
            end
          end
          
          response.body = manifest_data.to_json
        rescue JSON::ParserError => e
          Rails.logger.warn("Failed to parse manifest JSON: #{e.message}")
        end
      end
    end
  end
end




