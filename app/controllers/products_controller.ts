import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ProductsController {
  async index({ response }: HttpContext) {
    try {
      const products = await Product.query().select('name', 'price').orderBy('name', 'asc')
      if (!products) {
        return response.status(404).json({ error: 'No products found' })
      }

      return response.status(200).json(products)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const { name, description, price, stock } = request.body()
      if (!name || !description || !price || !stock) {
        return response.status(400).json({ error: 'Required fields are missing' })
      }

      await Product.create({ name, description, price, stock })

      return response.status(201)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      const product = await Product.query()
        .where('id', id)
        .select('name', 'description', 'price', 'stock')
        .whereNull('deletedAt')
        .first()
      if (!product) {
        return response.status(404).json({ error: 'Product not found' })
      }

      return response.status(200).json(product)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const { id } = request.params()
      const { name, description, price, stock } = request.body()
      if (!name || !description || !price || !stock) {
        return response.status(400).json({ error: 'Required fields are missing' })
      }

      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({ error: 'Product not found' })
      }

      const updatedProduct = {
        name: name,
        description: description,
        price: price,
        stock: stock,
      }

      await product.merge(updatedProduct).save()

      return response.status(200).json({ message: 'Product updated successfully!', updatedProduct })
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }

  async destroy({ request, response }: HttpContext) {
    try {
      const { id } = request.params()

      const product = await Product.find(id)
      if (!product) {
        return response.status(404).json({ error: 'Product not found' })
      }

      const deletedQuery = {
        deletedAt: DateTime.now(),
      }

      await product.merge(deletedQuery).save()

      return response.status(240)
    } catch (err) {
      return response.status(500).json({ error: err.message })
    }
  }
}
