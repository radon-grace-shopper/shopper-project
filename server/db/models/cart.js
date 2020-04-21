const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  items: Sequelize.ARRAY
})

module.exports = Cart
