const router = require('express').Router()
const {OrderProduct} = require('../db/models')
module.exports = router

// router.put('/:orderId/:productId', async (req, res, next) => {
//   try {
//     const updatedProduct = await OrderProduct.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     })
//     res.json(updatedProduct)
//     res.status(204).end()
//   } catch (err) {
//     next(err)
//   }
// })

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
