const router = require('express').Router()
module.exports = router
const {Product, Review} = require('../db/models')
/*
separated the categories and products search so that all products
and one product could be obtained regardless of whether a category
had been selected. we may not need to obtain data that is separated in this way, so this route may be extraneous
*/

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
