import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';

const data: any = dotenv.parse(fs.readFileSync(`.env`));

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: data.PG_HOST,
  port: parseInt(data.PG_PORT, 10) || 5433,
  username: data.PG_USER,
  password: data.PG_PASSWORD,
  database: data.PG_DB,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: data.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
