import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres', //Specification of type of database
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!, //You can use the non-null assertion operator (!) to tell TypeScript that DB_PORT is defined
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, //Not use durign production change to false. automatically syncs database schema with entities.
  entities: ['dist/**/*.entity{.ts,.js}'], //specifies the location of entity files
  migrations: [], //location of migration files - 'dist/src/migrations/*{.ts,.js}'
};

//The configuration is cast as DataSourceOptions to ensure compatibility with TypeORM's DataSource class.
const datasource = new DataSource(dbConfig as DataSourceOptions);
export default datasource;
