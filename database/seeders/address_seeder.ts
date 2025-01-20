import Address from '#models/address'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Address.updateOrCreateMany(
      ['country', 'state', 'city', 'street', 'number'],
      [
        {
          country: 'Brazil',
          state: 'Rio Grande do Sul',
          city: 'Porto Alegre',
          street: 'Av. Ipiranga',
          number: 356,
        },
        {
          country: 'Brazil',
          state: 'Rio de Janeiro',
          city: 'Rio de Janeiro',
          street: 'Av. Atlântica',
          number: 725,
        },
        {
          country: 'Brazil',
          state: 'Paraná',
          city: 'Curitiba',
          street: 'Av. Sete de Setembro',
          number: 998,
        },
        {
          country: 'Brazil',
          state: 'São Paulo',
          city: 'São Paulo',
          street: 'Av. Paulista',
          number: 121,
        },
      ]
    )
  }
}
