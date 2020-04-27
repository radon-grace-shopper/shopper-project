const stripe = require('stripe')('sk_test_XYhLy8AptzhSQpJKehpQ6tOT00BqOnfQTq')
const router = require('express').Router()
module.exports = router

router.use('/sercret', async (req, res, next) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd'
    })
    res.json({clientSecret: intent.clientSecret})
  } catch (err) {
    next(err)
  }
})
