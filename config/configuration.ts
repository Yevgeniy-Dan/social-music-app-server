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
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },
  apiUrl: process.env.API_URL,
});
