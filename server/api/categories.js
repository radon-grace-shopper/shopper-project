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
