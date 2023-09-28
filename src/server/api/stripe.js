const stripe = require('stripe')('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');
const express = require('express');
const stripeRouter = express.Router();

const YOUR_DOMAIN = 'http://localhost:3000';

stripeRouter.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

stripeRouter.listen(4242, () => console.log('Running on port 3000'));