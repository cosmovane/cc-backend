import { Sequelize } from 'sequelize';

export const db = new Sequelize('hospitaltodo', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});
