import { defineConfig } from '@adonisjs/auth'
import { sessionUserProvider } from '@adonisjs/auth/session'
import { JwtGuard } from '../app/auth/guards/jwt.js'

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'secretJWT',
  expiresIn: '1h',
}

const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

export default authConfig
