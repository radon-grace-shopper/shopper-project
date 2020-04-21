'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: faker.internet.email(), password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'}),
  // ])

  for (let i = 0; i < 100; i++) {
    await User.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    await Product.create({
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.food(),
      price: faker.random.number(),
      category: faker.random.word()
    })
    await Order.create({
      items: [
        faker.random.number(),
        faker.random.number(),
        faker.random.number()
      ],
      value: faker.random.number()
    })
  }

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
