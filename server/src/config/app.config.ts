import 'dotenv/config';

const isRequired = (propName: string): never => {
  throw new Error(`Config property ${propName} is required`);
};

export const config = {
  PORT: process.env.PORT ?? isRequired('PORT'),
  POSTGRES_PASSWORD:
    process.env.POSTGRES_PASSWORD ?? isRequired('POSTGRES_PASSWORD'),
  POSTGRES_USER: process.env.POSTGRES_USER ?? isRequired('POSTGRES_USER'),
  POSTGRES_PORT: +process.env.POSTGRES_PORT ?? isRequired('POSTGRES_PORT'),
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? isRequired('POSTGRES_HOST'),
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET ?? isRequired('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ?? isRequired('JWT_REFRESH_SECRET'),
  ACCESS_TOKEN_EXPIRES_HOURS:
    process.env.ACCESS_TOKEN_EXPIRES_HOURS ??
    isRequired('ACCESS_TOKEN_EXPIRES_HOURS'),
  REFRESH_TOKEN_EXPIRES_DAYS:
    process.env.REFRESH_TOKEN_EXPIRES_DAYS ??
    isRequired('REFRESH_TOKEN_EXPIRES_DAYS'),
  REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS:
    +process.env.REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS ??
    isRequired('REFRESH_TOKEN_EXPIRES_DAYS_IN_MILLISECONDS'),
};
