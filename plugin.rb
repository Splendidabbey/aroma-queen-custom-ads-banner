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

  # Membership Payment API
  require_dependency 'application_controller'
  
  module ::AromaMembership
    class PaymentController < ::ApplicationController
      requires_plugin ::AromaAdsBanner::PLUGIN_NAME
      skip_before_action :check_xhr, only: [:process_payment]
      before_action :ensure_logged_in, only: [:process_payment]
      
      def process_payment
        params.require(:membership_type)
        params.require(:payment_type)
        params.require(:price)
        params.require(:payment_method)
        params.require(:customer)
        
        customer_data = params[:customer]
        
        # Generate order ID
        order_id = "AROMA-#{SecureRandom.hex(8).upcase}"
        
        # Process payment based on method
        payment_result = process_payment_method(
          params[:payment_method],
          params[:price],
          customer_data
        )
        
        if payment_result[:success]
          # Create order record (you would store this in a database)
          order_data = {
            order_id: order_id,
            membership_type: params[:membership_type],
            payment_type: params[:payment_type],
            price: params[:price],
            payment_method: params[:payment_method],
            customer: customer_data,
            status: 'completed',
            created_at: Time.now
          }
          
          # Send confirmation email
          send_order_confirmation_email(customer_data[:email], order_data)
          
          # Update user membership (you would implement this based on your needs)
          update_user_membership(current_user, params[:membership_type])
          
          render json: {
            success: true,
            order_id: order_id,
            message: I18n.t('aroma_membership.payment_success')
          }
        else
          render json: {
            success: false,
            error: payment_result[:error] || I18n.t('aroma_membership.payment_failed')
          }, status: 400
        end
      rescue => e
        Rails.logger.error("Payment processing error: #{e.message}")
        render json: {
          success: false,
          error: I18n.t('aroma_membership.payment_error')
        }, status: 500
      end
      
      private
      
      def process_payment_method(method, price, customer_data)
        case method
        when 'stripe'
          process_stripe_payment(price, customer_data)
        when 'paypal'
          process_paypal_payment(price, customer_data)
        else
          { success: false, error: 'Unsupported payment method' }
        end
      end
      
      def process_stripe_payment(price, customer_data)
        # TODO: Implement Stripe payment processing
        # This is a placeholder - you would integrate with Stripe API here
        # For now, we'll simulate a successful payment
        
        stripe_key = SiteSetting.aroma_membership_stripe_secret_key
        if stripe_key.blank?
          return { success: false, error: 'Stripe not configured' }
        end
        
        # In production, you would:
        # 1. Create a Stripe PaymentIntent
        # 2. Confirm the payment
        # 3. Handle webhooks for payment confirmation
        
        { success: true, transaction_id: "stripe_#{SecureRandom.hex(16)}" }
      end
      
      def process_paypal_payment(price, customer_data)
        # TODO: Implement PayPal payment processing
        # This is a placeholder - you would integrate with PayPal API here
        
        paypal_client_id = SiteSetting.aroma_membership_paypal_client_id
        if paypal_client_id.blank?
          return { success: false, error: 'PayPal not configured' }
        end
        
        # In production, you would:
        # 1. Create a PayPal order
        # 2. Capture the payment
        # 3. Handle webhooks for payment confirmation
        
        { success: true, transaction_id: "paypal_#{SecureRandom.hex(16)}" }
      end
      
      def send_order_confirmation_email(email, order_data)
        # Send order confirmation email
        # TODO: Implement proper email sending using Discourse's email system
        # For now, we'll log the order details
        # You can implement email sending later using Discourse's notification system
        begin
          Rails.logger.info("Order confirmation email should be sent to: #{email}")
          Rails.logger.info("Order details: #{order_data.inspect}")
          
          # Future implementation:
          # Use Discourse's notification system or email jobs here
          # Example: Jobs::EnqueueEmail.new.execute(...)
        rescue => e
          Rails.logger.error("Failed to send order confirmation email: #{e.message}")
        end
      end
      
      def update_user_membership(user, membership_type)
        # TODO: Implement user membership update
        # This could involve:
        # 1. Adding custom fields to the user
        # 2. Updating user groups
        # 3. Setting membership expiration dates
        
        # Example: Add custom field
        # user.custom_fields['membership_type'] = membership_type
        # user.custom_fields['membership_purchased_at'] = Time.now
        # user.save_custom_fields
      end
    end
  end
  
  # Register API routes
  # Note: Frontend routes (/membership/payment, /membership/thankyou) are handled by Ember.js
  # See: assets/javascripts/discourse/routes/
  Discourse::Application.routes.append do
    post '/aroma-membership/process-payment' => 'aroma_membership/payment#process_payment'
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




