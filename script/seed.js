'use strict'

const db = require('../server/db')
const {User, Product, Order, Review} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await User.create({
    email: 'admin@email.com',
    password: '1234',
    isAdmin: true
  })

  const user = await User.create({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  })

  const order = await Order.create({
    status: 'cart'
  })

  const product = await Product.create({
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    // imageUrl: faker.image.food(),
    price: faker.commerce.price(),
    inventory: faker.random.number(),
    category: 'ice cream'
  })

  user.setOrders(order)
  product.setOrders([order], {through: {quantity: 50}})

  const review = await Review.create({
    content: 'This product is something else',
    rating: 4
  })

  user.setReviews(review)
  product.setReviews(review)

  // const reviews = await Review.bulkCreate([
  //   {
  //     content: 'This product is awesome. Would totally buy it again.',
  //     rating: 5,
  //   },
  //   {
  //     content:
  //       "I don't know what that other review is talking about?! This tastes gross",
  //     rating: 0,
  //   },
  //   {content: 'It was so-so', rating: 3},
  // ])
  // user.setReviews(review[0])
  // user.setReviews(review[1])
  // user.setReviews(review[2])
  // product.setReviews(review[0])
  // product.setReviews(review[1])
  // product.setReviews(review[2])

  // reviews.forEach((rvw) => {
  //   user.setReviews(rvw)
  //   product.setReviews(rvw)
  // })

  //Making pdts in diff categories
  for (let i = 0; i < 50; i++) {
    await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      // imageUrl: faker.image.food(),
      price: faker.commerce.price(),
      inventory: faker.random.number(),
      category: 'ice cream'
    })
    await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      // imageUrl: faker.image.food(),
      price: faker.commerce.price(),
      inventory: faker.random.number(),
      category: 'healthy'
    })
    await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      // imageUrl: faker.image.food(),
      price: faker.commerce.price(),
      inventory: faker.random.number(),
      category: 'dairy-free'
    })
  }
  let users = []
  for (let i = 0; i < 100; i++) {
    users.push(
      await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    )
  }

  // users.forEach((user) => {
  //   try {
  //     let review = Review.create({
  //       content: faker.lorem.paragraph(),
  //       rating: faker.random.number({min: 0, max: 5}),
  //     })
  //     user.setReviews(review)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // })

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
