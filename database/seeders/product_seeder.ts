import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.updateOrCreateMany(
      ['customerId', 'name', 'description', 'price', 'stock'],
      [
        {
          customerId: 1,
          name: 'Product 1',
          description: 'Product 1 description',
          price: 100,
          stock: 10,
        },
        {
          customerId: 2,
          name: 'Product 2',
          description: 'Product 2 description',
          price: 145.5,
          stock: 20,
        },
        {
          customerId: 3,
          name: 'Product 3',
          description: 'Product 3 description',
          price: 300,
          stock: 30,
        },
        {
          customerId: 2,
          name: 'Product 4',
          description: 'Product 4 description',
          price: 400,
          stock: 23,
        },
        {
          customerId: 1,
          name: 'Product 5',
          description: 'Product 5 description',
          price: 19.99,
          stock: 12,
        },
      ]
    )
  }
}
