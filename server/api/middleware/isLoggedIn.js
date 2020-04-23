const {User} = require('../../db/models')

module.exports = async (req, res, next) => {
  try {
    if (req.user && (await User.findByPk(req.user.id))) {
      next()
    } else {
      res.status(401).send('not authorized')
    }
  } catch (err) {
    next(err)
  }
}
