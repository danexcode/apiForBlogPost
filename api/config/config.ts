import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      name: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
