import Customer from '#models/customer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Customer.updateOrCreateMany(
      ['name', 'cpf'],
      [
        {
          name: 'Pedro',
          cpf: 12345678910,
        },
        {
          name: 'João',
          cpf: 12345678911,
        },
        {
          name: 'Maria',
          cpf: 12345678912,
        },
      ]
    )
    // Write your database queries inside the run method
  }
}
