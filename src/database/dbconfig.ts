import { Dialect } from 'sequelize/types';

export const dbConfig  = {
    dialect: 'postgres' as Dialect,
    host:'127.0.0.1',
    port: 5432,
    username: 'harsh',
    password: '1234',
    database: 'college',
}

