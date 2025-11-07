import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";

export default class MembershipPaymentRoute extends DiscourseRoute {
  @service siteSettings;
  
  model(params) {
    return {
      membershipType: params.membership || params.queryParams?.membership,
      paymentType: params.payment_type || params.queryParams?.payment_type,
      // Get pricing from settings
      price: this.getPrice(params.membership || params.queryParams?.membership, 
                          params.payment_type || params.queryParams?.payment_type)
    };
  }
  
  getPrice(membershipType, paymentType) {
    if (membershipType === "basic") {
      return paymentType === "onetime" 
        ? this.siteSettings.aroma_membership_basic_onetime_price || "49.00"
        : this.siteSettings.aroma_membership_basic_monthly_price || "4.49";
    } else if (membershipType === "premium") {
      return paymentType === "onetime"
        ? this.siteSettings.aroma_membership_premium_onetime_price || "99.00"
        : this.siteSettings.aroma_membership_premium_monthly_price || "8.99";
    }
    return "0.00";
  }
  
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.setProperties({
      membershipType: model.membershipType,
      paymentType: model.paymentType,
      price: model.price
    });
  }
}

