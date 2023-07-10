export interface Configuration {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
    synchronize: boolean;
  };
}
