export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  clientOrigin: process.env.CLIENT_ORIGIN,
  database: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    dbName: process.env.PG_DB,
    // synchronize: process.env.NODE_ENV !== 'production',
    synchronize: false,
  },
  jwt_secret: process.env.JWT_SECRET,
});
