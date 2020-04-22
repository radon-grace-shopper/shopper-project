const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: Sequelize.ENUM('cart', 'completed')
})

module.exports = Order
