import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CustomersController = () => import('#controllers/customers_controller')

router.post('login', async ({ request, auth }) => {
  const { email, password } = request.all()
  const user = await User.verifyCredentials(email, password)

  return await auth.use('jwt').generate(user)
})

router
  .get('/', async ({ auth }) => {
    return auth.getUserOrFail()
  })
  .use(middleware.auth())

// Customers Routes
router.group(() => {
  router.get('customers', [CustomersController, 'index'])
  router.get('customers/:id', [CustomersController, 'show'])
  router.post('customers', [CustomersController, 'store'])
  router.put('customers/:id', [CustomersController, 'update'])
  router.delete('customers/:id', [CustomersController, 'destroy'])
})
