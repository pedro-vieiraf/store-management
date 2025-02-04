import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const SalesController = () => import('#controllers/sales_controller')
const ProductsController = () => import('#controllers/products_controller')
const CustomersController = () => import('#controllers/customers_controller')

// User routes
router.group(() => {
  router.post('/', [UsersController, 'login'])
  router.post('register', [UsersController, 'register'])
})
// Customers Routes
router.group(() => {
  router.get('customers', [CustomersController, 'index']).use(middleware.auth())
  router.get('customers/:id', [CustomersController, 'show']).use(middleware.auth())
  router.post('customers', [CustomersController, 'store']).use(middleware.auth())
  router.put('customers/:id', [CustomersController, 'update']).use(middleware.auth())
  router.delete('customers/:id', [CustomersController, 'destroy']).use(middleware.auth())
})

// Products Routes
router.group(() => {
  router.get('products', [ProductsController, 'index']).use(middleware.auth())
  router.get('products/:id', [ProductsController, 'show']).use(middleware.auth())
  router.post('products', [ProductsController, 'store']).use(middleware.auth())
  router.put('products/:id', [ProductsController, 'update']).use(middleware.auth())
  router.delete('products/:id', [ProductsController, 'destroy']).use(middleware.auth())
})

// Sale Route
router.post('sales', [SalesController, 'store']).use(middleware.auth())
