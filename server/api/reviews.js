const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router
const {isLoggedIn} = require('./middleware')

//GET /api/reviews
router.get('/', async (req, res, next) => {
  try {
    console.log('Found all reviews route')
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

//POST /api/reviews
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    console.log('Found post review route')
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})
