import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('beauty_app'),
  DB_PASSWORD: Joi.string().default('beauty_password'),
  DB_NAME: Joi.string().default('beauty_booking'),
  JWT_SECRET: Joi.string().min(12).required(),
  JWT_EXPIRES_IN: Joi.string().default('1h'),
  GOOGLE_CLIENT_ID: Joi.string().allow(''),
  GOOGLE_CLIENT_SECRET: Joi.string().allow(''),
  GOOGLE_CALLBACK_URL: Joi.string().uri().allow(''),
  FACEBOOK_CLIENT_ID: Joi.string().allow(''),
  FACEBOOK_CLIENT_SECRET: Joi.string().allow(''),
  FACEBOOK_CALLBACK_URL: Joi.string().uri().allow(''),
  RABBITMQ_URL: Joi.string().uri({ scheme: [/https?/, /amqps?/] }).allow(''),
  RABBITMQ_QUEUE: Joi.string().default('beauty_booking_events')
});
