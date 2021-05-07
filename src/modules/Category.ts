import { Sequelize } from 'sequelize';

import { db } from '../config/database.js';

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
  },
});
