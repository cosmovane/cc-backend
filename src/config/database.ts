const Sequelize = require('sequelize');

module.exports = new Sequelize('hospitaltodo', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});
