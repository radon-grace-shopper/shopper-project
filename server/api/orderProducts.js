const router = require('express').Router()
const {orderProducts} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await orderProducts.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    console.log('hitting the post route with', req.body)
    const updatedProduct = await orderProducts.update(req.body, {
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.json(updatedProduct)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
