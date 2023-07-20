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
  jwt_secret: string;
  jwt_refresh_secret: string;
}
