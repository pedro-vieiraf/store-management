import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  // Método para registro
  public async register({ request }: HttpContextContract) {
    const data = request.only(['email', 'password'])
    const user = await User.create(data)
    return user
  }

  // Método para login
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    // Verifique se o usuário existe
    const user = await User.query().where('email', email).first()
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    // Verifique a senha
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    // Gere um token JWT
    const token = await auth.use('api').generate(user)
    return { user, token }
  }
}
