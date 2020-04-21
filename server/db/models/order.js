const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  items: Sequelize.ARRAY(Sequelize.INTEGER),
  value: Sequelize.INTEGER
})

module.exports = Order
