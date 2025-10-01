import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class AromaAdsTopicList extends Component {
  @service siteSettings;
  @service currentUser;
  
  get shouldShowAds() {
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
    
    return this.siteSettings.aroma_ads_topic_list_top_enabled;
  }
  
  get adHtml() {
    return this.siteSettings.aroma_ads_topic_list_top_html || "";
  }
}




