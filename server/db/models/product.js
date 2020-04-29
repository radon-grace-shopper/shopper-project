const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  category: {
    type: Sequelize.ENUM('ice cream', 'healthy', 'dairy-free')
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'iceCreamDefault.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product
