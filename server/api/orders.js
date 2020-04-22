const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  try {
    const orders = Order.findAll({
      where: {userId: req.id}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
