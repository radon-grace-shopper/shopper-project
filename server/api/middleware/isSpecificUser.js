module.exports = (req, res, next) => {
  try {
    if (req.user && req.params.userId == req.user.id) {
      next()
    } else {
      res.status(401).send('not authorized')
    }
  } catch (err) {
    next(err)
  }
}
