import Component from "@glimmer/component";
import { service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class AromaMembershipLanding extends Component {
  @service siteSettings;
  @service router;
  @service currentUser;
  
  @tracked selectedMembership = null;
  @tracked selectedPaymentType = null;
  
  get shouldShowMembership() {
    return this.siteSettings.aroma_membership_landing_enabled;
  }
  
  get showPremium() {
    return this.siteSettings.aroma_membership_premium_enabled;
  }
  
  // Basic Account Pricing
  get basicOneTimePrice() {
    return this.siteSettings.aroma_membership_basic_onetime_price || "49.00";
  }
  
  get basicMonthlyPrice() {
    return this.siteSettings.aroma_membership_basic_monthly_price || "4.49";
  }
  
  get basicFeatures() {
    const featuresStr = this.siteSettings.aroma_membership_basic_features || "";
    return featuresStr.split("\n").filter(f => f.trim().length > 0);
  }
  
  // Premium Account Pricing
  get premiumOneTimePrice() {
    return this.siteSettings.aroma_membership_premium_onetime_price || "99.00";
  }
  
  get premiumMonthlyPrice() {
    return this.siteSettings.aroma_membership_premium_monthly_price || "8.99";
  }
  
  get premiumFeatures() {
    const featuresStr = this.siteSettings.aroma_membership_premium_features || "";
    return featuresStr.split("\n").filter(f => f.trim().length > 0);
  }
  
  @action
  selectMembership(type, paymentType) {
    this.selectedMembership = type;
    this.selectedPaymentType = paymentType;
    
    // Redirect to payment page with parameters
    const params = new URLSearchParams({
      membership: type,
      payment_type: paymentType
    });
    
    // Navigate to payment page
    // This will be handled by a custom route we'll create
    window.location.href = `/membership/payment?${params.toString()}`;
  }
}

