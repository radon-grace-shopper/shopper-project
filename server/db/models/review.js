const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: Sequelize.TEXT
})

module.exports = Review
