const router = require('express').Router()
const {orderProduct} = require('../db/models')
module.exports = router

router.put('/:orderId/productId', async (req, res, next) => {
  try {
    const updatedProduct = await orderProduct.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(updatedProduct)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
