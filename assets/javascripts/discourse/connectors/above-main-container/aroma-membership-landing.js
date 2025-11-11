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
    if (!this.siteSettings.aroma_membership_landing_enabled) {
      return false;
    }

    if (this.isAuthPage) {
      return false;
    }

    return this.isOnConfiguredPath;
  }

  get isOnConfiguredPath() {
    try {
      const configuredPath = this.normalizePath(
        this.siteSettings.aroma_membership_display_path || "/"
      );
      const currentPath = this.normalizePath(window.location.pathname);
      return currentPath === configuredPath;
    } catch (e) {
      return false;
    }
  }

  normalizePath(path) {
    if (!path) {
      return "/";
    }

    let normalized = path.trim();

    if (!normalized.startsWith("/")) {
      normalized = `/${normalized}`;
    }

    // Remove trailing slash except for root
    if (normalized.length > 1 && normalized.endsWith("/")) {
      normalized = normalized.slice(0, -1);
    }

    return normalized || "/";
  }

  get isAuthPage() {
    try {
      const currentPath = this.normalizePath(window.location.pathname);
      return currentPath === "/login" || currentPath === "/signup";
    } catch (e) {
      return false;
    }
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
  
  // Basic Account Links
  get basicOneTimeLink() {
    return this.siteSettings.aroma_membership_basic_onetime_link || "";
  }
  
  get basicInstallmentLink() {
    return this.siteSettings.aroma_membership_basic_installment_link || "";
  }
  
  // Premium Account Links
  get premiumOneTimeLink() {
    return this.siteSettings.aroma_membership_premium_onetime_link || "";
  }
  
  get premiumInstallmentLink() {
    return this.siteSettings.aroma_membership_premium_installment_link || "";
  }
  
  @action
  selectMembership(type, paymentType) {
    // Check if custom link is provided
    let customLink = "";
    
    if (type === "basic") {
      customLink = paymentType === "onetime" 
        ? this.basicOneTimeLink 
        : this.basicInstallmentLink;
    } else if (type === "premium") {
      customLink = paymentType === "onetime"
        ? this.premiumOneTimeLink
        : this.premiumInstallmentLink;
    }
    
    // If custom link is provided, use it; otherwise use internal payment page
    if (customLink && customLink.trim().length > 0) {
      window.location.href = customLink;
    } else {
      // Redirect to internal payment page with parameters
      const params = new URLSearchParams({
        membership: type,
        payment_type: paymentType
      });
      window.location.href = `/membership/payment?${params.toString()}`;
    }
  }
}

