import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";

export default class MembershipThankYouRoute extends DiscourseRoute {
  @service currentUser;
  
  model(params) {
    return {
      orderId: params.order_id || params.queryParams?.order_id
    };
  }
  
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.setProperties({
      orderId: model.orderId,
      currentUser: this.currentUser
    });
  }
}

