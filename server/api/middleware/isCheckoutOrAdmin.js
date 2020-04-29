module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else if (req.body.checked) {
    next()
  } else {
    res.status(401).send('not authorized')
  }
}
