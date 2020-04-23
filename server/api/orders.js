const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

//possible admin/engineer route route
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {include: Product})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userId, status: 'cart'},
      include: Product
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(updatedOrder)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    console.log('hitting the delete single order route')
    await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.post('/user/:userId', async (req, res, next) => {
  try {
    console.log('Reached add to cart POST route')
    const order = await Order.findOne({
      where: {userId: req.params.userId, status: 'cart'}
    })
    const product = await Product.findOne({where: {id: req.body.productId}})
    console.log(Order.prototype)
    order.addProduct(product)
    res.json(order)
  } catch (err) {
    console.log('Error at cart post route')
    next(err)
  }
})

/*
  will need to use session data to setup User order routes.
  given a session with a certain user ID, we will want to
  be able to lookup all orders associated with that userID
  */
