# PayEx Checkout for Magento 2

The Official PayEx Checkout Extension for Magento 2 provides seamless
integration with PayEx Checkout, allowing your customers to pay swiftly
and securely with credit card, invoice (Norway and Sweden), Vipps (Norway)
and Swish (Sweden). Credit card payments are available world-wide.

## Requirements

* Magento Open Source/Commerce version 2.2 or newer
* A PayEx merchant account, read more and contact us at 
https://payex.se/tjanster/payex-checkout/ to get one.

**Please Note:** When your PayEx Merchant Account is created, there are a few things you need to attend to before you can
start using it. The steps involved are described on the following page:
https://developer.payex.com/xwiki/wiki/developer/view/Main/ecommerce/resources/admin/

## Installation 

PayEx Checkout for Magento 2 may be installed via Magento Marketplace or Composer.

### Magento Marketplace

If you have linked your Marketplace account to your Magento 2 store, you may install the PayEx Checkout for Magento 2 
with the Magento Component Manager.

For installation using the Component Manager, please see the official guide here:
http://docs.magento.com/marketplace/user_guide/quick-tour/install-extension.html

### Composer

PayEx Checkout for Magento 2 can alternatively be installed via composer with the following instructions:

1. In the Magento root directory enter command:
`composer require payex/magento2-checkout`
2. Make sure everything is up to date:
`composer update`
3. Enable the modules:
`bin/magento module:enable --clear-static-content PayEx_Core PayEx_Client PayEx_Checkin PayEx_PaymentMenu PayEx_Checkout`
4. Upgrade setup:
`bin/magento setup:upgrade`
5. Compile:
`bin/magento setup:di:compile`
6. Clear the cache:
`bin/magento cache:clean`

## Configuration

PayEx Checkout configuration can be found under: 
**Stores** > **Configuration** > **Sales** > **Payment Methods** > **PayEx** > **Configure**

As parts of the PayEx Checkout installation we have **Client, Checkout, Checkin** and **Payment Menu**
with configurable options as follows:

### Client
* **Enabled**: Status of the module.
* **Merchant Account**: Your PayEx Merchant Account ID.
* **Payee ID**: Your PayEx Payee ID.
* **Payee Name**: Your PayEx Payee Name.
* **Test Mode**: Only disable in live production site.
* **Debug Mode**: Enable this for more in-depth logging, should be off by default.

### Checkout
* **Enabled**: Status of the module.

### Checkin
* **Enabled**: Status of the module.
* **Required**: Enable to require checkin in checkout.

### Payment Menu
* **Enabled**: Status of the module.
* **Terms of Service Page**: Set page to link as terms of service page in checkout.

## Support

To find the customer service available in your country, please visit 
https://payex.com/customer-service/

## Release Notes

* **1.0.0**: May 2019 - First official release

## License

PayEx Checkout for Magento 2 is released under Apache V2.0 licence.

Copyright 2019 PayEx Sverige AB

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
