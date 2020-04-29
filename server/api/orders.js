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

router.get('/session', async (req, res, next) => {
  try {
    if (req.session.order) {
      if (req.user) {
        await Order.update(
          {userId: req.user.id},
          {
            where: {id: req.session.order, status: 'cart'}
          }
        )
      }
      const order = await Order.findAll({
        where: {id: req.session.order, status: 'cart'},
        include: Product
      })
      res.json(order)
    } else {
      res.status(200).end()
    }
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

router.put('/user/:userId', isSpecificUser, async (req, res, next) => {
  try {
    const orders = await Order.update(req.body, {
      where: {id: req.body.id, status: 'cart'}
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.post('/user/addToCart', async (req, res, next) => {
  try {
    if (!req.user) {
      if (!req.session.order) {
        const order = await Order.create({
          status: 'cart'
        })
        req.session.order = order.dataValues.id
        const newOrderProduct = await OrderProduct.create({
          orderId: req.session.order,
          productId: req.body.productId,
          purchasePrice: req.body.price,
          quantity: req.body.quantity
        })
        res.status(200).end()
      } else {
        const [orderProduct] = await OrderProduct.findAll({
          where: {
            orderId: req.session.order,
            productId: req.body.productId,
            purchasePrice: req.body.price
          }
        })
        if (orderProduct) {
          await orderProduct.update({
            quantity: Sequelize.literal(`quantity+${req.body.quantity}`)
          })
          res.status(204).end()
        } else {
          const newOrderProduct = await OrderProduct.create({
            orderId: req.session.order,
            productId: req.body.productId,
            purchasePrice: req.body.price,
            quantity: req.body.quantity
          })
          res.status(200).end()
        }
      }
    } else {
      const [order] = await Order.findOrCreate({
        where: {userId: req.user.id, status: 'cart'}
      })
      const [orderProduct] = await OrderProduct.findAll({
        where: {
          orderId: order.id,
          productId: req.body.productId,
          purchasePrice: req.body.price
        }
      })
      if (orderProduct) {
        await orderProduct.update({
          quantity: Sequelize.literal(`quantity+${req.body.quantity}`)
        })
      } else {
        const newOrderProduct = await OrderProduct.create({
          orderId: order.id,
          productId: req.body.productId,
          purchasePrice: req.body.price,
          quantity: req.body.quantity
        })
      }
      res.status(204).end()
    }
  } catch (err) {
    next(err)
  }
})
