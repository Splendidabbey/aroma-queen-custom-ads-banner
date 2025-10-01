import { withPluginApi } from "discourse/lib/plugin-api";
import { helperContext } from "discourse-common/lib/helpers";
import { schedule } from "@ember/runloop";

function initializeAromaAdsBanner(api) {
  const siteSettings = api.container.lookup("site-settings:main");
  const currentUser = api.getCurrentUser();
  
  // Check if user can see ads
  function canSeeAds() {
    if (!siteSettings.aroma_ads_banner_enabled) {
      return false;
    }
    
    if (!currentUser && siteSettings.aroma_ads_hide_for_staff) {
      return true; // Anonymous users can see ads
    }
    
    if (currentUser) {
      // Hide for staff if setting enabled
      if (siteSettings.aroma_ads_hide_for_staff && currentUser.staff) {
        return false;
      }
      
      // Hide for trust level if setting enabled
      if (siteSettings.aroma_ads_hide_for_trust_level > 0 && 
          currentUser.trust_level >= siteSettings.aroma_ads_hide_for_trust_level) {
        return false;
      }
    }
    
    return true;
  }
  
  // Helper function to create banner HTML
  function createBanner(html, position, label) {
    if (!html || html.trim() === "") return null;
    
    const isMobile = document.body.classList.contains("mobile-view");
    const adLabel = I18n.t("aroma_ads_banner.advertisement");
    
    const bannerDiv = document.createElement("div");
    bannerDiv.className = `aroma-ads-banner aroma-ads-${position}`;
    if (isMobile) {
      bannerDiv.classList.add("aroma-ads-mobile");
    }
    
    bannerDiv.innerHTML = `
      <div class="aroma-ads-label">${adLabel}</div>
      <div class="aroma-ads-content">
        ${html}
      </div>
    `;
    
    return bannerDiv;
  }
  
  // After Header Banner
  if (siteSettings.aroma_ads_after_header_enabled && canSeeAds()) {
    api.decorateWidget("header:after", helper => {
      return helper.h("div.aroma-ads-after-header-wrapper", {}, [
        helper.rawHtml(
          createBanner(
            siteSettings.aroma_ads_after_header_html,
            "after-header",
            I18n.t("aroma_ads_banner.advertisement")
          )?.outerHTML || ""
        )
      ]);
    });
  }
  
  // Topic List Top Banner
  if (siteSettings.aroma_ads_topic_list_top_enabled && canSeeAds()) {
    api.decorateWidget("topic-list:before", helper => {
      return helper.h("div.aroma-ads-topic-list-top-wrapper", {}, [
        helper.rawHtml(
          createBanner(
            siteSettings.aroma_ads_topic_list_top_html,
            "topic-list-top",
            I18n.t("aroma_ads_banner.advertisement")
          )?.outerHTML || ""
        )
      ]);
    });
  }
  
  // After First Post and After Nth Post Banners
  api.decorateWidget("post-stream:after-nth-post", (helper, post, postNumber) => {
    if (!canSeeAds()) return;
    
    const isMobile = document.body.classList.contains("mobile-view");
    
    // Show mobile banner if enabled
    if (isMobile && siteSettings.aroma_ads_mobile_banner_enabled && 
        siteSettings.aroma_ads_mobile_banner_html) {
      if (postNumber === 1) {
        return helper.rawHtml(
          createBanner(
            siteSettings.aroma_ads_mobile_banner_html,
            "mobile",
            I18n.t("aroma_ads_banner.advertisement")
          )?.outerHTML || ""
        );
      }
    }
    
    // After first post
    if (postNumber === 1 && siteSettings.aroma_ads_after_first_post_enabled) {
      return helper.rawHtml(
        createBanner(
          siteSettings.aroma_ads_after_first_post_html,
          "after-first-post",
          I18n.t("aroma_ads_banner.advertisement")
        )?.outerHTML || ""
      );
    }
    
    // After nth post
    if (siteSettings.aroma_ads_after_nth_post_enabled && 
        siteSettings.aroma_ads_after_nth_post_number > 0) {
      const nthPost = siteSettings.aroma_ads_after_nth_post_number;
      if (postNumber > 1 && postNumber % nthPost === 0) {
        return helper.rawHtml(
          createBanner(
            siteSettings.aroma_ads_after_nth_post_html,
            "after-nth-post",
            I18n.t("aroma_ads_banner.advertisement")
          )?.outerHTML || ""
        );
      }
    }
  });
  
  // Sidebar Banner
  if (siteSettings.aroma_ads_sidebar_enabled && canSeeAds()) {
    api.decorateWidget("sidebar:after", helper => {
      return helper.h("div.aroma-ads-sidebar-wrapper", {}, [
        helper.rawHtml(
          createBanner(
            siteSettings.aroma_ads_sidebar_html,
            "sidebar",
            I18n.t("aroma_ads_banner.advertisement")
          )?.outerHTML || ""
        )
      ]);
    });
  }
  
  // Before Footer Banner - using DOM manipulation
  if (siteSettings.aroma_ads_before_footer_enabled && canSeeAds()) {
    schedule("afterRender", () => {
      const footer = document.querySelector("footer.footer-container");
      if (footer && !document.querySelector(".aroma-ads-before-footer")) {
        const banner = createBanner(
          siteSettings.aroma_ads_before_footer_html,
          "before-footer",
          I18n.t("aroma_ads_banner.advertisement")
        );
        if (banner) {
          footer.parentNode.insertBefore(banner, footer);
        }
      }
    });
  }
}

export default {
  name: "aroma-ads-banner",
  
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    
    if (siteSettings.aroma_ads_banner_enabled) {
      withPluginApi("0.8.31", initializeAromaAdsBanner);
    }
  }
};




