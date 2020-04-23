/*
  EXAMPLE CUSTOM MIDDLEWARE
  CAN USE SIMILAR APPROACH TO CREATE MIDDLEWARE TO CHECK IF A USER IS LOGGED IN
*/

module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send('not authorized')
  }
}
