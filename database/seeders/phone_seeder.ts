import Phone from '#models/phone'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    Phone.updateOrCreateMany(
      ['customerId', 'phone'],
      [
        {
          customerId: 1,
          phone: 51999460104,
        },
        {
          customerId: 2,
          phone: 21987654321,
        },
        {
          customerId: 3,
          phone: 56983456789,
        },
      ]
    )
  }
}
