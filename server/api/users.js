const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router
const {isAdmin} = require('./middleware')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  console.log('Reached PUT user route')
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(updatedUser)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  console.log('Reached DELETE user route')
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
