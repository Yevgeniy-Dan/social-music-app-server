export interface Configuration {
  port: number;
  clientOrigin: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
    synchronize: boolean;
  };
  jwt_access_secret: string;
  jwt_refresh_secret: string;
  smtp: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
  apiUrl: string;
}
