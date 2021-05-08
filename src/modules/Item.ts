import { DataType } from 'sequelize-typescript';

import { db } from '../config/database.js';

export const Item = db.define('item', {
  description: {
    type: DataType.STRING,
    allowNull: false,
  },
  done: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
  listId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  completedAt: {
    type: DataType.DATE,
  },
});
