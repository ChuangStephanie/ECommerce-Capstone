const stripe = require('stripe')('pk_live_51NswSKLy2DFROTD9Lpk7bo2B23Hs8xa2iaQcwN1uZ2wpY16g0bzNvsFj84NmD4mZyqOyyAZJStqJR4Hi0s6Qehmr00tFDrEXAs')

const customer = await stripe.checkout.sessions.create({
  email: 'customer@example.com',
});

console.log(customer.id);