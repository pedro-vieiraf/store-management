import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // Método para registro
  public async register({ request }: HttpContext) {
    const data = request.only(['email', 'password'])
    const user = await User.create(data)
    return user
  }

  // Método para login
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // Verifique se o usuário existe
    const user = await User.query().where('email', email).first()
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    // Verifique a senha
    if (!(await hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    // Gere um token JWT
    const token = await auth.use('api').generate(user)
    return { user, token }
  }
}
