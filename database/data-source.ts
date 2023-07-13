import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';

let data: any;

if (process.env.NODE_ENV === 'docker_development') {
  data = dotenv.parse(fs.readFileSync(`.docker-migration.env`));
} else {
  data = dotenv.parse(fs.readFileSync(`.env`));
}

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: data.PG_HOST,
  port: parseInt(data.PG_PORT, 10),
  username: data.PG_USER,
  password: data.PG_PASSWORD,
  database: data.PG_DB,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
