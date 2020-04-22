const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

//possible admin/engineer route route
router.get('/', async (req, res, next) => {
  try {
    console.log('hitting the get all orders route')
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params)
    console.log('hitting the get single order route')
    const order = await Order.findByPk(req.params.id, {include: Product})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('hitting the update single order route')
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

/*
  will need to use session data to setup User order routes.
  given a session with a certain user ID, we will want to 
  be able to lookup all orders associated with that userID
  */
