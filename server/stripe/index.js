const stripe = require('stripe')('sk_test_XYhLy8AptzhSQpJKehpQ6tOT00BqOnfQTq')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd'
    })
    res.json(intent)
  } catch (err) {
    next(err)
  }
})

module.exports = router
