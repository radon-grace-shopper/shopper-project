const router = require('express').Router()
const {Product, Review, User} = require('../db/models')
const {isAdmin} = require('./middleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{model: Review, include: [{model: User}]}]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
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

router.delete('/:id', isAdmin, async (req, res, next) => {
  console.log('Reached product DELETE route')
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  console.log('Reaching POST product route')
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      category: req.body.category
    })
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})
