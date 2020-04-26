const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router
const {isAdmin, isSpecificUser} = require('./middleware')
const Sequelize = require('sequelize')

//possible admin/engineer route route
router.get('/', isAdmin, async (req, res, next) => {
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

router.get('/user/:userId', isSpecificUser, async (req, res, next) => {
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

router.post('/user/addToCart', async (req, res, next) => {
  try {
    console.log('Reached Add to Cart POST route')
    const [order] = await Order.findOrCreate({
      where: {userId: req.user.id, status: 'cart'}
    })
    const orderProduct = await OrderProduct.findOrCreate({
      where: {
        orderId: order.id,
        productId: req.body.productId,
        purchasePrice: req.body.price
      }
    })

    await orderProduct[0].update({
      quantity: Sequelize.literal(`quantity+${req.body.quantity}`)
    })

    // await Product.update(
    //   {inventory: Sequelize.literal(`inventory-${req.body.quantity}`)},
    //   {
    //     where: {
    //       id: req.body.productId
    //     }
    //   }
    // )
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

/*
  will need to use session data to setup User order routes.
  given a session with a certain user ID, we will want to
  be able to lookup all orders associated with that userID
  */
