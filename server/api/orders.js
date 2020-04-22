const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.id},
      attributes: ['id', 'status', 'userId'],
      include: {model: Product}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
