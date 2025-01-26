import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomersController {
  async index({ response }: HttpContext) {
    try {
      const customers = await Customer.query().select('name', 'cpf').orderBy('id', 'asc')

      return response.status(200).json(customers)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const { name, cpf } = request.body()

      if (!name || !cpf) {
        return response.status(400).json({ error: 'Required fields are missing' })
      }

      await Customer.create({ name, cpf })

      return response.status(201)
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({ error: 'CPF already registered' })
      }
      return response.status(500).json({ error: err.message })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const month = request.input('month')
      const year = request.input('year')

      const customer = await Customer.find(id)
      if (!customer) {
        return response.status(404).json({ error: 'Customer not found' })
      }

      const salesQuery = Sale.query()
        .where('customer_id', id)
        .preload('product')
        .orderBy('created_at', 'desc')

      const productsQuery = Product.query()
        .where('customer_id', id)
        .whereNull('deleted_at')
        .orderBy('created_at', 'desc')

      if (month && year) {
        salesQuery.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [month, year])
      } else if (month) {
        salesQuery.whereRaw('MONTH(created_at) = ?', [month])
      } else if (year) {
        salesQuery.whereRaw('YEAR(created_at) = ?', [year])
      }

      const sales = await salesQuery

      const filteredSales = sales.map((sale) => {
        return {
          id: sale.id,
          product: {
            name: sale.product.name,
            description: sale.product.description,
            price: sale.product.price,
            quantity: sale.quantity,
            finalPrice: sale.totalPrice,
          },
        }
      })

      const products = await productsQuery
      const filteredProducts = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        }
      })

      return response.status(200).json({
        customer: {
          id: customer.id,
          name: customer.name,
          cpf: customer.cpf,
        },
        sales: filteredSales,
        products: filteredProducts,
      })
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const { name, cpf } = request.body()

      if (!name || !cpf) {
        return response.status(400).json({ error: 'Required fields are missing' })
      }

      const customer = await Customer.find(id)
      if (!customer) {
        return response.status(404).json({ error: 'Customer not found' })
      }

      const updatedCustomer = {
        name: name,
        cpf: cpf,
      }

      await customer.merge(updatedCustomer).save()

      return response
        .status(200)
        .json({ message: 'Customer updated successfully!', updatedCustomer })
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }

  async destroy({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      const customer = await Customer.find(id)
      if (!customer) {
        return response.status(404).json({ error: 'Customer not found' })
      }

      await customer.delete()

      return response.status(204)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: err.message })
    }
  }
}
