# Payment Integration

Trek-It is a booking platform that connects international tourists to local nepali guides. This requires it to implement a payment gateway for a smooth user flow.
However, due to international payment policies in Nepal, this seemingly simple task becomes a lot more complex. There are very few options to integrate international payment as a business in Nepal, as receiving payment has been made much harder.

## Available Gateways
Below are the available gateways, these have their own pros and cons.
- Dodo payment: The most suiting as of now. Tourists pays, the amount is transferred to business's account, then we pay it forward to guide manually.
- Stripe: Does not support Nepalese businesses
- Paypal - Only supports sending money, not receving in Nepal
- Himalayain Bank Gateway (https://himalayanbank.com/en/card-service/e-commerce) - Another very viable option. We need a himalayan bank account and enquire to activate e-commerce service. No other Nepali bank currently provide this.
- Khalti/E-sewa: Both can be integrated to transfer money to guides, but are not reliable for direct payments from tourist to guide.