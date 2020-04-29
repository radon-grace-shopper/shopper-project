const router = require('express').Router()
const {OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await OrderProduct.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderprods = await OrderProduct.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(orderprods)
  } catch (err) {
    next(err)
  }
})
router.put('/:orderId', async (req, res, next) => {
  try {
    await OrderProduct.update(req.body, {
      where: {
        orderId: req.params.orderId
      }
    })
    const [updatedProduct] = await OrderProduct.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    req.session.order = 0
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    await OrderProduct.update(req.body, {
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    const [updatedProduct] = await OrderProduct.findAll({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.status(202).send('DELETED')
  } catch (err) {
    next(err)
  }
})
