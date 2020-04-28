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
    // console.log(req.session, 'in router.get /session')
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
      // console.log('this is order', order)
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
    // console.log('this is the orders we send back', orders)
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

router.put('/user/:userId', isSpecificUser, async (req, res, next) => {
  try {
    const orders = await Order.update(req.body, {
      where: {id: req.body.id, status: 'cart'}
    })
    console.log(orders)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.post('/user/addToCart', async (req, res, next) => {
  try {
    console.log('Reached Add to Cart POST route')
    if (!req.user) {
      console.log('this is req.session', req.session)
      if (!req.session.order) {
        console.log('session order doesnt exist')
        const order = await Order.create({
          status: 'cart'
        })
        req.session.order = order.dataValues.id
        console.log('got here on session with', req.body, req.session.order)
        const newOrderProduct = await OrderProduct.create({
          orderId: req.session.order,
          productId: req.body.productId,
          purchasePrice: req.body.price,
          quantity: req.body.quantity
        })
        res.status(200).end()
      } else {
        console.log('session order exists')
        const [orderProduct] = await OrderProduct.findAll({
          where: {
            orderId: req.session.order,
            productId: req.body.productId,
            purchasePrice: req.body.price
          }
        })
        if (orderProduct) {
          console.log('got here on session')
          await orderProduct.update({
            quantity: Sequelize.literal(`quantity+${req.body.quantity}`)
          })
          res.status(204).end()
        } else {
          console.log('got here on session with', req.body, req.session.order)
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
      // console.log(orderProduct.orderId)
      if (orderProduct) {
        console.log('got here')
        await orderProduct.update({
          quantity: Sequelize.literal(`quantity+${req.body.quantity}`)
        })
      } else {
        console.log('got here with', req.body, order.id)
        const newOrderProduct = await OrderProduct.create({
          orderId: order.id,
          productId: req.body.productId,
          purchasePrice: req.body.price,
          quantity: req.body.quantity
        })
      }
      // await Product.update(
      //   {inventory: Sequelize.literal(`inventory-${req.body.quantity}`)},
      //   {
      //     where: {
      //       id: req.body.productId
      //     }
      //   }
      // )
      res.status(204).end()
    }

    //have it try to find one that already exists
    // if it does, update the quantity
    // else create one with a quantity of one
  } catch (err) {
    next(err)
  }
})

/*
  will need to use session data to setup User order routes.
  given a session with a certain user ID, we will want to
  be able to lookup all orders associated with that userID
  */
