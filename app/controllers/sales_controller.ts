import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    try {
      const { customerId, productId, quantity } = request.body()
      if (!customerId || !productId || !quantity) {
        return response.status(400).json({ message: 'Required fields are missing' })
      }

      const customer = await Customer.find(customerId)
      if (!customer) {
        return response.status(404).json({ error: 'Customer not found' })
      }

      const product = await Product.find(productId)
      if (!product) {
        return response.status(404).json({ message: 'Product not found' })
      }

      if (product.stock === 0) {
        return response.status(400).json({ error: 'Product out of stock' })
      }
      if (product.stock < quantity) {
        return response
          .status(400)
          .json({ error: `Not enough items in Stock. Current stock: ${product.stock}` })
      }

      product.stock -= quantity
      await product.save()

      const saleQuery = {
        customerId: customerId,
        productId: productId,
        quantity: quantity,
        unitPrice: product.price,
      }

      await Sale.create(saleQuery)

      return response.status(200).json({ message: 'Sale created successfully!' })
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }
}
