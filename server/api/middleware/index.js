const isAdmin = require('./isAdmin')
const isLoggedIn = require('./isLoggedIn')
const isSpecificUser = require('./isSpecificUser')
const isCheckoutOrAdmin = require('./isCheckoutOrAdmin')

module.exports = {
  isAdmin,
  isLoggedIn,
  isSpecificUser,
  isCheckoutOrAdmin
}
