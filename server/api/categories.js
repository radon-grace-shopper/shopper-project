const router = require('express').Router()
module.exports = router
const {Product, Review} = require('../db/models')

console.log('hitting the category route')

router.get('/:categories/products', async (req, res, next) => {
  try {
    console.log('hitting the get products in a category route')
    console.log(req.params)
    const products = await Product.findAll({
      where: {
        category: req.params.categories
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
