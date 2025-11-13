import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class MembershipPaymentController extends Controller {
  @service siteSettings;
  @service router;
  @service ajax;
  
  @tracked firstName = "";
  @tracked lastName = "";
  @tracked email = "";
  @tracked phone = "";
  @tracked address = "";
  @tracked postalCode = "";
  @tracked city = "";
  @tracked country = "";
  @tracked paymentMethod = "stripe";
  @tracked acceptTerms = false;
  @tracked acceptPrivacy = false;
  @tracked isProcessing = false;
  
  // Automatically generate full name from first and last name
  get fullName() {
    const first = (this.firstName || "").trim();
    const last = (this.lastName || "").trim();
    if (first && last) {
      return `${first} ${last}`;
    }
    return first || last || "";
  }
  
  get isStripeSelected() {
    return this.paymentMethod === "stripe";
  }
  
  get membershipTypeName() {
    if (this.model.membershipType === "basic") {
      return this.siteSettings.aroma_membership_basic_title || "Basic Account";
    } else if (this.model.membershipType === "premium") {
      return this.siteSettings.aroma_membership_premium_title || "Premium Account";
    }
    return "";
  }
  
  get paymentPlanName() {
    if (this.model.paymentType === "onetime") {
      return this.siteSettings.aroma_membership_one_time_label || "Einmalzahlung";
    } else if (this.model.paymentType === "installment") {
      return this.siteSettings.aroma_membership_installment_label || "Ratenzahlung (12 Monate)";
    }
    return "";
  }
  
  @action
  updateCountry(event) {
    this.country = event.target.value;
  }
  
  @action
  updatePaymentMethod(method) {
    this.paymentMethod = method;
  }
  
  @action
  toggleTerms(event) {
    this.acceptTerms = event.target.checked;
  }
  
  @action
  togglePrivacy(event) {
    this.acceptPrivacy = event.target.checked;
  }
  
  @action
  async handleSubmit(event) {
    event.preventDefault();
    
    if (!this.acceptTerms || !this.acceptPrivacy) {
      alert("Bitte akzeptieren Sie die AGB und Datenschutzerklärung.");
      return;
    }
    
    this.isProcessing = true;
    
    try {
      // Prepare payment data
      const paymentData = {
        membership_type: this.model.membershipType,
        payment_type: this.model.paymentType,
        price: this.model.price,
        payment_method: this.paymentMethod,
        customer: {
          first_name: this.firstName,
          last_name: this.lastName,
          full_name: this.fullName, // Auto-generated from first + last name
          email: this.email,
          phone: this.phone,
          address: this.address,
          postal_code: this.postalCode,
          city: this.city,
          country: this.country
        }
      };
      
      // Process payment via backend API
      const response = await this.ajax.request("/aroma-membership/process-payment", {
        method: "POST",
        data: paymentData
      });
      
      if (response.success) {
        // Redirect to thank you page
        this.router.transitionTo("membership-thankyou", {
          queryParams: {
            order_id: response.order_id
          }
        });
      } else {
        alert(response.error || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
        this.isProcessing = false;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      this.isProcessing = false;
    }
  }
}

