export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10) || 5433,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    dbName: process.env.PG_DB,
    synchronize: process.env.NODE_ENV !== 'production',
  },
});
