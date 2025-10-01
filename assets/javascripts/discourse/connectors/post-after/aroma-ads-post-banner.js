import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class AromaAdsPostBanner extends Component {
  @service siteSettings;
  @service currentUser;
  
  get canSeeAds() {
    if (!this.siteSettings.aroma_ads_banner_enabled) {
      return false;
    }
    
    if (this.siteSettings.aroma_ads_hide_for_staff && this.currentUser?.staff) {
      return false;
    }
    
    if (this.siteSettings.aroma_ads_hide_for_trust_level > 0 && 
        this.currentUser?.trust_level >= this.siteSettings.aroma_ads_hide_for_trust_level) {
      return false;
    }
    
    return true;
  }
  
  get isMobile() {
    return document.body.classList.contains("mobile-view");
  }
  
  get showMobileBanner() {
    return this.canSeeAds && 
           this.isMobile && 
           this.siteSettings.aroma_ads_mobile_banner_enabled &&
           this.args.outletArgs.post?.post_number === 1;
  }
  
  get showAfterFirstPost() {
    return this.canSeeAds &&
           this.siteSettings.aroma_ads_after_first_post_enabled &&
           this.args.outletArgs.post?.post_number === 1 &&
           !this.showMobileBanner;
  }
  
  get showAfterNthPost() {
    if (!this.canSeeAds || !this.siteSettings.aroma_ads_after_nth_post_enabled) {
      return false;
    }
    
    const postNumber = this.args.outletArgs.post?.post_number;
    const nthPost = this.siteSettings.aroma_ads_after_nth_post_number;
    
    if (!postNumber || !nthPost || postNumber <= 1) {
      return false;
    }
    
    return postNumber % nthPost === 0;
  }
  
  get mobileBannerHtml() {
    return this.siteSettings.aroma_ads_mobile_banner_html || "";
  }
  
  get afterFirstPostHtml() {
    return this.siteSettings.aroma_ads_after_first_post_html || "";
  }
  
  get afterNthPostHtml() {
    return this.siteSettings.aroma_ads_after_nth_post_html || "";
  }
}

