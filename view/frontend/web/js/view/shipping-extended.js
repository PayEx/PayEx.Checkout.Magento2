define([
    'jquery',
    'ko',
    'PayEx_Checkout/js/action/trigger-shipping-information-validation',
    'PayEx_Checkout/js/action/email-observer',
    'Magento_Checkout/js/model/quote',
    'Magento_Customer/js/model/customer',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/action/set-shipping-information',
    'Magento_Checkout/js/action/get-payment-information',
    'uiRegistry',
    'mage/translate'
], function ($, ko, triggerShippingInformationValidation, emailObserver, quote, customer, stepNavigator, setShippingInformationAction, getPaymentInformation, registry, $t) {
    'use strict';

    var shippingMethodVisible = ko.observable(false);
    var isEnabled = window.checkoutConfig.PayEx_Checkout.isEnabled;

    return function (Shipping) {
        var mixin = {
            shippingMethodVisible: shippingMethodVisible,
            initialize: function(){
                var self = this;
                this._super();

                triggerShippingInformationValidation.trigger = function (callback) {
                    callback({success: self.quickShippingInformationValidation(), message: 'validateShippingInformation was ran!'});
                };

                emailObserver.get = function(data){
                    if(self.quickShippingInformationValidation()) {
                        shippingMethodVisible(true);
                    } else {
                        shippingMethodVisible(false);
                    }
                };

                stepNavigator.hideSection('payment');

                quote.shippingMethod.subscribe(function(method){
                    // Check is shipping method is set and valid
                    if(method && method.available && shippingMethodVisible()){
                        setShippingInformationAction().done(function() {
                            getPaymentInformation().done(function(){
                                stepNavigator.showSection('payment');
                            });
                        });
                    } else {
                        stepNavigator.hideSection('payment');
                    }
                });

                shippingMethodVisible.subscribe(function(value){
                    if(value && quote.shippingMethod() && quote.shippingMethod().available){
                        getPaymentInformation().done(function(){
                            stepNavigator.showSection('payment');
                        });
                    } else {
                        stepNavigator.hideSection('payment');
                    }
                });

                registry.async('checkoutProvider')(function (checkoutProvider) {
                    checkoutProvider.on('shippingAddress', function (shippingAddrsData) {
                        if(self.quickShippingInformationValidation()) {
                            shippingMethodVisible(true);
                        } else {
                            shippingMethodVisible(false);
                        }
                    });
                });
            },
            quickShippingInformationValidation: function(){
                var loginFormSelector = 'form[data-role=email-with-possible-login]',
                    emailValidationResult = customer.isLoggedIn();

                if (!customer.isLoggedIn() && $(loginFormSelector + ' input[name=username]').length > 0) {
                    $(loginFormSelector).validation();
                    emailValidationResult = Boolean($(loginFormSelector + ' input[name=username]').valid());
                }

                if (this.isFormInline) {
                    this.source.set('params.invalid', false);
                    this.triggerShippingDataValidateEvent();

                    if (emailValidationResult && this.source.get('params.invalid')) {
                        return false;
                    }
                }

                if (!emailValidationResult) {
                    $(loginFormSelector + ' input[name=username]').focus();

                    return false;
                }

                return true;
            }
        };

        if(!isEnabled){ return Shipping; }

        return Shipping.extend(mixin);
    };
});