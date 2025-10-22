export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  http: {
    port: parseInt(process.env.PORT ?? '3000', 10)
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER || 'beauty_app',
    password: process.env.DB_PASSWORD || 'beauty_password',
    name: process.env.DB_NAME || 'beauty_booking'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      callbackUrl: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback'
    }
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || '',
    queue: process.env.RABBITMQ_QUEUE || 'beauty_booking_events'
  }
});
