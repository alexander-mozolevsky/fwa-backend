export const NodeProcesses = () => ({
  PORT: process.env.PORT,
  POSTGRES_DIALECT: process.env.POSTGRES_DIALECT,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_DB: process.env.POSTGRES_DB,
});
