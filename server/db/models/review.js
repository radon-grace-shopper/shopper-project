const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: Sequelize.TEXT,
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  }
})

module.exports = Review
