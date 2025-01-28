import Sale from '#models/sale'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Sale.updateOrCreateMany(
      ['customerId', 'productId', 'quantity', 'unitPrice'],
      [
        {
          customerId: 1,
          productId: 3,
          quantity: 2,
          unitPrice: 1500,
        },
        {
          customerId: 2,
          productId: 1,
          quantity: 1,
          unitPrice: 100,
        },
        {
          customerId: 3,
          productId: 2,
          quantity: 3,
          unitPrice: 550,
        },
        {
          customerId: 1,
          productId: 2,
          quantity: 2,
          unitPrice: 1100,
        },
      ]
    )
  }
}
